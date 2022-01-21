const canvacord = require("canvacord");
const Discord = require("discord.js");
const fs = require("fs");

module.exports = {
  name: "rank",
  description: "gets your rank",

  execute(message) {
    let userData = JSON.parse(
      fs.readFileSync(`${__dirname}/../../data/userdata.json`, {
        encoding: "utf8",
        flag: "r",
      })
    );

    const background = `${__dirname}/../../data/images/background.jpg`;
    const user = message.author;

    const xp = userData.users[user.id].score % 500;
    const level = Math.round(userData.users[user.id].score / 500);

    const avatar = userData.users[message.author.id].avatar;
    const rank = new canvacord.Rank()
      .setAvatar(avatar)
      .setCurrentXP(xp)
      .setRequiredXP(500)
      .setProgressBar("#98D8D5", "COLOR")
      .setUsername(user.username, "#FFD15C")
      .setLevel(level)
      .setDiscriminator("6942", "#AAAAAA")
      .setBackground("IMAGE", background)
      .setRank(0, "", false);

    rank.build().then((data) => {
      const attachment = new Discord.MessageAttachment(data, "RankCard.png");
      message.channel.send({ files: [attachment] });
    });
  },
};
