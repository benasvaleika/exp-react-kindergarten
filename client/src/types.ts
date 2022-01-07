export interface User {
  id: string;
  username: string;
  role?: string;
  diet: boolean;
  // optional error message
  message?: string;
}

export interface Day {
  key: string;
  user?: string;
  day: string | number;
  month: number | string;
  year: number | string;
  message: string | null;
  dayToggle: boolean;
  isWeekend: boolean;
  isCurrDay: boolean;
  isInPast: boolean;
}

export interface FetchedDay {
  user_id: string;
  day: number;
  month: number;
  year: number;
  message: string | null;
  daytoggle: boolean;
}

export interface AdminDay {
  key: string;
  user?: string;
  day: string | number;
  month: number | string;
  year: number | string;
  isWeekend: boolean;
  isCurrDay: boolean;
  isInPast: boolean;
}

export interface TableUser {
  id: string;
  username: string;
  dayToggle: boolean;
  message: string | undefined;
  diet: boolean;
}

export interface FetchedDayReport {
  user_id: string;
  daytoggle: boolean;
  message: string;
}
