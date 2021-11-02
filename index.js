const { Client, Collection } = require('discord.js'),
  { readdir } = require('fs');
const keepAlive = require('./server');

const client = new Client({
  intents: [
    'GUILDS',
    'DIRECT_MESSAGES',
    'GUILD_MESSAGES',
    'GUILD_MEMBERS',
    'GUILD_PRESENCES',
    'GUILD_MESSAGE_REACTIONS',
  ],
  partials: ['MESSAGE', 'REACTION'],
});

const {
  Default_Prefix,
  Token,
  Support,
  Color,
  Welcome_Channel_Id,
  Get_Start_Channel_Id,
  Hacker_Role,
  Iste_Role,
  ISTE_Team_Id,
  Hacker_Id,
} = require('./config.js');

(client.commands = new Collection()), (client.aliases = new Collection());

client.on('ready', () => {
  console.log(`Blaze Is Ready To Fly!\nTag: ${client.user.tag}`);
  client.user.setActivity('Welcoming new members!', { type: 'PLAYING' });
});

readdir('./commands', (error, files) => {
  if (error) throw error;
  for (const file of files) {
    if (!file.endsWith('.js'))
      return console.info(`${file}: does not ends with .js!`);
    const command = require(`./commands/${file}`);
    if (!command.help || !command.help.name)
      return console.info(
        `${file}: Does not have command.help and command.help.name`
      );
    client.commands.set(command.help.name, command);
    command.help.aliases
      ? command.help.aliases.forEach((alias) =>
          client.aliases.set(alias, command.help.name)
        )
      : (command.help.aliases = null);
  }
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.guild || message.webhookID) return;

  const prefix = Default_Prefix;

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).split(/ +/g),
    cmd = args.shift().toLowerCase();
  const commandFromCmd =
    client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

  if (!commandFromCmd) return message.channel.send('Sorry command not found.');

  try {
    commandFromCmd.help.run({
      client,
      message,
      args,
      Color,
      Default_Prefix,
      Support,
    });
  } catch (error) {
    console.log(error);
    return message.channel.send('Something went wrong, try again later');
  }
});
console.log(Welcome_Channel_Id);
console.log(Get_Start_Channel_Id);
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

keepAlive();
client
  .login(Token)
  .catch(() =>
    console.log(
      `Probably an invalid bot token is provided, please check your bot token.`
    )
  );
