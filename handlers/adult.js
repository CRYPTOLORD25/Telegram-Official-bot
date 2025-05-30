module.exports = (bot) => {
  bot.hears("Xnxx", (ctx) => ctx.reply("Search videos on XNXX coming soon."));
  bot.hears("Xnxxdl", (ctx) => ctx.reply("Download from XNXX coming soon."));
  bot.hears("Xxx", (ctx) => ctx.reply("Search videos on XXX site coming soon."));
  bot.hears("Xxxdl", (ctx) => ctx.reply("Download from XXX site coming soon."));
  bot.hears("Runtime", (ctx) => {
    const uptime = process.uptime();
    ctx.reply("Bot has been running for " + Math.floor(uptime) + " seconds.");
  });
};