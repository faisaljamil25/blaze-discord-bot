const { Client } = require('discord.js');

const client = new Client();

const {
  Token,
  Welcome_Channel_Id,
  Hacker_Role,
  Iste_Role,
  Hacker_Id,
  ISTE_Team_Id,
} = require('./config.js');

client.on('ready', () => {
  console.log(`Blaze Is Ready To Fly!\nTag: ${client.user.tag}`);
  client.user.setActivity('Welcoming new members!', { type: 'PLAYING' });
});

client.on('guildMemberAdd', async (member) => {
  const welcomeChannel = Welcome_Channel_Id;
  if (!welcomeChannel) return;
  const welcomeMessage = `Hello there! <@${member.id}>👋 Glad to have you here. Nice to meet you.🤝 I’m Blaze, The Fiery Phoenix.🔥 Want to know the server better? Let me give you a tour. Hop on my wings and here we go!\n✈️ Next up : <#${Get_Start_Channel_Id}>`;

  if (member.user.username.length > 25)
    member.user.username = member.user.username.slice(0, 25) + '...';
  if (member.guild.name.length > 15)
    member.guild.name = member.guild.name.slice(0, 15) + '...';

  return client.channels.cache.get(welcomeChannel).send({
    content: welcomeMessage,
  });
});

client.on('messageReactionAdd', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === `${Hacker_Role}`) {
    switch (name) {
      case '🔥':
        member.roles.add(`${Hacker_Id}`);
        break;
    }
  } else if (reaction.message.id === `${Iste_Role}`) {
    switch (name) {
      case '🍀':
        member.roles.add(`${ISTE_Team_Id}`);
        break;
    }
  }
});

client.on('messageReactionRemove', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === `${Hacker_Role}`) {
    switch (name) {
      case '🔥':
        member.roles.remove(`${Hacker_Id}`);
        break;
    }
  } else if (reaction.message.id === `${Iste_Role}`) {
    switch (name) {
      case '🍀':
        member.roles.remove(`${ISTE_Team_Id}`);
        break;
    }
  }
});

client
  .login(Token)
  .catch(() =>
    console.log(
      `Probably an invalid bot token is provided, please check your bot token.`
    )
  );
