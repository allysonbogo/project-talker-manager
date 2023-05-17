const { Router } = require('express');
const crypto = require('crypto');

const loginRouter = Router();

loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
  }
});

module.exports = { loginRouter };