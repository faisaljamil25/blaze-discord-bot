require('dotenv').config();

const config = {
  Default_Prefix: '!',
  Color: 'RANDOM',
  Token: process.env.DISCORD_BOT_TOKEN,
  Welcome_Channel_Id: process.env.WELCOME_CHANNEL,
  Get_Start_Channel_Id: process.env.GET_START_CHANNEL,
  Announcement_Channel_Id: process.env.ANNOUNCEMENT_CHANNEL,
  Hacker_Role: process.env.HACKER_ROLE,
  Iste_Role: process.env.ISTE_ROLE,
  Hacker_Id: process.env.HACKER_ID,
  ISTE_Team_Id: process.env.TEAM_ID,
  Support: 'https://versionbeta.istemanit.in/',
};

module.exports = config;
