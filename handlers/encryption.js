const fs = require("fs");
const obfuscator = require("node-obfuscator");

module.exports = (bot) => {
  bot.hears("Hard encrypt", async (ctx) => {
    if (!ctx.message.reply_to_message?.document) return ctx.reply("Reply to a .js file.");
    const fileId = ctx.message.reply_to_message.document.file_id;
    const link = await ctx.telegram.getFileLink(fileId);
    const file = await (await fetch(link.href)).text();
    const obf = obfuscator.obfuscate(file);
    fs.writeFileSync("encrypted.js", obf);
    ctx.replyWithDocument({ source: "encrypted.js", filename: "encrypted.js" });
  });

  bot.hears("Hard deobfacus", (ctx) => {
    ctx.reply("Deobfuscation not supported."); // Can’t reverse real obfuscation
  });
};