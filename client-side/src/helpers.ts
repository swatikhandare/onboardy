export const getReadableDate = (timestamp: string) => {
  const now = Date.now();
  const formattedTimeStamp = new Date(timestamp).getTime();
  const difference = now - formattedTimeStamp;
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  if (difference < minute) {
    return 'just now';
  } else if (difference < hour) {
    const minutes = Math.round(difference/minute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (difference < day) {
    const hours = Math.round(difference/hour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (difference < week) {
    const days = Math.round(difference/day);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else if (difference < month) {
    const weeks = Math.round(difference/week);
    return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  } else if (difference < year) {
    const months = Math.round(difference/month);
    return `${months} month${months > 1 ? "s" : ""} ago`;
  } else {
    const years = Math.round(difference/year);
    return `${years} year${years > 1 ? "s" : ""} ago`;
  }
}