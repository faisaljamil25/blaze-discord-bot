require('dotenv').config();

const config = {
  Token: process.env.DISCORD_BOT_TOKEN,
  Welcome_Channel_Id: process.env.WELCOME_CHANNEL,
};

module.exports = config;
