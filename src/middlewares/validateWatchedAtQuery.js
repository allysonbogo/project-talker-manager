const validateWatchedAtQuery = (req, res, next) => {
  const { date } = req.query;
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (date && !regex.test(date)) {
    return res.status(400)
      .json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
  }
  return next();
};

module.exports = { validateWatchedAtQuery };