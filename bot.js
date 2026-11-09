const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

function startBot() {
  const bot = mineflayer.createBot({
    host: 'play.glowsmp.bond', // ✏️ hier die Serveradresse einfügen
    username: 'AFKBot5', // ✏️ oder ein echter Minecraft-Account
    port: 25565,
    version: '1.21.11' // ✏️ Anpassen an deinen Server
  });

  bot.on('spawn', () => {
    console.log('✅ Bot ist online!');
    setInterval(() => {
      bot.setControlState('sneak', true);
      bot.setControlState('jump', true);
    }, 1000);
  });

  bot.on('end', () => {
    console.log('🛑 Bot wurde gekickt – reconnect in 5s...');
    setTimeout(startBot, 5000);
  });

  bot.on('error', err => {
    console.log('❌ Fehler:', err.message);
  });
}

startBot();

app.get('/', (req, res) => {
  res.send('Bot läuft 🚀');
});

app.listen(3000, () => {
  console.log('🌐 Webserver läuft auf Port 3000');
});
