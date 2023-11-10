const validateRateQuery = (req, res, next) => {
  const { rate } = req.query;
  const rateNumber = Number(rate);
  if (rate && (!Number.isInteger(rateNumber) || rateNumber < 1 || rateNumber > 5)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
  next();
};

module.exports = validateRateQuery;