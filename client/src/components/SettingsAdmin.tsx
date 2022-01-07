import React from "react";
import styles from "../style/SettingsAdmin.module.css";
import ChangePassword from "./ChangePassword";
import CreateUser from "./CreateUser";
import TableAllUsers from "./TableAllUsers";

interface SettingsAdminProps {}

const SettingsAdmin: React.FC<SettingsAdminProps> = ({}) => {
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.smallBoxesCont}>
          <div className={styles.newUserBox}>
            <CreateUser />
          </div>
          <div className={styles.changePassBox}>
            <ChangePassword />
          </div>
        </div>
        <div className={styles.allUsersBox}>
          <TableAllUsers />
        </div>
      </div>
    </>
  );
};

export default SettingsAdmin;
