import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { API_URL } from "../constants";
import { Day, User } from "../types";
import CalendarHeader from "./CalendarHeader";
import styles from "../style/Calendar.module.css";
import CalendarDay from "./CalendarDay";
import { generateCalendar } from "../utils/calendar";
import MessageModal from "./MessageModal";
import { calendarId } from "../utils/utils";
import Header from "./Header";

interface CalendarProps {}

const Calendar: React.FC<CalendarProps> = ({}) => {
  const [user, setUser] = useState<User>();
  const [displayDate, setDisplayDate] = useState<string>("");
  const [dateNav, setDateNav] = useState(0);
  const [days, setDays] = useState<Day[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [clickedDay, setClickedDay] = useState<Day>();
  const [error, setError] = useState<string | undefined>(undefined);

  let deviceWidth = window.innerWidth;

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

  // Generate calendar, date logic
  const generate = async () => {
    const { daysArr, displayDate } = await generateCalendar(dateNav, user);
    setDays(daysArr);
    setDisplayDate(displayDate);
  };

  useEffect(() => {
    if (user) {
      generate();
    }
  }, [dateNav, user]);

  const dayClickHandler = (day: Day) => {
    setModalOpen(true);
    setClickedDay(day);
  };

  const onDayToggle = async (e: React.MouseEvent, day: Day) => {
    try {
      if (day) {
        const id = calendarId(day.day, day.month, day.year, day.user);
        const toggleDay = await axios.post(
          API_URL + "/calendar/add",
          {
            id: id,
            user_id: day.user,
            day: day.day,
            month: day.month,
            year: day.year,
            daytoggle: !day.dayToggle,
            message: day.message,
          },
          { withCredentials: true }
        );
        if (toggleDay.data.message === "transfer successful") {
          generate();
        }
      }
    } catch (error) {
      setError("Įvyko klaida");
    }
  };

  const onSave = async (e: React.MouseEvent, currMessage: string) => {
    try {
      if (clickedDay) {
        const id = calendarId(
          clickedDay.day,
          clickedDay.month,
          clickedDay.year,
          clickedDay.user
        );
        const addMessage = await axios.post(
          API_URL + "/calendar/add",
          {
            id: id,
            user_id: clickedDay.user,
            day: clickedDay.day,
            month: clickedDay.month,
            year: clickedDay.year,
            daytoggle: clickedDay.dayToggle,
            message: currMessage,
          },
          { withCredentials: true }
        );
        generate();
        setModalOpen(false);
      }
    } catch (error) {
      setError("Įvyko klaida");
    }
  };

  let mainBody;
  if (user) {
    if (user.message === "Not Authenticated") {
      return <Redirect to="/prisijungti" />;
    } else {
      mainBody = (
        <>
          <Header />
          {error && <div className={styles.error}>{error}</div>}
          <div className={styles.container}>
            <CalendarHeader
              currentMonthYear={displayDate}
              onNext={() => setDateNav(dateNav + 1)}
              onPrevious={() => (dateNav >= 1 ? setDateNav(dateNav - 1) : null)}
            />
            {deviceWidth > 1000 ? (
              <div className={styles.weekdays}>
                <div>Pirmadienis</div>
                <div>Antradienis</div>
                <div>Trečiadienis</div>
                <div>Ketvirtadienis</div>
                <div>Penktadienis</div>
                <div>Šeštadienis</div>
                <div>Sekmadienis</div>
              </div>
            ) : (
              <div className={styles.weekdays}>
                <div>Pir</div>
                <div>Ant</div>
                <div>Tre</div>
                <div>Ket</div>
                <div>Pen</div>
                <div>Šeš</div>
                <div>Sek</div>
              </div>
            )}

            <div className={styles.calendarBody}>
              {days.map((day) => (
                <CalendarDay
                  key={day.key}
                  day={day}
                  onDayToggle={(e, day) => onDayToggle(e, day)}
                  onModal={() =>
                    day.day !== "padding" ? dayClickHandler(day) : null
                  }
                  adminDay={false}
                />
              ))}
            </div>
            {modalOpen ? (
              <MessageModal
                day={clickedDay}
                onClose={() => setModalOpen(false)}
                onSave={(e, message) => onSave(e, message)}
              />
            ) : null}
          </div>
        </>
      );
    }
  }
  return <Fragment>{mainBody}</Fragment>;
};

export default Calendar;
