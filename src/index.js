import NorrisBot from './bots/NorrisBot';

require('dotenv').config();

const norrisAuth = {
  name: process.env.NORRISBOT_NAME,
  token: process.env.NORRISBOT_TOKEN,
};

const norrisBot = new NorrisBot(norrisAuth);
norrisBot.run();
