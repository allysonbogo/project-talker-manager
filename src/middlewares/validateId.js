const { readTalkerFile } = require('../utils/readAndWriteTalkers');

const validateId = async (req, res, next) => {
  const { id } = req.params;
  const talkers = await readTalkerFile();
  if (talkers.some((t) => t.id === +id)) return next();
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
};

module.exports = { validateId };