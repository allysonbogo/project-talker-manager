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

module.exports = {
  readTalkerFile,
  writeTalker,
};