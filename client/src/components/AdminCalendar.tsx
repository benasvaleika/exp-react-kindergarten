import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { API_URL } from "../constants";
import { Day, User } from "../types";
import CalendarHeader from "./CalendarHeader";
import styles from "../style/Calendar.module.css";
import CalendarDay from "./CalendarDay";
import { generateCalendar } from "../utils/calendar";
import DayReport from "./DayReport";
import Header from "./Header";

interface AdminCalendarProps {}

const AdminCalendar: React.FC<AdminCalendarProps> = ({}) => {
  const [user, setUser] = useState<User>();
  const [displayDate, setDisplayDate] = useState<string>("");
  const [dateNav, setDateNav] = useState(0);
  const [days, setDays] = useState<Day[]>([]);
  const [dayReportModalOpen, setDayReportModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Day | null>();

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

  const onDayReport = async (e: React.MouseEvent, day: Day) => {
    setSelectedDay(day);
    setDayReportModalOpen(true);
  };

  let mainBody;
  if (user) {
    if (user.message === "Not Authenticated") {
      return <Redirect to="/prisijungti" />;
    } else {
      mainBody = (
        <>
          <Header />
          {dayReportModalOpen ? (
            selectedDay && (
              <DayReport
                selectedDay={selectedDay}
                onClose={() => setDayReportModalOpen(false)}
              />
            )
          ) : (
            <div className={styles.container}>
              <CalendarHeader
                currentMonthYear={displayDate}
                onNext={() => setDateNav(dateNav + 1)}
                onPrevious={() =>
                  dateNav >= 1 ? setDateNav(dateNav - 1) : null
                }
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
                    onDayToggle={(e, day) => onDayReport(e, day)}
                    adminDay={true}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      );
    }
  }
  return <Fragment>{mainBody}</Fragment>;
};

export default AdminCalendar;
