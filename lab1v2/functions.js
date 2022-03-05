const prepareMessage = (message, action) => {
  return JSON.stringify({ message, action });
}

const parseMessage = (message) => {
  return JSON.parse(message);
}

module.exports = { prepareMessage, parseMessage };