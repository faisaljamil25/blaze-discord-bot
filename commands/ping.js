module.exports.help = {
  name: 'ping',
  aliases: ['pg'],
  description: 'Ping the bot!',
  usage: 'ping',
  run: ({ client, message, Color }) => {
    return message.channel.send({
      embeds: [
        {
          color: Color || 'RANDOM',
          description: `**Blaze Is Ready To Fly!**\nPong - ${client.ws.ping}`,
          footer: { text: `- ${message.author.username}` },
          timestamp: new Date(),
        },
      ],
    });
  },
};
