// slowmode.js
module.exports = {
  name: 'slowmode',
  description: 'Kanala slowmode ekler.',
  async execute(message, args) {
    try {
      const channel = message.channel;
      const slowmodeTime = parseInt(args[0]);

      if (isNaN(slowmodeTime)) {
        return message.reply('Geçerli bir süre belirtmelisiniz.');
      }

      await channel.setRateLimitPerUser(slowmodeTime);
      message.reply(`Kanala ${slowmodeTime} saniye slowmode eklendi.`);
    } catch (error) {
      console.error('Kanala slowmode eklenirken bir hata oluştu:', error);
      message.reply('Kanala slowmode eklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  },
};
