const { MessageActionRow, MessageButton } = require('discord.js');
const axios = require('axios');

module.exports = {
  name 'upload',
  description 'Metni yükler ve linki paylaşır.',
  async execute(message, args) {
    const [channelId, ...content] = args;

    if (!channelId) {
      return message.reply('Hedef kanal ID'sini belirtmelisiniz.');
    }

    const text = content.join(' ');

    try {
      const response = await axios.post('httpsapi.paste.eev1pastes', {
        description 'Yüklenen Metin',
        sections [
          {
            name 'Metin',
            contents text,
          },
        ],
        expire '1w',
      }, {
        headers {
          'Content-Type' 'applicationjson',
          'X-Auth-Token' 'uhcWb9tv5cCDGQxxuVOqIRgWkI1Dt0q6gfuVUr0ZC',
        },
      });

      const uploadLink = response.data.link;

      const button = new MessageButton()
        .setStyle('LINK')
        .setLabel('.gglysdia')
        .setURL(uploadLink);

      const row = new MessageActionRow()
        .addComponents(button);

      const channel = message.client.channels.cache.get(channelId);
      if (!channel) {
        return message.reply('Belirtilen kanal bulunamadı.');
      }

       Kullanıcının etiketini direkt olarak alın
      const user = message.client.users.cache.get(message.author.id);
      const userMention = user.toString();  Kullanıcının etiketini alın

      button.setLabel(`Made By Lysdia   ${userMention}`);

       Mesajı silme işlemi
      await message.delete();

      channel.send({
        content ' Paylaşım yapıldı, butona tıklayarak linke gidebilirsiniz. @everyone',
        components [row],
      });
    } catch (error) {
      console.error('Metin yüklenirken bir hata oluştu', error);
      message.reply('Metin yüklenirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
    }
  },
};
