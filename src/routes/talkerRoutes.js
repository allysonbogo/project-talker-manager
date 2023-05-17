const { Router } = require('express');
const { readTalkerFile } = require('../utils/readAndWriteTalkers');

const talkerRouter = Router();

talkerRouter.get('/', async (req, res) => {
  const talkers = await readTalkerFile();
  return res.status(200).json(talkers);
});

module.exports = { talkerRouter };