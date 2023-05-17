const { Router } = require('express');
const crypto = require('crypto');
const { validateEmail } = require('../middlewares/validateEmail');
const { validatePassword } = require('../middlewares/validatePassword');

const loginRouter = Router();

loginRouter.post('/', validateEmail, validatePassword, async (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const token = crypto.randomBytes(8).toString('hex');
    return res.status(200).json({ token });
  }
});

module.exports = { loginRouter };