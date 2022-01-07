export const CapitalizeFirst = (word: string) => {
  return word[0].toUpperCase() + word.slice(1);
};

// Makes monday first day of the week instead of sunday
export const AdjustWeekStart = (index: number) => {
  return index === 0 ? 6 : index - 1;
};

// Calendar id gen
export const calendarId = (
  day: string | number,
  month: string | number,
  year: string | number,
  id: string | undefined
) => {
  if (id) {
    return `${day}${month}${year}${id}`;
  }
};

// Calendar key gen
export const calendarKey = (
  day: string | number,
  month: string | number,
  year: string | number
) => {
  return `${day}${month}${year}`;
};

// Get day of the week
export const isWeekend = (day: number, month: number, year: number) => {
  const date = new Date();
  date.setFullYear(year);
  date.setMonth(month);
  date.setDate(day);

  let result = false;
  if (date.getDay() === 6 || date.getDay() === 0) {
    result = true;
  }
  return result;
};

// Check if date is in the past
export const isInPast = (day: number, month: number, year: number) => {
  const date = new Date();

  // Solution to toISOString() changing timezone
  const offsetDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );
  const dateNow = parseInt(
    offsetDate.toISOString().slice(0, 10).replace(/-/g, "")
  );
  const dateDay = Number(
    `${year}${
      String(month).length === 1
        ? String(month) !== "9"
          ? "0" + Number(month + 1)
          : "10"
        : month + 1
    }${String(day).length === 1 ? "0" + day : day}`
  );
  return dateNow > dateDay ? true : false;
};
