const validateTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  const { rate } = req.body.talk;
  if (Number(rate) < 1 || Number(rate) > 5) {
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  if (!rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' }); 
  }
  return next();
};

module.exports = { validateTalk };