const { Router } = require('express');
const {
  readTalkerFile, writeTalker,
  updateTalker, deleteTalker,
} = require('../utils/readAndWriteTalkers');
const { searchByName } = require('../utils/searchByName');
const { searchByRate } = require('../utils/searchByRate');
const { searchByDate } = require('../utils/searchByDate');
const { validateToken } = require('../middlewares/validateToken');
const { validateName } = require('../middlewares/validateName');
const { validateAge } = require('../middlewares/validateAge');
const { validateTalk } = require('../middlewares/validateTalk');
const { validateId } = require('../middlewares/validateId');
const { validateRate } = require('../middlewares/validateRate');
const { validateWatchedAt } = require('../middlewares/validateWatchedAt');
const { validateRateQuery } = require('../middlewares/validateRateQuery');

const talkerRouter = Router();

talkerRouter.get('/', async (req, res) => {
  const talkers = await readTalkerFile();
  return res.status(200).json(talkers);
});

talkerRouter.get('/search',
  validateToken, validateRateQuery,
  async (req, res) => {
  const { q, rate, date } = req.query;
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  const talkersByName = await searchByName(q);
  const talkersByRate = await searchByRate(talkersByName, +rate);
  if (date) {
    if (!regex.test(date)) {
      return res.status(400)
        .json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
    }
    const talkersByDate = await searchByDate(talkersByRate, date);
    return res.status(200).json(talkersByDate);
  }
  return res.status(200).json(talkersByRate);
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
  validateRate, validateWatchedAt, async (req, res) => {
  const talkers = await readTalkerFile();
  const newTalker = { id: talkers.length + 1, ...req.body };
  await writeTalker(newTalker);
  return res.status(201).json(newTalker);
});

talkerRouter.put('/:id',
  validateToken, validateId,
  validateName, validateAge,
  validateTalk, validateRate,
  validateWatchedAt, async (req, res) => {
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