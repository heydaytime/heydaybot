const fs = require("fs");
const updateUser = require(`${__dirname}/../functions/updateUser`);

const eg = "eg. $play #game[rps] #play[paper]";
// console.log(userData());
module.exports = {
  name: "play",
  description: "play video games",

  execute(message, args) {
    const game = args[0];
    const usersPlay = args[1];

    if (!usersPlay) return message.reply(`Please enter a valid game! ${eg}`);

    switch (game) {
      case "rps":
        rps(message, usersPlay);
        break;
      default:
        return message.reply("That game does not exist!");
    }
  },
};

const rps = (message, usersPlay) => {
  let userData = JSON.parse(
    fs.readFileSync(`${__dirname}/../../data/userdata.json`, {
      encoding: "utf8",
      flag: "r",
    })
  );

  const id = message.author.id;
  const user = userData.users[id];
  let winStatus = false;
  let outputMessage = "Something went wrong!";
  const plays = {
    rock: {
      win: "scissors",
      lose: "paper",
    },
    paper: {
      win: "rock",
      lose: "scissors",
    },
    scissors: {
      win: "paper",
      lose: "rock",
    },
  };

  const botsplay =
    Object.keys(plays)[
      Math.round(Math.random() * (Object.keys(plays).length - 1))
    ];

  const experience = Math.round(50 * Math.random());

  switch (usersPlay) {
    case "rock":
    case "paper":
    case "scissors":
      user.totalNumberOfGamesPlayed++;

      message.reply(`I play ${botsplay}`);

      if (usersPlay === plays[botsplay].lose)
        (winStatus = 1),
          (outputMessage = `You won this round! +${experience}pts`);
      else if (usersPlay === plays[botsplay].win)
        (winStatus = 0),
          (outputMessage = `You lost this round! -${experience}pts`);
      else (winStatus = -1), (outputMessage = `It's a draw.`);

      user.score +=
        winStatus === 1
          ? experience + 15
          : winStatus === 0
          ? -experience
          : winStatus === -1
          ? 0
          : 0;

      break;
    default:
      outputMessage = `I didn't understand what you wanted to play when you went with ${usersPlay}.`;
  }

  message.reply(outputMessage);
  updateUser(user, id);
};
