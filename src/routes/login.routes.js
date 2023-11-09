const { Router } = require('express');
const generateToken = require('../utils/generateToken');
const validateEmail = require('../middlewares/validateEmail');
const validatePassword = require('../middlewares/validatePassword');

const loginRouter = Router();

loginRouter.post('/', validateEmail, validatePassword, async (req, res) => {
  const token = generateToken();
  return res.status(200).json({
    token,
  });
});

module.exports = loginRouter;