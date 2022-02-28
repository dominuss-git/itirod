const express = require('express');
const mongoose = require('mongoose');
const config = require("./config.json");

const app = express();

app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

require('./socker');

app.use(express.static(`../client`));
app.get('*', (req, res) => {
  res.redirect('/');
});

const start = async () => {
  await mongoose.connect(config.mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  app.listen(3000, () => {
    console.log(`Has been started on http://192.168.31.5:${3000} `);
  });
}

start();