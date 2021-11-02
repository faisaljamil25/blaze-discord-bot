module.exports.help = {
  name: 'help',
  aliases: ['h'],
  description: 'Bot Help Command ;)',
  usage: 'Help | <Command Name>',
  run: async ({ client, message, args, Color, Support, Default_Prefix }) => {
    const Prefix = Default_Prefix;

    const Commands = [...client.commands.values()]
      .map((cmd) => '`' + cmd.help.name + '`')
      .join(', ');

    if (!args[0])
      return message.channel.send({
        embeds: [
          {
            color: Color || 'RANDOM',
            title: `${client.user.username} Help!`,
            thumbnail: { url: client.user.displayAvatarURL({ format: 'jpg' }) },
            description: `Type the following command for a specific command information -\n**${Prefix}help <Command name>**\n\n**🕹 Commands**\n${Commands}\n\n**Useful Links**\nSupport server - [Click me](${
              Support || 'https://versionbeta.istemanit.in/'
            })\n\nThank You So Much <3`,
          },
        ],
      });

    const command =
      client.commands.find((cmd) => cmd.help.name === args[0].toLowerCase()) ||
      client.commands.find((cmd) => cmd.help.name === args[0].toLowerCase());

    if (!command)
      return message.channel.send({
        content: `No command found - ${
          args[0].charAt(0).toUpperCase() + args[0].slice(1)
        }`,
      });

    return message.channel.send({
      embeds: [
        {
          color: Color || 'RANDOM',
          title: 'Command information',
          thumbnail: { url: client.user.displayAvatarURL({ format: 'jpg' }) },
          fields: [
            {
              name: 'Name',
              value:
                command.help.name.charAt(0).toUpperCase() +
                command.help.name.slice(1),
              inline: true,
            },
            {
              name: 'Aliases',
              value: command.help.aliases
                ? command.help.aliases.join(', ')
                : 'No Aliases',
              inline: true,
            },
            {
              name: 'Usage',
              value: command.help.usage,
              inline: true,
            },
            {
              name: 'Description',
              value: command.help.description,
            },
          ],
          footer: { text: `- ${message.author.username}` },
          timestamp: new Date(),
        },
      ],
    });
  },
};
