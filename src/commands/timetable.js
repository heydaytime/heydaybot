const secondsToHoursMintuesSeconds = require(`${__dirname}/../functions/time/sToHMS`);
const { table, timings } = require(`${__dirname}/../models/timeTable`);

module.exports = {
  name: "timetable",
  description: "gets time table of the current day",
  execute(message) {
    message.reply(timeTable());
  },
};

const timeTable = () => {
  const currentDay = new Date().getDay();
  const periods = table[currentDay];
  let timeTable = "";

  for (const [index, period] of periods.entries()) {
    const timing = secondsToHoursMintuesSeconds(timings[index]);

    const hours = timing.getHours();
    const mintues = timing.getMinutes() ? timing.getMinutes() : "00";
    const meridian = hours < 12 ? "AM" : "PM";

    timeTable += `${period} - ${hours}:${mintues} ${meridian}\n`;
  }
  return timeTable;
};
