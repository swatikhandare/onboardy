import AssignedTask from "./models/AssignedTask";

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

export const generateStockImage = (firstName: string, lastName: string): string => {
  return `https://via.placeholder.com/50/cccccc/000000?text=${firstName.slice(0,1)}${lastName.slice(0,1)}`
}

export const findAndReplaceInArrayByID = (array: any[], id: string, replacement: any ) => {
  const arrayClone = [...array];
  const targetItemIndex = arrayClone.findIndex(item => item.id === id);
  if (targetItemIndex < 0) return;
  arrayClone[targetItemIndex] = replacement;
  return arrayClone
} 


export const calculateAssignedTasksProgress = (assignedTasks: AssignedTask[]) => {
  if(!assignedTasks.length) return 0;
  const completedTasks = assignedTasks.filter(aTask => aTask.isDone);
  const completedPercentage =(completedTasks.length / assignedTasks.length) * 100
  return Math.round(completedPercentage * 100) / 100;
}