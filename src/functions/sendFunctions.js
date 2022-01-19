const CHANNEL_ID = process.env.CHANNEL_ID;
exports.sendMessage = (client, message) => {
  client.channels.cache.get(CHANNEL_ID).send(message);
};
exports.replyToMessage = (content, message) => {
  content.reply(message);
};
