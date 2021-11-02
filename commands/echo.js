module.exports.help = {
  name: 'echo',
  aliases: ['ec'],
  description: 'Echo your message!',
  usage: 'echo',
  run: ({ message }) => {
    if (!message.member.permissions.has('MANAGE_CHANNELS'))
      return message.channel.send(
        "*You don't have enough permissions to execute this command.*"
      );
    const str = message.content.slice(6);
    return message.channel.send({
      content: str,
    });
  },
};
