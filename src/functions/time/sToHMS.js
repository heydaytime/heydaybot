module.exports = (time) => {
  const seconds = (time % 3600) % 60;
  const mintues = (time % 3600) / 60;
  const hours = time / 3600;

  const newDate = new Date(0, 0, 0, hours, mintues, seconds);
  return newDate;
};
