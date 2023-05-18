const searchByRate = async (talkers, rate) => {
  let array = [];
  if (!rate) {
    return talkers;
  }
  if (talkers.some((t) => t.talk.rate === rate)) {
    array = talkers.filter((t) => t.talk.rate === rate);
    return array;
  }
  return array;
};

module.exports = { searchByRate };