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

module.exports = {
  readTalkerFile,
};