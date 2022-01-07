import { TableUser } from "../types";

export const reportTableCounters = (tableArr: TableUser[]) => {
  let totalUsers = tableArr.length;
  let dietUsers = 0;
  for (let i = 0; i < tableArr.length; i++) {
    if (tableArr[i].dayToggle === true) {
      totalUsers--;
    } else if (tableArr[i].diet === true) {
      dietUsers++;
    } else {
      continue;
    }
  }
  return { totalUsers, dietUsers };
};
