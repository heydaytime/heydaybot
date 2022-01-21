const fs = require("fs");

const timeTable = fs.readFileSync(
  `${__dirname}/../../data/time-table/time-table.json`,
  "utf8",
  (err, timeTable) => {
    return timeTable;
  }
);

module.exports = JSON.parse(timeTable);
