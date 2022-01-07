import React, { MouseEvent, useEffect } from "react";
import { useState } from "react";
import styles from "../style/CalendarDay.module.css";
import { Day } from "../types";
import { BiMessageAltDetail } from "react-icons/bi";

interface DayProps {
  day: Day;
  onModal?: React.MouseEventHandler<SVGElement> | undefined;
  onDayToggle: (e: MouseEvent, day: Day) => void;
  adminDay: boolean;
}

const CalendarDay: React.FC<DayProps> = ({
  day,
  onModal,
  onDayToggle,
  adminDay,
}) => {
  const [dayToggle, setDayToggle] = useState(false);
  const [messagePresent, setMessagePresent] = useState(false);
  const [isWeekend, setIsWeekend] = useState(false);
  const [isInPast, setIsInPast] = useState(false);

  const dayClassName = `${styles.day} 
  ${day.day === "padding" ? styles.padding : ""} 
  ${day.isWeekend ? styles.weekendDay : ""} 
  ${day.isInPast && !day.isWeekend ? styles.pastDay : ""}
  ${day.isCurrDay === true ? styles.currentDay : ""} 
  ${dayToggle ? styles.dayToggled : ""}`;

  useEffect(() => {
    if (day.dayToggle === true) {
      setDayToggle(true);
    }
    if (day.message) {
      setMessagePresent(true);
    }

    if (day.isWeekend) {
      setIsWeekend(true);
    }

    if (day.isInPast) {
      setIsInPast(true);
    }
  }, []);

  return (
    <div className={dayClassName}>
      <div className={styles.dayHeader}>
        {day.day === "padding" ? (
          ""
        ) : (
          <>
            {day.day}
            {!isWeekend && !isInPast && !adminDay ? (
              <BiMessageAltDetail
                onClick={onModal}
                color={messagePresent ? "red" : "#aaaaaa"}
              />
            ) : null}
          </>
        )}
      </div>
      {day.day !== "padding" && !isWeekend && !isInPast ? (
        <div
          onClick={(e) => onDayToggle(e, day)}
          className={styles.dayBg}
        ></div>
      ) : null}
    </div>
  );
};

export default CalendarDay;
