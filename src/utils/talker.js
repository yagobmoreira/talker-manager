const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '..', 'talker.json');

const readTalkerFile = async () => {
  try {
    const contentFile = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(contentFile);
  } catch (error) {
    console.error(error);
    return null;
  }
};

const writeTalkerFile = async (talker) => {
  try {
    const talkers = await readTalkerFile();
    const newTalkers = [...talkers, talker];
    await fs.writeFile(filePath, JSON.stringify(newTalkers)); 
  } catch (error) {
    console.error(error);
  }
};

const getAllTalkers = async () => {
  const talkers = await readTalkerFile();
  return talkers;
};

const findTalkerById = async (id) => {
  const talkers = await readTalkerFile();
  const talker = talkers.find((person) => person.id === id);
  return talker;
};

const editTalker = async (talker, id) => {
  try {
    const talkers = await readTalkerFile();
    const index = talkers.findIndex((person) => person.id === id);
    if (index === -1) {
      return null;
    }
    talkers[index] = { id, ...talker };
    await fs.writeFile(filePath, JSON.stringify(talkers));
    return true;
  } catch (error) {
    console.error(error);
  }
};

const deleteTalker = async (id) => {
  try {
    const talkers = await readTalkerFile();
    const talkersWithoutDeleted = talkers.filter((person) => person.id !== id);
    await fs.writeFile(filePath, JSON.stringify(talkersWithoutDeleted));
  } catch (error) {
    console.error(error);
  }
};

const searchTalker = async (q, rate, date) => {
  const talkers = await readTalkerFile();
  return talkers
    .filter(({ name }) => (q ? name.includes(q) : true))
    .filter(({ talk }) => (rate ? talk.rate === Number(rate) : true))
    .filter(({ talk }) => (date ? talk.watchedAt === date : true));
};

module.exports = {
  getAllTalkers,
  findTalkerById,
  writeTalkerFile,
  editTalker,
  deleteTalker,
  searchTalker,
};