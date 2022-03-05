const { HOST, PORT } = require('./config.json');
const actions = require('./messageActions.json');
const loginType = require('./loginTypes.json');

module.exports = {
  HOST,
  PORT,
  actions,
  loginType
}