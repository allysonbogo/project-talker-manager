const { readTalkerFile } = require('./readAndWriteTalkers');

const searchByName = async (q) => {
  const talkers = await readTalkerFile();
  let array = [];
  if (!q) {
    return talkers;
  }
  if (talkers.some((t) => t.name.startsWith(q))) {
    array = talkers.filter((t) => t.name.startsWith(q));
    return array;
  }
  return array;
};

module.exports = { searchByName };