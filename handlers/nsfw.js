const axios = require("axios");
const cheerio = require("cheerio");

module.exports = (bot) => {
  bot.command("xnxx", async (ctx) => {
    const query = ctx.message.text.split(" ").slice(1).join(" ");
    if (!query) return ctx.reply("Usage: /xnxx <search terms>");
    try {
      const searchUrl = `https://www.xnxx.com/search/${encodeURIComponent(query)}`;
      const res = await axios.get(searchUrl);
      const $ = cheerio.load(res.data);
      let results = [];
      $(".thumb").each((i, el) => {
        const title = $(el).find(".thumb-under > p > a").text().trim();
        const link = "https://www.xnxx.com" + $(el).find("a").attr("href");
        const thumb = $(el).find("img").attr("data-src");
        if (title && link && thumb) {
          results.push({ title, link, thumb });
        }
      });
      if (results.length === 0) return ctx.reply("No results found.");
      results = results.slice(0, 5); // limit to 5 results
      for (let video of results) {
        await ctx.replyWithPhoto({ url: video.thumb }, {
          caption: `${video.title}
${video.link}`
        });
      }
    } catch (err) {
      console.error(err);
      ctx.reply("Failed to fetch results.");
    }
  });

  bot.command("xnxxdl", async (ctx) => {
    const url = ctx.message.text.split(" ").slice(1)[0];
    if (!url || !url.includes("xnxx.com")) return ctx.reply("Usage: /xnxxdl <video URL>");
    try {
      const res = await axios.get(url);
      const match = res.data.match(/html5player.setVideoUrlHigh\('(.*?)'\)/);
      const videoUrl = match ? match[1] : null;
      if (!videoUrl) return ctx.reply("Failed to get download link.");
      ctx.reply(`🎥 Video download link:
${videoUrl}`);
    } catch (err) {
      console.error(err);
      ctx.reply("Failed to extract video link.");
    }
  });
};