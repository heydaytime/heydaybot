const { table } = require(`${__dirname}/../timeTable`);

const PREMATURE_RESPONSE_TIME = process.env.PREMATURE_RESPONSE_TIME;

module.exports = (period) => {
  const currentDay = new Date().getDay();
  const subject = table[currentDay][period];

  return ` @everyone ${subject.toUpperCase()} period in ${
    PREMATURE_RESPONSE_TIME / 60
  } minutes!`;
};
