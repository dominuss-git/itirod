const WebSocket = require("ws");
const User = require("./schemas/User");

const clients = {};
const rooms = {};

const wss = new WebSocket.Server({ port: 4000 });


wss.on("connection", socket => {
  let id = "";

  socket.on('message', async (data) => {
    const { type, message } = JSON.parse(data.toString());
    switch (type) {
      case "set-id": 
        if (!!message) {
          const user = await User.findOne({ id: message });

          if (!user) {
            return;
          }

          console.log(message);

          clients[message] = socket;
          id = message;
          socket.id = message;   
          
          Object.values(clients).map(val => val.send(JSON.stringify({ type: "online-users", message: { message: Object.keys(clients), new: id } })))
        }
        break;
      case "receive-message":
        if (message?.to !== "" && clients[message.to]) {
          const user = await User.findOne({ _id: socket.id });
          
          if(!user) {
            return;
          }

          clients[message.to].send(JSON.stringify({ type: 'receive-message', message: { message: message.message, from: user.username } }));
        }
        break;
      case "join-room":
        if (message?.room !== "") {
          if (!rooms[message.room]) {
            rooms[message.room] = { owner: socket.id, chaters: [] };
          }

          if (message?.action === 'take-invite') {
            const user = await User.findOne({ username: message.from })
            rooms[message.room].chaters.push(clients[user._id]);
            // console.log(clients[message.from], clients, message.from)
            clients[user._id].send(JSON.stringify({ type: 'receive-message', message: { message: `You connected to ${message?.room}` } }))
            return;
          }

          if (rooms[message.room].chaters.includes(socket)) {
            socket.send(JSON.stringify({ type: 'connectes-room', message: `You already connected to ${message.room}` }));
            return;
          }

          if (rooms[message.room].owner !== socket.id) {
            socket.send(JSON.stringify({ type: 'connectes-room', message: null }));
            return
          }

          rooms[message.room].chaters.push(socket);
          socket.send(JSON.stringify({ type: 'connectes-room', message: `Successfuly connected to ${message.room}` }));
        } else {
          socket.send(JSON.stringify({ type: 'connectes-room', message: `Invalid Room name` }));
        }
        break;
      case "send-to-group": 
        if (rooms[message.room]) {
          const user = await User.findOne({ _id: socket.id });
          
          if(!user) {
            return;
          }

          rooms[message.room].chaters.map((client) => client.id !== socket.id ? client.send(JSON.stringify({ type: 'receive-message', message: { message: message.message, from: `${user.username} > ${message.room}` } })) : null);
        }
        break;
      case "take-invate":
        console.log(message);
        if (message?.room !== "") {
          if (!rooms[message.room]) {
            socket.send(JSON.stringify({ type: 'connectes-room', message: `Invalid Room name` }));
          }

          const user = await User.findOne({ _id: socket.id });
          
          if(!user) {
            return;
          }

          clients[rooms[message.room].owner].send(JSON.stringify({ type: 'receive-message', message: { action: 'invite', message: 'Request to join', from: user.username, room: message.room } }))
        } else {
          socket.send(JSON.stringify({ type: 'connectes-room', message: `Invalid Room name` }));
        }
        break; 
      default: 
        break;
    }
  })

  socket.on('close', () => {
    delete clients[id];
    Object.values(clients).map(val => val.send(JSON.stringify({ type: 'offline', message: { message: Object.keys(clients), old: id } })));
    console.log('deleted', id);
  })
});

module.exports = wss;