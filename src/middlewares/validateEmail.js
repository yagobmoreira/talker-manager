const validateEmail = (req, res, next) => {
  const { email } = req.body;
  const validEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  if (!email) {
    return res.status(400).json({
      message: 'O campo "email" é obrigatório',
    });
  } 
  if (!email.match(validEmail)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
  next();
};

module.exports = validateEmail;