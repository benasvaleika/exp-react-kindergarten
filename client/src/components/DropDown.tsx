import React, { useContext, useState } from "react";
import { Redirect } from "react-router";
import { UserCtx } from "../context/userContext";
import styles from "../style/DropDown.module.css";
import { logout } from "../utils/logout";

interface DropDownProps {}

const DropDown: React.FC<DropDownProps> = ({}) => {
  const [logoutRedirect, setLogoutRedirect] = useState(false);
  const [calendarRedirect, setCalendarRedirect] = useState(false);
  const [settingsRedirect, setSettingsRedirect] = useState(false);

  const { user, setUser } = useContext(UserCtx);

  if (calendarRedirect) {
    return <Redirect to="/" />;
  }
  if (logoutRedirect) {
    return <Redirect to="/prisijungti" />;
  }
  if (settingsRedirect) {
    return <Redirect to="/nustatymai" />;
  }

  const logoutHandler = async () => {
    const loggedOut = await logout();
    setUser({
      username: "",
      id: "",
      role: "",
      message: "",
    });
    loggedOut && setLogoutRedirect(true);
  };

  return (
    <div className={styles.dropDown}>
      <a onClick={() => setCalendarRedirect(true)}>Kalendorius</a>
      <a onClick={() => setSettingsRedirect(true)}>Nustatymai</a>
      <a onClick={logoutHandler}>Atsijungti</a>
    </div>
  );
};

export default DropDown;
