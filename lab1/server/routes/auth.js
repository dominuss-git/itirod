const { Router } = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config.json');
const User = require('../schemas/User');

const router = Router();

router.post(
  '/register',
  async (req, res) => {
    try {
      const {
        username,
        password
      } = req.body;

      if (!password || !username) {
        return res.status(400).json({ message: "invalid" })
      }

      const candinate = (await User.findOne({ username }));

      if (candinate) {
        return res.status(400).json({ message: 'user was already exist' });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        username,
        password: hashedPassword,
      });

      await user.save();

      const token = jwt.sign(
        {
          userId: user.id,
        },
        config.jwtSecret,
        {
          expiresIn: '1h',
        },
      );

      res.status(201).json({ token, userId: user.id });
    } catch (e) {
      console.log(e);
      res.status(500).json({ message: 'Error' });
    }
  },
);

router.post(
  '/login',
  async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!password || !username) {
        res.status(400).json({ message: "invalid" })
      }

      const user = (await User.findOne({ username }));

      if (!user) {
        return res.status(400).json({ message: 'user not exist' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: 'wrong password, try again' });
      }

      const token = jwt.sign(
        {
          userId: user.id,
        },
        config.jwtSecret,
        {
          expiresIn: '1h',
        },
      );

      return res.json({ token, userId: user.id });
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Error' });
    }
  },
);

module.exports = router;