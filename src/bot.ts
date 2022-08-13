/* import "reflect-metadata"; // We need this in order to use @Decorators
import config from "./config";
import express from "express";
import TelegramBot from "node-telegram-bot-api";
import Logger from "./loaders/logger";

async function startBot() {
  const bot: TelegramBot = new TelegramBot(config.bot, {
    polling: process.env.NODE_ENV === "production" ? true : false,
  });
  bot.setWebHook(`${config.url}/bot${config.bot}`);
  const app = express();
  const motd = `-----------------------------------------------
                🔰 Xhiba listening on port: ${config.port} 🔰
        -----------------------------------------------`;
  app
    .listen(config.port, async () => {
      console.log(motd);
      await require("./loaders/commands").default({
        bot: bot,
      });

      app.get(`/`, (req, res) => {
        res.send("XhibalbaBot actually running");
      });

      app.post(`/${config.bot}`, (req, res) => {
        bot.processUpdate(req.body);
        res.sendStatus(200);
        console.log(req);
      });

      bot.on("polling_error", (error) => {
        Logger.error(error);
      });

      bot.on("message", async (message) => {
        console.log(message);
      });
    })
    .on("error", (err) => {
      Logger.error(err);
      process.exit(1);
    });
}

startBot();
 */

import TelegramBot from "node-telegram-bot-api";
const TOKEN = '998778278:AAEYTCar7G2hGUYAS04Viz402MbysR0Y-oc';
const url = 'https://xhibalbabot-production.up.railway.app';
const port = 443;

import express from "express";

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/${TOKEN}`);

const app = express();

// parse the updates to JSON
app.use(express.json());

app.get(`/`, (req, res) => {
  res.send("Hello world");
});

// We are receiving updates at the route below!
app.post(`/${TOKEN}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start Express Server
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});

// Just to ping!
bot.on('message', msg => {
  console.log(msg);
});