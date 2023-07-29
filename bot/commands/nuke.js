module.exports = {
  name: 'nuke',
  description: 'Kanaldaki tüm mesajları siler ve izinleri korur.',
  async execute(message, args) {
    try {
      const channel = message.channel;

      // Kanalın ait olduğu kategoriye erişim sağlanması
      const category = channel.parent;

      // Kanalın izinlerinin alınması ve kopyalanması
      const channelPermissions = channel.permissionOverwrites.cache.map((permission) => ({ id: permission.id, allow: permission.allow.toArray() }));

      // Yeni bir kanal oluşturma işlemi
      const newChannel = await channel.clone();

      // Kanalın kategorisini ayarlama
      await newChannel.setParent(category);

      // Kanalın izinlerini ayarlama
      channelPermissions.forEach(async (permission) => {
        if (permission.id === message.guild.roles.everyone.id) {
          await newChannel.permissionOverwrites.create(permission.id, {
            SEND_MESSAGES: Array.isArray(permission.allow) && permission.allow.includes('SEND_MESSAGES'),
            VIEW_CHANNEL: permission.allow.includes('VIEW_CHANNEL'),
          });
        } else {
          await newChannel.permissionOverwrites.create(permission.id, {
            SEND_MESSAGES: permission.allow.includes('SEND_MESSAGES'),
            VIEW_CHANNEL: permission.allow.includes('VIEW_CHANNEL'),
          });
        }
      });

      // Kanalı silme işlemi
      await channel.delete();

      // Nuke işlemi mesajı
      await newChannel.send(`Bu kanal \`${message.author.username}\` tarafından nukelendi!`);
    } catch (error) {
      console.error('Kanal nukelenirken bir hata oluştu:', error);
      message.reply('Kanal nukelenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  },
};
