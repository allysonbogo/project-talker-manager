const searchByDate = async (talkers, date) => {
  let array = [];
  if (!date) {
    return talkers;
  }
  if (talkers.some((t) => t.talk.watchedAt === date)) {
    array = talkers.filter((t) => t.talk.watchedAt === date);
    return array;
  }
  return array;
};

module.exports = { searchByDate };