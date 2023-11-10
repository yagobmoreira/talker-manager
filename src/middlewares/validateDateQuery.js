const validateDateQuery = (req, res, next) => {
  const { date } = req.query;
  const isFormatDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;
  const validateDate = isFormatDate.test(date);

  if (date && !validateDate) {
    return res.status(400).json({
      message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"',
    });
  }
  next();
};

module.exports = validateDateQuery;