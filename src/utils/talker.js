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

module.exports = {
  getAllTalkers,
  findTalkerById,
  writeTalkerFile,
};