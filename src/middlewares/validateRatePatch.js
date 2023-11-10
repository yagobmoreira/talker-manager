const validateRatePatch = (req, res, next) => {
  const { rate } = req.body;
  const isRateInvalid = !Number.isInteger(rate) || rate < 1 || rate > 5;

  if (rate === undefined) {
    return res.status(400).json({
      message: 'O campo "rate" é obrigatório',
    });
  }

  if (isRateInvalid) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  next();
};

module.exports = validateRatePatch;