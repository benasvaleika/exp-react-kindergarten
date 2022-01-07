import axios from "axios";
import { API_URL } from "../constants";
import { User } from "../types";

export const generateAllTable = async () => {
  let successful = false;
  try {
    const fetchedUsers = await axios.get(API_URL + "/users/all", {
      withCredentials: true,
    });
    const resultUsers: User[] = fetchedUsers.data;
    successful = true;
    return { successful, resultUsers };
  } catch (error) {
    return { successful, error };
  }
};
