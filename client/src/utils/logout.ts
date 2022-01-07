import axios from "axios";
import { API_URL } from "../constants";

export const logout = async () => {
  let success = false;
  try {
    await axios.get(API_URL + "/logout", {
      withCredentials: true,
    });
    success = true;
  } catch (error) {
    console.error(error);
  }
  return success;
};
