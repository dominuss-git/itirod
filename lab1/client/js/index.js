// let id = "";
let picked = "";
let room = "";
let online_users = [];

const joinRoomButton = document.getElementById('room-button');
const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const form = document.getElementById('form');
let usersList = null

export const connection = () => {
  const socket = new WebSocket("ws://127.0.0.1:4000");
  const userId = sessionStorage.getItem('userId');

  socket.onopen = () => {
    socket.send(JSON.stringify({ type: "set-id", message: userId }));
    displayMessage(`Your socket id: ${userId}`);
  };

  socket.onmessage = ({ data }) => {
    const { type, message } = JSON.parse(data.toString());
    switch(type) {
      case "online-users":
        if (online_users.length !== 0) {
          const user = usersList.find((user) => user._id === message.new)
          const statuschip = document.createElement('div');
          const status = document.createElement('span')

          status.style.color = 'blue';
          status.textContent = 'online'

          statuschip.append(`${user.username} come `)
          statuschip.append(status)

          displayMessage(statuschip);
        }
        online_users = message.message;
        showUsers()
        break;
      case "offline": 
        const user = usersList.find((user) => user._id === message.old)

        const statuschip = document.createElement('div');
        const status = document.createElement('span')

        status.style.color = 'red';
        status.textContent = 'offline'

        statuschip.append(`${user.username} come `)
        statuschip.append(status)

        online_users = message.message;

        showUsers()
        displayMessage(statuschip);
        break;  
      case "receive-message":
        if (message.action === 'invite') {
          const invite = document.createElement('button');
          invite.className = 'button';

          invite.append(`${message.message} ${message.room}`);

          invite.addEventListener('click', () => { 
            socket.send(JSON.stringify({ type: 'join-room', message: { action: 'take-invite', from: message.from, room: message.room } }));
            // invite.removeEventListener('click')
            invite.disabled = true;
          });

          displayMessage(invite, message.from)
          return
        }

        displayMessage(message.message, message.from);
        break;
      case "connectes-room":
        if (!message) {
          const statuschip = document.createElement('div');
          const status = document.createElement('button');

          status.className = 'button'
          status.append('take access')

          const userId = sessionStorage.getItem('userId');
          
          status.addEventListener('click', () => {
            socket.send(JSON.stringify({ type: 'take-invate', message: { from: userId, room } }));
            status.disabled = true;
          });

          statuschip.append(`You dont have permissions to connect ${room} `)
          statuschip.append(status)

          displayMessage(statuschip)
          return;
        }
        displayMessage(message)
      default:
        return;
    }
    // displayMessage(message.data);
  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    console.log(e.submitter.id);

    const message = messageInput.value;

    if (message === "") retrurn
    if (e.submitter.id === 'send-to-group-button') {
      if (room !== "") {
        socket.send(JSON.stringify({ type: "send-to-group", message: { room, message } }));
        displayMessage(message, `you > ${room}`);
      } else {
        return;
      }
    } else {
      console.log(picked);
      socket.send(JSON.stringify({ type: "receive-message", message: { to: picked, message } }));
      displayMessage(message, 'you');
    }


    messageInput.value = ""
  });

  joinRoomButton.addEventListener('click', () => {
    room = roomInput.value;
    console.log(room);
    socket.send(JSON.stringify({ type: "join-room", message: { room } }));
    // socket.emit("join-room", room, message => displayMessage(message));
  });
}

if (sessionStorage.getItem('token')) {
  connection()
}

const showUsers = async () => {
  const data = await fetch("http://localhost:3000/api/user", {
    method: 'GET',
  });

  if (data.status === 200) {
    const { users } = await data.json();
    const userList = document.getElementsByClassName("user-list")[0];
    const items = document.getElementsByClassName('user-list__item')
    const length = items.length;
    for (let i = 0; i < length; i++) {
      items.item(0).remove()
    } 

    usersList = users;

    const userId = sessionStorage.getItem('userId');

    users.forEach((val) => {
      const isOnline = online_users.includes(val._id);
      const span = document.createElement('span');
      const status = document.createElement('div');
      
      if (val._id === userId) {
        return;
      }

      status.className = 'status'

      if (isOnline) {
        status.className = 'status__online'
      }

      span.className = 'user-list__item';
      span.addEventListener('click', () => {
        const items = document.getElementsByClassName('user-list__item')
        for (let i = 0; i < items.length; i++) {
          items.item(i).style.backgroundColor = "unset"
        } 

        span.style.backgroundColor = "#B58500";
        picked = val._id
      });

      span.append(val.username);
      span.append(status);

      userList.append(span);
    });
  }
}

window.onload = showUsers

function displayMessage(message, from = 'system', status = null) {
  const body = document.createElement('span');
  const title = document.createElement('span');

  title.textContent = from;
  body.append(message);

  const content = document.createElement('div');

  content.className = "message";
  if (from.includes('you')) {
    content.style.backgroundColor = "#1C916B"
    content.style.alignSelf = "flex-end"
  } else {
    content.style.backgroundColor = "#B58500"
  }
  if (from.includes('system')) {
    content.style.color = "#000";
    content.style.backgroundColor = "#f3f3f3"
  }

  content.append(title);
  content.append(body);

  document.getElementById("message-container").append(content);
};
