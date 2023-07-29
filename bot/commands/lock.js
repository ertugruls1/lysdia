// lock.js
module.exports = {
  name: 'lock',
  description: 'Kanalı kilitler.',
  async execute(message, args) {
    try {
      const channel = message.channel;
      await channel.permissionOverwrites.create(message.guild.roles.everyone, {
        SEND_MESSAGES: false
      });

      const userTag = `\`${message.author.tag}\``;
      await channel.send(`Bu kanal ${userTag} tarafından kilitlendi.`);

    } catch (error) {
      console.error('Kanal kilitlenirken bir hata oluştu:', error);
      message.reply('Kanal kilitlenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  },
};
