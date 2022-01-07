import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { API_URL } from "../constants";
import { UserCtx } from "../context/userContext";
import styles from "../style/SettingsUser.module.css";
import ChangePassword from "./ChangePassword";
import InputWindow from "./InputWindow";

interface SettingsUserProps {}

const SettingsUser: React.FC<SettingsUserProps> = ({}) => {
  const [userDiet, setUserDiet] = useState({});
  const [error, setError] = useState<string | undefined>(undefined);
  const { user, setUser } = useContext(UserCtx);

  useEffect(() => {
    setUserDiet(user.diet);
  }, [user]);

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.changePassContainer}>
          <ChangePassword />
        </div>
        <div className={styles.dietContainer}>
          <InputWindow title="Dieta">
            <>
              <div className={styles.dietText}></div>
              {error && <div className={styles.error}>{error}</div>}
            </>
          </InputWindow>
        </div>
      </div>
    </>
  );
};

export default SettingsUser;
