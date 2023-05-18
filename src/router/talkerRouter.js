const { Router } = require('express');
const { readTalkerFile, writeTalker, updateTalker, deleteTalker } = require('../utils/readAndWriteTalkers');
const { validateToken } = require('../middlewares/validateToken');
const { validateName } = require('../middlewares/validateName');
const { validateAge } = require('../middlewares/validateAge');
const { validateTalk } = require('../middlewares/validateTalk');
const { validateTalkInfo } = require('../middlewares/validateTalkInfo');
const { validateId } = require('../middlewares/validateId');

const talkerRouter = Router();

talkerRouter.get('/', async (req, res) => {
  const talkers = await readTalkerFile();
  return res.status(200).json(talkers);
});

talkerRouter.get('/search',
  validateToken, async (req, res) => {
  const { q } = req.query;
  const talkers = await readTalkerFile();
  if (!q) return res.status(200).json(talkers);
  if (talkers.some((t) => t.name.startsWith(q))) {
    const talker = talkers.filter((t) => t.name.startsWith(q));
    return res.status(200).json(talker);
  }
  return res.status(200).json([]);
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

talkerRouter.post('/',
  validateToken, validateName,
  validateAge, validateTalk,
  validateTalkInfo, async (req, res) => {
  const talkers = await readTalkerFile();
  const newTalker = { id: talkers.length + 1, ...req.body };
  await writeTalker(newTalker);
  return res.status(201).json(newTalker);
});

talkerRouter.put('/:id',
  validateToken, validateId,
  validateName, validateAge,
  validateTalk, validateTalkInfo, async (req, res) => {
  const { id } = req.params;
  const talkerInfo = { id: +id, ...req.body };
  await updateTalker(talkerInfo, id);
  return res.status(200).json(talkerInfo);
});

talkerRouter.delete('/:id',
  validateToken, validateId, async (req, res) => {
  const { id } = req.params;
  await deleteTalker(id);
  return res.sendStatus(204);
});



module.exports = { talkerRouter };