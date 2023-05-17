const { Router } = require('express');
const { readTalkerFile, writeTalker } = require('../utils/readAndWriteTalkers');
const { validateToken } = require('../middlewares/validateToken');
const { validateName } = require('../middlewares/validateNameAndAge');
const { validateAge } = require('../middlewares/validateAge');
const { validateTalk } = require('../middlewares/validateTalk');
const { validateTalkInfo } = require('../middlewares/validateTalkInfo');

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

talkerRouter.post('/', validateToken, validateName, validateAge,
  validateTalk, validateTalkInfo, async (req, res) => {
  const talkers = await readTalkerFile();
  const newTalker = { id: talkers.length + 1, ...req.body };
  await writeTalker(newTalker);
  return res.status(201).json(newTalker);
});

module.exports = { talkerRouter };