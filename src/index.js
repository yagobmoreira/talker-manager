const express = require('express');
const { getAllTalkers, findTalkerById, writeTalkerFile, editTalker } = require('./utils/talker');
const generateToken = require('./utils/generateToken');
const validateEmail = require('./middlewares/validateEmail');
const validatePassword = require('./middlewares/validatePassword');
const validateCredentials = require('./middlewares/validateCredentials');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateTalk = require('./middlewares/validateTalk');
const validateWatchedAt = require('./middlewares/validateWatchedAt');
const validateRate = require('./middlewares/validateRate');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.post('/talker',
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

app.put('/talker/:id',
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

app.get('/talker', async (_req, res) => {
  const talkers = await getAllTalkers();
  if (!talkers.length) {
    return res.status(200).json([]);
  }
  return res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await findTalkerById(Number(id));
  if (talker) {
    return res.status(200).json(talker);
  }
  return res.status(404).json({
    message: 'Pessoa palestrante não encontrada',
  });
});

app.post('/login', validateEmail, validatePassword, async (req, res) => {
  const token = generateToken();
  return res.status(200).json({
    token,
  });
});

app.listen(PORT, () => {
  console.log('Online');
});
