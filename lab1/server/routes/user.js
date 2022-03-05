const { Router } = require('express');
const User = require('../schemas/User');

const router = Router();

router.get(
  '/',
  async (req, res) => {
    try {
      const users = await User.find().select(['username']);

      res.status(200).json({ users })
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Error' });
    }
  }
);

module.exports = router;
