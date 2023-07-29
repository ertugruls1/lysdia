const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'rez',
  description: 'Rez oluşturur.',
  async execute(message, args) {
    const targetCount = parseInt(args[0]);

    if (isNaN(targetCount)) {
      return message.reply('Geçerli bir sayı belirtmelisiniz.');
    }

    const button = new MessageButton()
      .setStyle('PRIMARY')
      .setLabel('Rez')
      .setCustomId('rez_button');

    let clickCount = 0;

    const statsButton = new MessageButton()
      .setStyle('SECONDARY')
      .setLabel(`${clickCount}/${targetCount} Tıklandı`)
      .setCustomId('stats_button')
      .setDisabled(true);

    const row = new MessageActionRow()
      .addComponents(button, statsButton);

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Rez Oluşturuldu! ||@everyone||')
      .setDescription(`Hedef sayı: ${targetCount} `)
      .setAuthor('Lysdia', 'https://cdn.discordapp.com/attachments/1128248073714417707/1129474381777752064/standard.gif');

    const messageComponent = await message.channel.send({
      embeds: [embed],
      components: [row]
    });

    const clickers = new Set();

    const collector = messageComponent.createMessageComponentCollector({
      componentType: 'BUTTON'
    });

    collector.on('collect', async interaction => {
      if (!clickers.has(interaction.user.id)) {
        clickers.add(interaction.user.id);
        clickCount++;

        row.components[1].setLabel(`${clickCount}/${targetCount} Tıklandı`);

        if (clickCount === targetCount) {
          collector.stop();
          row.components[0].setDisabled(true);

          // Hedefe ulaşıldığında "Hedefe Ulaşıldı!" embed'ini oluştur
          const targetReachedEmbed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Hedefe Ulaşıldı!')
            .setDescription(`Hedef sayı: ${targetCount}`)
            .setAuthor('Made By Lysdia', 'https://cdn.discordapp.com/attachments/1128240431566700574/1132952998402850866/channels4_profile.jpg');

          // Katılımcıları göster
          const participants = Array.from(clickers).map(userId => `<@${userId}>`).join('\n');
          targetReachedEmbed.addField('Katılımcılar', participants);

          messageComponent.edit({ embeds: [targetReachedEmbed], components: [row] });
        } else {
          // Hedefe ulaşılmadığında normal embed'i güncelle
          embed.setDescription(`Hedef sayı: ${targetCount}\n\nKatılımcılar:\n${Array.from(clickers).map(userId => `<@${userId}>`).join('\n')}`);
          messageComponent.edit({ embeds: [embed], components: [row] });
        }

        interaction.reply({ content: 'Başarılı!', ephemeral: true });
      }
    });
  }
};
