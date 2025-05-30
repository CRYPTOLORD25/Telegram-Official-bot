const fs = require("fs-extra");
const adminPath = "./data/admins.json";
const premPath = "./data/premiums.json";

fs.ensureFileSync(adminPath);
fs.ensureFileSync(premPath);
if (!fs.existsSync(adminPath)) fs.writeJsonSync(adminPath, []);
if (!fs.existsSync(premPath)) fs.writeJsonSync(premPath, []);

module.exports = (bot) => {
  bot.hears("Add admin", async (ctx) => {
    const userId = ctx.message.reply_to_message?.from?.id;
    if (userId) {
      let admins = await fs.readJson(adminPath);
      if (!admins.includes(userId)) {
        admins.push(userId);
        await fs.writeJson(adminPath, admins);
        ctx.reply("Admin added.");
      } else ctx.reply("Already admin.");
    } else ctx.reply("Reply to a user's message to add as admin.");
  });

  bot.hears("Deladmin", async (ctx) => {
    const userId = ctx.message.reply_to_message?.from?.id;
    if (userId) {
      let admins = await fs.readJson(adminPath);
      admins = admins.filter(id => id !== userId);
      await fs.writeJson(adminPath, admins);
      ctx.reply("Admin removed.");
    } else ctx.reply("Reply to a user's message to remove from admin.");
  });

  bot.hears("Addprem", async (ctx) => {
    const userId = ctx.message.reply_to_message?.from?.id;
    if (userId) {
      let premiums = await fs.readJson(premPath);
      if (!premiums.includes(userId)) {
        premiums.push(userId);
        await fs.writeJson(premPath, premiums);
        ctx.reply("Premium user added.");
      } else ctx.reply("Already premium.");
    } else ctx.reply("Reply to a user's message to add as premium.");
  });

  bot.hears("Delprem", async (ctx) => {
    const userId = ctx.message.reply_to_message?.from?.id;
    if (userId) {
      let premiums = await fs.readJson(premPath);
      premiums = premiums.filter(id => id !== userId);
      await fs.writeJson(premPath, premiums);
      ctx.reply("Premium user removed.");
    } else ctx.reply("Reply to a user's message to remove from premium.");
  });
};
