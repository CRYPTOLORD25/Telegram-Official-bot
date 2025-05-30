const fs = require("fs");

const REQUIRED_CHANNEL = "@YourChannelUsername"; // replace this with your channel username
const OWNER_USERNAME = "yourusername"; // replace with your Telegram @username
const WHATSAPP_CHANNEL_URL = "https://wa.me/1234567890"; // replace with your WhatsApp channel link

module.exports = (bot) => {
  bot.start(async (ctx) => {
    const member = await ctx.telegram.getChatMember(REQUIRED_CHANNEL, ctx.from.id).catch(() => null);
    if (!member || ["left", "kicked"].includes(member.status)) {
      return ctx.reply("🚫 To use this bot, you must first join our Telegram channel:", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "📢 Join Channel", url: `https://t.me/${REQUIRED_CHANNEL.replace('@', '')}` }],
            [{ text: "✅ I Joined", callback_data: "check_joined" }]
          ]
        }
      });
    }

    ctx.reply("🎉 Welcome to the bot! Use the menu below to explore features.", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "🤖 Owner", url: `https://t.me/${OWNER_USERNAME}` }],
          [{ text: "📲 WhatsApp Channel", url: WHATSAPP_CHANNEL_URL }]
        ]
      }
    });
  });

  bot.on("callback_query", async (ctx) => {
    if (ctx.callbackQuery.data === "check_joined") {
      const member = await ctx.telegram.getChatMember(REQUIRED_CHANNEL, ctx.from.id).catch(() => null);
      if (!member || ["left", "kicked"].includes(member.status)) {
        return ctx.answerCbQuery("❌ You haven't joined yet.", { show_alert: true });
      }
      ctx.answerCbQuery("✅ Verified!");
      ctx.reply("🎉 Access granted! Use the menu below:", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "🤖 Owner", url: `https://t.me/${OWNER_USERNAME}` }],
            [{ text: "📲 WhatsApp Channel", url: WHATSAPP_CHANNEL_URL }]
          ]
        }
      });
    }
  });
};