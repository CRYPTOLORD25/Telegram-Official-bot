const fs = require("fs-extra");
const path = "./data/pairs.json";
fs.ensureFileSync(path);
if (!fs.existsSync(path)) fs.writeJsonSync(path, []);

module.exports = (bot) => {
  bot.hears("Pair", async (ctx) => {
    const userId = ctx.message.from.id;
    let pairs = await fs.readJson(path);
    if (!pairs.includes(userId)) {
      pairs.push(userId);
      await fs.writeJson(path, pairs);
      ctx.reply("Paired successfully.");
    } else ctx.reply("Already paired.");
  });

  bot.hears("Delpair", async (ctx) => {
    const userId = ctx.message.from.id;
    let pairs = await fs.readJson(path);
    pairs = pairs.filter(id => id !== userId);
    await fs.writeJson(path, pairs);
    ctx.reply("Pair removed.");
  });

  bot.hears("Listpaired", async (ctx) => {
    const pairs = await fs.readJson(path);
    ctx.reply("Paired Users:
" + pairs.join("\n"));
  });
};