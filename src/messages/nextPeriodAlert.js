const { table, links } = require(`${__dirname}/../models/timeTable`);

module.exports = (period) => {
  const currentDay = new Date().getDay();
  const subject = table[currentDay][period];

  return ` @everyone ${subject} is going to start soon.\nHere is the link: ${links[subject]}`;
};
