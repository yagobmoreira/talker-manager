const { Router } = require('express');
const { 
  getAllTalkers,
  searchTalker,
  findTalkerById,
  deleteTalker,
  editTalker,
  writeTalkerFile,
} = require('../utils/talker');

const { getAllTalkersDB } = require('../db/talkerDB');

const validateName = require('../middlewares/validateName');
const validateCredentials = require('../middlewares/validateCredentials');
const validateAge = require('../middlewares/validateAge');
const validateTalk = require('../middlewares/validateTalk');
const validateWatchedAt = require('../middlewares/validateWatchedAt');
const validateRate = require('../middlewares/validateRate');
const validateRateQuery = require('../middlewares/validateRateQuery');
const validateDateQuery = require('../middlewares/validateDateQuery');
const validateRatePatch = require('../middlewares/validateRatePatch');

const talkerRouter = Router();

talkerRouter.get('/', async (_req, res) => {
  const talkers = await getAllTalkers();
  if (!talkers.length) {
    return res.status(200).json([]);
  }
  return res.status(200).json(talkers);
});

talkerRouter.get('/db', async (_req, res) => {
  const talkers = await getAllTalkersDB();
  if (!talkers.length) {
    return res.status(200).json([]);
  }
  return res.status(200).json(talkers);
});

talkerRouter.get('/search',
  validateCredentials,
  validateRateQuery,
  validateDateQuery,
  async (req, res) => {
    const { q, rate, date } = req.query;
    const talkers = await searchTalker(q, rate, date);
    res.status(200).json(talkers);
  });

talkerRouter.patch('/rate/:id',
  validateCredentials,
  validateRatePatch,
  async (req, res) => {
    const id = Number(req.params.id);
    const { rate } = req.body;
    const talker = await findTalkerById(Number(id));
    const newTalker = { ...talker, talk: { ...talker.talk, rate } };
    await editTalker(newTalker, id);
    return res.status(204).end();
  });

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await findTalkerById(Number(id));
  if (talker) {
    return res.status(200).json(talker);
  }
  return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
});

talkerRouter.delete('/:id',
  validateCredentials,
  async (req, res) => {
    const id = Number(req.params.id);
    await deleteTalker(id);
    return res.status(204).end();
  });

talkerRouter.post('/',
  validateCredentials,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { name, age, talk } = req.body;
    const talkers = await getAllTalkers();
    const nextId = talkers.length + 1;
    const newTalker = {
      id: nextId,
      name,
      age,
      talk,
    };
    await writeTalkerFile(newTalker);
    return res.status(201).json(newTalker);
  });

talkerRouter.put('/:id',
  validateCredentials,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const id = Number(req.params.id);
    const newData = req.body;
    const editedTalker = { id, ...newData };
    const isTalker = await editTalker(editedTalker, id);
    if (!isTalker) {
      return res.status(404).json({
        message: 'Pessoa palestrante não encontrada',
      });
    }
    return res.status(200).json(editedTalker);
  });

module.exports = talkerRouter;