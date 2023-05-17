const { Router } = require('express');
const { readTalkerFile } = require('../utils/readAndWriteTalkers');

const talkerRouter = Router();

talkerRouter.get('/', async (req, res) => {
  const talkers = await readTalkerFile();
  return res.status(200).json(talkers);
});

talkerRouter.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  const talkers = await readTalkerFile();
  if (talkers.some((t) => t.id === id)) {
    const talker = talkers.find((t) => t.id === id);
    return res.status(200).json(talker);
  } 
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = { talkerRouter };