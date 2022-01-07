import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminCalendar from "../components/AdminCalendar";
import Calendar from "../components/Calendar";
import { User } from "../types";
import { config as dotenv } from "dotenv";
import { API_URL } from "../constants";

dotenv();

interface MainProps {}

const Main: React.FC<MainProps> = ({}) => {
  const [user, setUser] = useState<User | null>(null);

  // Fetch user authentication status
  useEffect(() => {
    const fetchUser = async () => {
      let userInfo = await axios.get(API_URL + "/authenticated", {
        withCredentials: true,
      });
      setUser(userInfo.data[0]);
    };
    fetchUser();
  }, []);

  return (
    <>
      {user ? user?.role === "admin" ? <AdminCalendar /> : <Calendar /> : null}
    </>
  );
};

export default Main;
