import axios from "axios";
import { API_URL, weekdays } from "../constants";
import { Day, FetchedDay, User } from "../types";
import { AdjustWeekStart, CapitalizeFirst, isInPast, isWeekend } from "./utils";
import { v4 as uuidv4 } from "uuid";

export const generateCalendar = async (
  dateNav: number,
  user: User | undefined
) => {
  const date = new Date();
  const daysArr: Day[] = [];

  if (dateNav !== 0) {
    date.setMonth(new Date().getMonth() + dateNav);
  }

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayStr = firstDayOfMonth.toLocaleDateString("en-uk", {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });
  const paddingDays = AdjustWeekStart(
    weekdays.indexOf(firstDayStr.split(", ")[0])
  );

  // fetch calendar data from the database
  const fetchCalendar = await axios.post(API_URL + "/calendar/month", {
    month: month,
    year: year,
    user_id: user?.id,
  });
  const calendarData: FetchedDay[] = fetchCalendar.data;

  // date display setup for calendar header
  const displayDate = `${CapitalizeFirst(
    date.toLocaleDateString("lt-LT", { month: "long" })
  )} ${year}`;

  // Days array generation
  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const matchingDay = calendarData.find((day) => day.day === i - paddingDays);
    const dayIsWeekend = isWeekend(i - paddingDays, month, year);
    const dayInPast = isInPast(i - paddingDays, month, year);
    if (dayInPast && i > paddingDays) {
      const pastDay: Day = {
        key: uuidv4(),
        day: i - paddingDays,
        month: month,
        year: year,
        isCurrDay: false,
        user: user?.id,
        dayToggle: false,
        isWeekend: dayIsWeekend,
        message: null,
        isInPast: true,
      };
      daysArr.push(pastDay);
    } else if (matchingDay) {
      const matchingDayObj: Day = {
        key: uuidv4(),
        day: matchingDay.day,
        month: matchingDay.month,
        year: matchingDay.year,
        isCurrDay: i - paddingDays === day && dateNav === 0,
        user: matchingDay.user_id,
        dayToggle: matchingDay.daytoggle,
        isWeekend: false,
        message: matchingDay.message,
        isInPast: false,
      };
      daysArr.push(matchingDayObj);
    } else if (i > paddingDays && !matchingDay) {
      const dayObj: Day = {
        key: uuidv4(),
        day: i - paddingDays,
        month: month,
        year: year,
        isCurrDay: i - paddingDays === day && dateNav === 0,
        user: user?.id,
        dayToggle: false,
        isWeekend: dayIsWeekend,
        message: null,
        isInPast: false,
      };
      daysArr.push(dayObj);
    } else {
      const paddingDayObj: Day = {
        key: uuidv4(),
        day: "padding",
        month: "padding" + i,
        year: "padding",
        dayToggle: false,
        isWeekend: false,
        message: null,
        isCurrDay: false,
        isInPast: false,
      };
      daysArr.push(paddingDayObj);
    }
  }

  return { daysArr, displayDate };
};
