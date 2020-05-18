import { Holiday } from "./types.ts";

const WEEK_DAYS = 7;

export const isNext4Weeks = (holiday: Holiday): boolean => {
  const d = new Date(holiday.date);
  const today = new Date();
  const fourWeeksFromToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + WEEK_DAYS * 4);
  return today < d && d < fourWeeksFromToday;
}

export const sortHolidays = (a: Holiday, b: Holiday) => {
  return new Date(a.date) > new Date(b.date) ? 1 : new Date(a.date) < new Date(b.date) ? -1 : 0;
}
