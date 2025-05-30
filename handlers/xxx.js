const axios = require("axios");
const cheerio = require("cheerio");

module.exports = (bot) => {
  bot.command("xxx", async (ctx) => {
    const query = ctx.message.text.split(" ").slice(1).join(" ");
    if (!query) return ctx.reply("Usage: /xxx <search terms>");
    try {
      const searchUrl = `https://www.pornhub.com/video/search?search=${encodeURIComponent(query)}`;
      const res = await axios.get(searchUrl);
      const $ = cheerio.load(res.data);
      let results = [];
      $(".searchVideo").each((i, el) => {
        const title = $(el).find("a.title").text().trim();
        const link = "https://www.pornhub.com" + $(el).find("a").attr("href");
        const thumb = $(el).find("img").attr("data-thumb_url") || $(el).find("img").attr("src");
        if (title && link && thumb) {
          results.push({ title, link, thumb });
        }
      });
      if (results.length === 0) return ctx.reply("No results found.");
      results = results.slice(0, 5);
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

  bot.command("xxxdl", async (ctx) => {
    const url = ctx.message.text.split(" ").slice(1)[0];
    if (!url || !url.includes("pornhub.com")) return ctx.reply("Usage: /xxxdl <Pornhub video URL>");
    try {
      const res = await axios.get(url);
      const match = res.data.match(/"quality_720p":"(.*?)"/);
      const videoUrl = match ? match[1].replace(/\\/g, "") : null;
      if (!videoUrl) return ctx.reply("Failed to get download link.");
      ctx.reply(`🎥 Video download link:
${videoUrl}`);
    } catch (err) {
      console.error(err);
      ctx.reply("Failed to extract video link.");
    }
  });
};