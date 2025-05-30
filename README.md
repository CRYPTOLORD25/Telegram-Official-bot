# Telegram Official Bot 🤖

A powerful Telegram Bot built with Node.js, supporting many advanced features:

- 🧠 AI Chat & Coding Assistant (ChatGPT)
- 🔍 Media Search & Download (YouTube, TikTok, etc.)
- 🗣️ Text-to-Speech (TTS)
- 🔞 NSFW Search (XNXX, XXX) for private use only
- 🔗 Telegram–WhatsApp Account Pairing System
- 🛠️ Admin & Premium User Management
- ⚙️ Modular Command Handling

---

## 📦 Installation

```bash
git clone https://github.com/CRYPTOLORD25/Telegram-Official-bot.git
cd Telegram-Official-bot
npm install
```

---

## 🚀 Usage

1. Create a `.env` file using the format below:

```env
BOT_TOKEN=your_telegram_bot_token
```

2. Start the bot:

```bash
node index.js
```

---

## 🧾 Pairing Feature

This bot allows pairing your Telegram account with a WhatsApp account using an 8-digit code:

- `/pair <whatsapp_number>` → Initiates pairing and returns a unique code.
- WhatsApp bot reads the code and links the account.

All pairing data is stored in `data/pairing.json`.

---

## 📁 Project Structure

```
Telegram-Official-bot/
├── handlers/         # Command and event handlers
├── data/             # Paired user data, logs, etc.
├── index.js          # Main bot file
├── package.json      # Dependencies and scripts
├── .env              # Your secrets and tokens
└── README.md         # This file
```

---

## 🛡️ Notes

- This bot is for educational and personal use only.
- NSFW features are hidden and restricted to private mode.

---

## 💬 Contact

Made with ❤️ by [CRYPTOLORD25](https://github.com/CRYPTOLORD25)
