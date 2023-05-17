const validateTalkInfo = (req, res, next) => {
  const { talk: { watchedAt, rate } } = req.body;
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' }); 
  }
  if (!regex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  if (!Number.isInteger(Number(rate))) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  return next();
};

module.exports = { validateTalkInfo };