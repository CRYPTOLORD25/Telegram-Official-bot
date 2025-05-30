const { Markup } = require("telegraf");

module.exports = (bot) => {
  bot.start((ctx) => {
    ctx.reply("Welcome to the Telegram Bot!", getMainMenu());
  });

  bot.hears("Menu", (ctx) => ctx.reply("Main Menu", getMainMenu()));
  bot.hears("Next ➡️", (ctx) => ctx.reply("Page 2", getPage2Menu()));
  bot.hears("Next Page ➡️", (ctx) => ctx.reply("Page 3", getPage3Menu()));
};

function getMainMenu() {
  return Markup.keyboard([
    ["Addprem", "Delprem"],
    ["Add admin", "Deladmin"],
    ["Pair", "Delpair"],
    ["Listpaired", "Hard encrypt", "Hard deobfacus"],
    ["Menu", "Next ➡️"]
  ]).resize();
}

function getPage2Menu() {
  return Markup.keyboard([
    ["Play", "Video"],
    ["Ai", "Coding ai"],
    ["Download", "Text to speech"],
    ["Menu", "Next Page ➡️"]
  ]).resize();
}

function getPage3Menu() {
  return Markup.keyboard([
    ["Xnxx", "Xnxxdl"],
    ["Xxx", "Xxxdl"],
    ["Runtime"],
    ["Menu"]
  ]).resize();
}