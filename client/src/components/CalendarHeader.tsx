import React, { MouseEventHandler } from "react";
import styles from "../style/CalendarHeader.module.css";
import { HiOutlineArrowRight, HiOutlineArrowLeft } from "react-icons/hi";

interface CalendarHeaderProps {
  currentMonthYear: string;
  onNext: MouseEventHandler<SVGElement> | undefined;
  onPrevious: MouseEventHandler<SVGElement> | undefined;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentMonthYear,
  onNext,
  onPrevious,
}) => {
  return (
    <div className={styles.mainContainer}>
      <h1>{currentMonthYear}</h1>
      <div className={styles.prevNext}>
        <HiOutlineArrowLeft
          className={styles.arrowLeft}
          size={25}
          onClick={onPrevious}
        />
        <HiOutlineArrowRight
          size={25}
          className={styles.arrowLeft}
          onClick={onNext}
        />
      </div>
    </div>
  );
};

export default CalendarHeader;
