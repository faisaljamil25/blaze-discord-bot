const { Announcement_Channel_Id } = require('../config.js');

module.exports.help = {
  name: 'announce',
  aliases: ['an'],
  description: 'Announcement message',
  usage: 'announce',
  run: ({ client, message }) => {
    if (!message.member.permissions.has('MANAGE_CHANNELS'))
      return message.channel.send(
        "*You don't have enough permissions to execute this command.*"
      );
    const str = message.content.slice(10);
    return client.channels.cache.get(`${Announcement_Channel_Id}`).send({
      content: str,
    });
  },
};
