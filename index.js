const { Telegraf } = require('telegraf');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Load handlers
require('./handlers/menu')(bot);
require('./handlers/admin')(bot);
require('./handlers/pairing')(bot);
require('./handlers/encryption')(bot);
require('./handlers/ai')(bot);
require('./handlers/media')(bot);
require('./handlers/adult')(bot);

// Launch bot
bot.launch().then(() => console.log("Bot is running..."));