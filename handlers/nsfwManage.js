const fs = require("fs");
const path = "./data/nsfw_confirmed.json";

function loadConfirmed() {
  if (!fs.existsSync(path)) return {};
  return JSON.parse(fs.readFileSync(path));
}

function saveConfirmed(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

module.exports = (bot) => {
  bot.command("nsfwusers", (ctx) => {
    const confirmedUsers = loadConfirmed();
    const list = Object.keys(confirmedUsers);
    if (list.length === 0) return ctx.reply("No users have confirmed age yet.");
    const message = "✅ Confirmed NSFW Users (by Telegram ID)":
     + list.join("");
    ctx.reply(message);
  });

  bot.command("delnsfw", (ctx) => {
    const args = ctx.message.text.split(" ").slice(1);
    if (args.length === 0) return ctx.reply("Usage: /delnsfw <telegram user ID>");
    const userId = args[0];
    const confirmedUsers = loadConfirmed();
    if (!confirmedUsers[userId]) return ctx.reply("User ID not found in confirmed list.");
    delete confirmedUsers[userId];
    saveConfirmed(confirmedUsers);
    ctx.reply(`❌ Removed user ${userId} from NSFW access.`);
  });
};