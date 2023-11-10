const connection = require('./connection');

const getAllTalkersDB = async () => {
  const query = 'SELECT * FROM talkers';
  const [talkers] = await connection.execute(query);
  const talkersFormatted = talkers.map((talker) => ({
    id: talker.id,
    name: talker.name,
    age: talker.age,
    talk: { rate: talker.talk_rate, watchedAt: talker.talk_watched_at },
  }));
  return talkersFormatted;
};

module.exports = {
  getAllTalkersDB,
};