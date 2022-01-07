import React, { useEffect, useState } from "react";
import styles from "../style/DayReport.module.css";
import { Day, TableUser } from "../types";
import DayReportTable from "./DayReportTable";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { generateDayTable } from "../utils/dayTable";
import { reportTableCounters } from "../utils/ReportTableCounters";

interface DayReportProps {
  selectedDay: Day;
  onClose: React.MouseEventHandler<SVGElement> | undefined;
}

const DayReport: React.FC<DayReportProps> = ({ selectedDay, onClose }) => {
  const [users, setUsers] = useState<TableUser[]>();
  const [tableCounters, setTableCounters] = useState<{
    totalUsers: number;
    dietUsers: number;
  }>();

  useEffect(() => {
    const fetchUsers = async () => {
      const userArray = await generateDayTable(selectedDay);
      setUsers(userArray);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users) {
      const tableCounters = reportTableCounters(users);
      setTableCounters(tableCounters);
    }
  }, [users]);

  return (
    <>
      <HiOutlineArrowLeft
        onClick={onClose}
        size={35}
        className={styles.backArrow}
      />
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <h2>
            Data: {selectedDay.day}/{Number(selectedDay.month) + 1}/
            {selectedDay.year}
          </h2>
          <div className={styles.headerCounters}>
            <h2 className={styles.countTotal}>
              Iš Viso Vaikų: {tableCounters?.totalUsers}
            </h2>
            <h2 className={styles.countSpecial}>
              Vegetariškas Maitinimas: {tableCounters?.dietUsers}
            </h2>
          </div>
        </div>
        <div className={styles.tableContainer}>
          {users ? <DayReportTable tableUsers={users} /> : null}
        </div>
      </div>
    </>
  );
};

export default DayReport;
