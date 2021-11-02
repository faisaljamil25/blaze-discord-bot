require('dotenv').config();

const config = {
  Token: process.env.DISCORD_BOT_TOKEN,
  Welcome_Channel_Id: process.env.WELCOME_CHANNEL,
  Hacker_Role: process.env.HACKER_ROLE,
  Iste_Role: process.env.ISTE_ROLE,
  Hacker_Id: process.env.HACKER_ID,
  ISTE_Team_Id: process.env.TEAM_ID,
};

module.exports = config;
