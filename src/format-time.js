function transformDate(date) {
  if (typeof date !== 'string' || date.indexOf('T') > -1) {
    return date;
  }
  return date.replace(/\-/g, '/')
}

function padStartZero(num) {
  return String(num).padStart(2, 0);
}

function formatTime(target, format = 'YYYY-MM-DD') {
  if (!target) {
    return '';
  };
  const currentDate = new Date(transformDate(target));
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  const seconds = currentDate.getSeconds();

  let timeStr = format.replace(/Y+/, year);
  timeStr = timeStr.replace(/M+/, (match) => match.length === 2 ? padStartZero(month) : month);
  timeStr = timeStr.replace(/D+/, (match) => match.length === 2 ? padStartZero(day) : day);
  timeStr = timeStr.replace(/H+/, (match) => match.length === 2 ? padStartZero(hours) : hours);
  timeStr = timeStr.replace(/m+/, (match) => match.length === 2 ? padStartZero(minutes) : minutes);
  timeStr = timeStr.replace(/s+/, (match) => match.length === 2 ? padStartZero(seconds) : seconds);

  return timeStr;
}

module.exports = formatTime;
