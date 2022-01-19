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
    ["t", "gets time table of the current day"],
    ["c", "clears the channel"],
    ["h", "prints bot's command line options"],
  ];
  let options = `Options:`;
  for (const [command, behaviour] of optionsArray) {
    options += `\n${command}      -     ${behaviour}`;
  }
  const helpMessage = `${usage}\n${options}`;
  return helpMessage;
};
