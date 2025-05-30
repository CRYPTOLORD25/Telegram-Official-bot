module.exports = (bot) => {
  bot.hears("Ai", (ctx) => ctx.reply("Ask me anything with /ask <question>"));
  bot.hears("Coding ai", (ctx) => ctx.reply("Ask coding questions with /code <your question>"));

  bot.command("ask", async (ctx) => {
    const q = ctx.message.text.split(" ").slice(1).join(" ");
    ctx.reply("AI says: This is a response to your question: " + q);
  });

  bot.command("code", async (ctx) => {
    const q = ctx.message.text.split(" ").slice(1).join(" ");
    ctx.reply("Coding AI says: This is an answer to your coding query: " + q);
  });
};