// unlock.js
module.exports = {
  name: 'unlock',
  description: 'Kanalın kilidini açar.',
  async execute(message, args) {
    try {
      const channel = message.channel;
      await channel.permissionOverwrites.create(message.guild.roles.everyone, {
        SEND_MESSAGES: true
      });

      message.reply('Kanalın kilidi açıldı.');
    } catch (error) {
      console.error('Kanalın kilidi açılırken bir hata oluştu:', error);
      message.reply('Kanalın kilidi açılırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  },
};
