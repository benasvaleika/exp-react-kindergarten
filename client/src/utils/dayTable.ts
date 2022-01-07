import axios from "axios";
import { API_URL } from "../constants";
import { Day, FetchedDayReport, TableUser, User } from "../types";

export const generateDayTable = async (selectedDay: Day) => {
  // Keeps of fetch progression
  let fetchProgress = 0;

  let allUsers: User[] = [];
  try {
    const fetchedUsers = await axios.get(API_URL + "/users", {
      withCredentials: true,
    });
    allUsers = fetchedUsers.data;
    fetchProgress++;
  } catch (error) {
    console.error(error);
  }

  let userDayData: FetchedDayReport[] = [];
  try {
    const fetchedDayData = await axios.post(
      API_URL + "/calendar/day-report",
      {
        day: selectedDay.day,
        month: selectedDay.month,
        year: selectedDay.year,
      },
      { withCredentials: true }
    );
    userDayData = fetchedDayData.data;
    fetchProgress++;
  } catch (error) {
    console.error(error);
  }

  let finalTableList: TableUser[] = [];
  if (fetchProgress === 2) {
    for (let i = 0; i < allUsers.length; i++) {
      const matchingUserData = userDayData.find(
        (day) => day.user_id === allUsers[i].id
      );
      if (matchingUserData) {
        const userWithData: TableUser = {
          id: allUsers[i].id,
          username: allUsers[i].username,
          diet: allUsers[i].diet,
          message:
            matchingUserData?.message === undefined ||
            matchingUserData?.message === null
              ? ""
              : matchingUserData?.message,
          dayToggle: matchingUserData.daytoggle,
        };
        finalTableList.push(userWithData);
      } else {
        const userWithoutData: TableUser = {
          id: allUsers[i].id,
          username: allUsers[i].username,
          diet: allUsers[i].diet,
          message: "",
          dayToggle: false,
        };
        finalTableList.push(userWithoutData);
      }
    }
  }
  return finalTableList;
};
