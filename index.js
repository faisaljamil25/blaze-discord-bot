const { Client } = require('discord.js');

const client = new Client();

const { Token } = require('./config.js');

client.on('ready', () => {
  console.log(`Blaze Is Ready To Fly!\nTag: ${client.user.tag}`);
  client.user.setActivity('Welcoming new members!', { type: 'PLAYING' });
});

client
  .login(Token)
  .catch(() =>
    console.log(
      `Probably an invalid bot token is provided, please check your bot token.`
    )
  );
