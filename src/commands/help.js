const PREFIX = process.env.PREFIX;

module.exports = {
  name: "help",
  description: "prints bot's command line options",
  execute(message) {
    message.reply(helpMessageString());
  },
};

const helpMessageString = () => {
  const usage = `Usage: ['${PREFIX}'][option][arguments]`;
  const optionsArray = [
    ["c ", "clears the channel"],
    ["h ", "prints bot's command line options"],
    ["m", "gets a meme for you"],
    ["p ", "play video games"],
    ["s ", "shows your stats"],
    ["t  ", "gets time table of the current day"],
  ];
  let options = `Options: \n`;
  for (const [command, behaviour] of optionsArray) {
    options += `${command}      -     ${behaviour}\n`;
  }
  const helpMessage = `${usage}\n${options}`;
  return helpMessage;
};
