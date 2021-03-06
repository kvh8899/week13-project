function formatTimeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return formatTimeSinceString(interval, "year");
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return formatTimeSinceString(interval, "month");
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return formatTimeSinceString(interval, "day");
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return formatTimeSinceString(interval, "hour");
  }
  interval = seconds / 60;
  if (interval > 1) {
    return formatTimeSinceString(interval, "minute");
  }
  return formatTimeSinceString(interval, "second");
}

function formatTimeSinceString(interval, singularTimeString) {
  const roundedAmount = Math.floor(interval);
  if (roundedAmount > 1 || roundedAmount === 0) {
    singularTimeString += "s";
  }
  return `${roundedAmount} ${singularTimeString} ago`;
}

/**
 * Gets a random date between two dates provided
 * @param {Date} start
 * @param {Date} end
 * @returns a random date between start and end
 */
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

module.exports = {
  formatTimeSince,
  randomDate,
};
