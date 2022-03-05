// Client
const { HOST, PORT, actions, loginType } = require('./config');

const { prepareMessage, parseMessage } = require('./functions');

const dgram = require('dgram');

const userInfo = {
  username: null,
  loginedAt: null,
};

console.log('What is your name?');

process.stdin.on('data', (data) => {
  const name = data.toString().split('\n')[0];
  userInfo.username = name;
  userInfo.loginedAt = new Date(Date.now()).getTime();
  
  startServer();

  if (userInfo.username !== null) {
    console.log(`Hi, ${userInfo.username}!`);
    process.stdin.removeAllListeners('data');
  }
});

const startServer = () => {
  const client = dgram.createSocket('udp4');

  client.connect(PORT, HOST, () => {
    console.log('connected');
    client.send(prepareMessage(userInfo, actions.login));
    process.stdin.on('data', (msg) => {
      const message = msg.toString().split('\n')[0];

      client.send(prepareMessage(message, actions.send), (err) => {
        if (err) throw err;
      });
    })

    client.on('message', (msg) => {
      const { message, action } = parseMessage(msg);

      switch (action) {
        case actions.login:
          const { messages, status } = message;
          if (status === loginType.success) {
            messages.sort((a, b) => {
              if (a.postedAt >= b.postedAt) {
                return 1
              }

              return -1;
            }).forEach(msg => {
              console.log(`${msg.from.username} > ${msg.message}`);
            })
          } else {
            process.exit();
          }
          break;
        case actions.send:
          console.log(`${message.from.username} > ${message.message}`);
          break
        case actions.disconnect:
          console.log('user limit');
          process.exit();
        default:
          console.log('default');
      }
    })
  })

  client.on('close', () => {
    client.send(prepareMessage('', actions.disconnect));
    process.exit();
  })

  process.on('SIGINT', client.emit.bind(client, 'close'));
  process.on('SIGHUP', client.emit.bind(client, 'close'));
  process.on('SIGUSR1', client.emit.bind(client, 'close'));
  process.on('SIGUSR2', client.emit.bind(client, 'close'));
}
