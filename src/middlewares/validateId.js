const { readTalkerFile } = require('../utils/readAndWriteTalkers');

const existingId = async (req, res, next) => {
  const id = Number(req.params.id);
  const talkers = await readTalkerFile();
  if (talkers.some((t) => t.id === id)) return next();
  res.sendStatus(404);
};

module.exports = { existingId };