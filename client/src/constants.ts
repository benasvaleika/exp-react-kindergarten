import { config as dotenv } from "dotenv";

dotenv();

export const API_URL = process.env.REACT_APP_API_URL;
export const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
