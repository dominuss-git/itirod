// Server
const dgram = require("dgram");

const { HOST, PORT, actions, loginType } = require("./config");
const { prepareMessage, parseMessage } = require("./functions");

const clients = [];
const messages = [];

const server = dgram.createSocket("udp4", (msg, rinfo) => {
  const { message, action } = parseMessage(msg);
  console.log(`${rinfo.address}:${rinfo.port}/${action} -`, message);

  switch (action) {
    case actions.login:
      const { username, loginedAt } = message;
      console.log(clients.length)
      if (clients.length < 2) {
        clients.push({ username, loginedAt, port: rinfo.port });
        server.send(
          prepareMessage(
            { messages, status: loginType.success },
            actions.login
          ),
          rinfo.port,
          HOST
        );
        clients.forEach((client) => {
          if (client.port !== rinfo.port) {
            server.send(
              prepareMessage(
                {
                  message: `${username} come online`,
                  from: { username: "system" },
                },
                actions.send
              ),
              client.port,
              HOST
            );
          }
        });
        break;
      }
      server.send(prepareMessage('', actions.disconnect), rinfo.port, HOST);
      break;
    case actions.send:
      messages.push({
        message,
        postedAt: new Date(Date.now()).getTime(),
        from: clients.find((client) => client.port === rinfo.port),
      });
      clients.forEach((client) => {
        if (client.port !== rinfo.port) {
          server.send(
            prepareMessage(
              {
                message,
                from: clients.find((client) => client.port === rinfo.port),
              },
              actions.send
            ),
            client.port,
            HOST
          );
        }
      });
      break;
    case actions.disconnect:
      const user = clients.splice(
        clients.findIndex((client) => client.port === rinfo.port),
        1
      );
      clients.forEach((client) => {
        if (client.port !== rinfo.port) {
          server.send(
            prepareMessage(
              {
                message: `${user[0].username} come offline`,
                from: { username: "system" },
              },
              actions.send
            ),
            client.port,
            HOST
          );
        }
      });
      break;
    default:
      console.log("default");
  }
});

server.on("listening", () =>
  console.log(`UDP Server listening on ${HOST}:${PORT}`)
);

server.bind(PORT, HOST, () => {
  server.setBroadcast(true);
});

module.exports = server;
