import styles from "../style/DayReportTable.module.css";
import { TableUser } from "../types";
import DayReportTableRow from "./DayReportTableRow";

interface DayReportTableProps {
  tableUsers: TableUser[];
}

const DayReportTable: React.FC<DayReportTableProps> = ({ tableUsers }) => {
  return (
    <table
      className={styles.tableClass}
      style={{
        borderCollapse: "collapse",
        borderRadius: "7px 7px 0 0",
        overflow: "hidden",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
        width: "100%",
        margin: "25px 0",
      }}
    >
      <thead>
        <tr>
          <th className={styles.userName}>Vardas Pavardė</th>
          <th className={styles.userDayToggle}>Dalyvavimas</th>
          <th className={styles.userMessage}>Žinutė</th>
        </tr>
      </thead>
      <tbody>
        {tableUsers.map((user) => (
          <DayReportTableRow
            key={user.id}
            username={user.username}
            dayToggle={user.dayToggle}
            message={user.message}
            diet={user.diet}
          />
        ))}
      </tbody>
    </table>
  );
};

export default DayReportTable;
