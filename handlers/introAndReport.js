const moment = require("moment");
const botStartTime = Date.now();

module.exports = (bot) => {
  const OWNER_USERNAME = "yourusername"; // Replace with your @username
  const WHATSAPP_CHANNEL_URL = "https://wa.me/1234567890"; // Replace with your WhatsApp link
  const TELEGRAM_CHANNEL_URL = "https://t.me/YourChannelUsername"; // Replace with your Telegram channel link

  const getIntroMessage = (ctx) => {
    const runtime = moment.utc(Date.now() - botStartTime).format("HH:mm:ss");
    const userId = ctx.from.id;
    const name = ctx.from.username ? "@" + ctx.from.username : ctx.from.first_name;
    return `🤖 *Hi! I am a Telegram bot here to help you. Feel free to use me!*

` +
           `🆔 *User ID:* \`${userId}\`
` +
           `👤 *Sender Name:* ${name}
` +
           `👑 *Owner:* @${OWNER_USERNAME}
` +
           `⏱️ *Bot Runtime:* \`${runtime}\`

` +
           `📋 *Available Commands Below:*`;
  };

  bot.command("menu", async (ctx) => {
    // Step 1: Send your image first — change the source or URL as needed
    await ctx.replyWithPhoto({ url: "https://example.com/your-image.jpg" }); // <-- Replace with your image URL or local file

    // Step 2: Then send the introduction message and buttons
    ctx.replyWithMarkdown(getIntroMessage(ctx), {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "📢 Telegram Channel", url: TELEGRAM_CHANNEL_URL },
            { text: "📲 WhatsApp Channel", url: WHATSAPP_CHANNEL_URL }
          ],
          [
            { text: "🤖 Contact Owner", url: `https://t.me/${OWNER_USERNAME}` },
            { text: "🐞 Report Bug", url: `https://t.me/${OWNER_USERNAME}` }
          ],
          [
            { text: "▶️ Next Page", callback_data: "next_page_2" }
          ]
        ]
      }
    });
  });

  bot.on("callback_query", (ctx) => {
    const cb = ctx.callbackQuery.data;

    if (cb === "next_page_2") {
      ctx.editMessageText("*🎵 Media & AI Commands:*", {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🎵 Play", callback_data: "play_cmd" },
              { text: "📹 Video", callback_data: "video_cmd" }
            ],
            [
              { text: "🤖 AI", callback_data: "ai_cmd" },
              { text: "💻 Code AI", callback_data: "codeai_cmd" }
            ],
            [
              { text: "📥 Download", callback_data: "download_cmd" },
              { text: "🔊 TTS", callback_data: "tts_cmd" }
            ],
            [
              { text: "➡️ Next Page 3", callback_data: "next_page_3" },
              { text: "⬅️ Back", callback_data: "back_to_menu" }
            ]
          ]
        }
      });
    }

    if (cb === "next_page_3") {
      ctx.editMessageText("*🔞 NSFW & Runtime Commands:*", {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              { text: "🔞 XNXX", callback_data: "xnxx_cmd" },
              { text: "📥 XNXXDL", callback_data: "xnxxdl_cmd" }
            ],
            [
              { text: "🔞 XXX", callback_data: "xxx_cmd" },
              { text: "📥 XXXDL", callback_data: "xxxdl_cmd" }
            ],
            [
              { text: "📊 Runtime", callback_data: "runtime_cmd" },
              { text: "⬅️ Back", callback_data: "next_page_2" }
            ]
          ]
        }
      });
    }

    if (cb === "back_to_menu") {
      ctx.deleteMessage();
      ctx.telegram.sendMessage(ctx.from.id, getIntroMessage(ctx), {
        parse_mode: "Markdown",
        reply_markup: {
          inline_keyboard: [
            [
              { text: "📢 Telegram Channel", url: TELEGRAM_CHANNEL_URL },
              { text: "📲 WhatsApp Channel", url: WHATSAPP_CHANNEL_URL }
            ],
            [
              { text: "🤖 Contact Owner", url: `https://t.me/${OWNER_USERNAME}` },
              { text: "🐞 Report Bug", url: `https://t.me/${OWNER_USERNAME}` }
            ],
            [
              { text: "▶️ Next Page", callback_data: "next_page_2" }
            ]
          ]
        }
      });
    }
  });
};