const fs = require("fs");
const path = "./data/nsfw_confirmed.json";
const logPath = "./data/nsfw_log.txt";

function loadConfirmed() {
  if (!fs.existsSync(path)) return {};
  return JSON.parse(fs.readFileSync(path));
}

function saveConfirmed(data) {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

function logConfirmedUser(user) {
  const logEntry = `${new Date().toISOString()} - ${user.username || user.first_name} (${user.id}) confirmed age\n`;
  fs.appendFileSync(logPath, logEntry);
}

module.exports = (bot) => {
  const confirmedUsers = loadConfirmed();

  bot.command(["xnxx", "xnxxdl", "xxx", "xxxdl"], async (ctx, next) => {
    const userId = String(ctx.from.id);
    if (confirmedUsers[userId]) return next();

    return ctx.reply("🔞 This command is restricted to users 18 and above. Please confirm:", {
      reply_markup: {
        inline_keyboard: [[
          { text: "✅ I confirm I am 18+", callback_data: "confirm_18" }
        ]]
      }
    });
  });

  bot.on("callback_query", async (ctx) => {
    const userId = String(ctx.from.id);
    if (ctx.callbackQuery.data === "confirm_18") {
      confirmedUsers[userId] = true;
      saveConfirmed(confirmedUsers);
      logConfirmedUser(ctx.from);
      await ctx.answerCbQuery("You are now confirmed.");
      return ctx.reply("✅ Age confirmed. You can now access NSFW features.");
    }
  });
};