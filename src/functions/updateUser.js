const fs = require("fs");

module.exports = (user, id) => {
  let userData = JSON.parse(
    fs.readFileSync(`${__dirname}/../../data/userdata.json`, {
      encoding: "utf8",
      flag: "r",
    })
  );
  userData.users[id] = user;
  userData = JSON.stringify(userData);
  fs.writeFileSync(`${__dirname}/../../data/userdata.json`, userData);
};
