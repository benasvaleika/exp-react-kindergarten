import React from "react";
import styles from "../style/DayReportTableRow.module.css";

interface DayReportTableRowProps {
  username: string;
  dayToggle: boolean;
  message: string | undefined;
  diet: boolean;
}

const DayReportTableRow: React.FC<DayReportTableRowProps> = ({
  username,
  dayToggle,
  message,
  diet,
}) => {
  return (
    <tr>
      <td
        className={styles.userName}
        style={
          diet ? { backgroundColor: "#eaeaff" } : { backgroundColor: "null" }
        }
      >
        {username}
      </td>
      <td
        className={styles.userDayToggle}
        style={
          dayToggle
            ? { backgroundColor: "rgb(255, 226, 226)" }
            : { backgroundColor: "null" }
        }
      >
        {dayToggle}
      </td>
      <td className={styles.userMessage}>{message}</td>
    </tr>
  );
};

export default DayReportTableRow;
