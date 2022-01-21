//Imports node_modules
const cron = require("cron");
require("dotenv").config({ path: `${__dirname}/../.env` });

//Imports custom_moudles
const { Client, Intents } = require("discord.js");
const games = require(`${__dirname}/commands/games`);
const memes = require(`${__dirname}/commands/memes`);
const rank = require(`${__dirname}/commands/rank`);

const { timings } = require(`${__dirname}/models/timeTable`);
const secondsToHoursMintuesSeconds = require(`${__dirname}/functions/time/sToHMS`);
const {
  sendMessage,
  replyToMessage,
} = require(`${__dirname}/functions/sendFunctions`);

const help = require(`${__dirname}/commands/help`);
const timetable = require(`${__dirname}/commands/timetable.js`);
const clear = require(`${__dirname}/commands/clear`);

const nextPeriodAlertMessage = require(`${__dirname}/messages/nextPeriodAlert`);

// Process Enviroment Variables
const PREMATURE_RESPONSE_TIME = process.env.PREMATURE_RESPONSE_TIME;
const PREFIX = process.env.PREFIX;
const SERVER_ID = process.env.SERVER_ID;

// Local Variables
const periodTimings = [];

// Creating the bot
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.DIRECT_MESSAGES,
  ],
});

// Bot ready event
client.on("ready", async () => {
  console.log(`${client.user.tag} has logged in.`);
});

// Scanning messages for the valid prefix
client.on("messageCreate", (message) => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return;

  const [CMD_NAME, ...args] = message.content
    .trim()
    .substring(PREFIX.length)
    .split(/\s+/);
  switch (CMD_NAME) {
    case "c":
    case "clear":
      clear.execute(message, args);
      break;
    case "t":
    case "timetable":
      timetable.execute(message);
      break;

    case "m":
    case "meme":
    case "memes":
      memes.execute(message);
      break;

    case "p":
    case "play":
      games.execute(message, args);
      break;

    case "s":
    case "stats":
      rank.execute(message);
      break;

    case "h":
    case "help":
    default:
      help.execute(message);
  }
});

// Providing Discord Bot Token
client.login(process.env.DISCORD_BOT_TOKEN);

// Scheduling Tasks
const formatDate = (date) => {
  return `${date.getSeconds()} ${date.getMinutes()} ${date.getHours()}`;
};

for (let [index, time] of timings.entries()) {
  time -= PREMATURE_RESPONSE_TIME;
  const periodTime = formatDate(secondsToHoursMintuesSeconds(time));
  const job = new cron.CronJob(`${periodTime} * * 1-6`, () => {
    sendMessage(client, nextPeriodAlertMessage(index));
  });
  job.start();
  periodTimings.push(job);
}
