const fs = require('fs/promises');

const FILENAME = 'src/talker.json';

const readTalkerFile = async () => {
  try {
    const talkers = await fs.readFile(FILENAME, 'utf8');
    return JSON.parse(talkers);
  } catch (error) {
    const err = new Error('Error opening file');
    throw err;
  }
};

const writeTalker = async (talker) => {
  const fileData = await fs.readFile(FILENAME, 'utf8');
  const talkers = JSON.parse(fileData);
  talkers.push(talker);
  await fs.writeFile(FILENAME, JSON.stringify(talkers, null, 2));
};

const updateTalker = async (talker, id) => {
  const fileData = await fs.readFile(FILENAME, 'utf8');
  const talkers = JSON.parse(fileData);
  const updatedTalker = talkers.find((t) => t.id === +id);
  updatedTalker.name = talker.name;
  updatedTalker.age = talker.age;
  updatedTalker.talk = talker.talk;
  updatedTalker.talk.watchedAt = talker.talk.watchedAt;
  updatedTalker.talk.rate = talker.talk.rate;
  await fs.writeFile(FILENAME, JSON.stringify(talkers, null, 2));
};

const deleteTalker = async (id) => {
  const fileData = await fs.readFile(FILENAME, 'utf8');
  const talkers = JSON.parse(fileData);
  const talkerIndex = talkers.findIndex((t) => t.id === +id);
  talkers.splice(talkerIndex, 1);
  await fs.writeFile(FILENAME, JSON.stringify(talkers, null, 2));
};

const updateTalkerRate = async (id, rate) => {
  const fileData = await fs.readFile(FILENAME, 'utf8');
  const talkers = JSON.parse(fileData);
  const updatedTalker = talkers.find((t) => t.id === +id);
  updatedTalker.talk.rate = rate;
  await fs.writeFile(FILENAME, JSON.stringify(talkers, null, 2));
};

module.exports = {
  readTalkerFile,
  writeTalker,
  updateTalker,
  deleteTalker,
  updateTalkerRate,
};