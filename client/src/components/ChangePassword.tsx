import axios from "axios";
import React, { useContext, useState } from "react";
import { API_URL } from "../constants";
import { UserCtx } from "../context/userContext";
import styles from "../style/ChangePassword.module.css";
import InputWindow from "./InputWindow";

interface ChangePasswordProps {}

const ChangePassword: React.FC<ChangePasswordProps> = ({}) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const { user, setUser } = useContext(UserCtx);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (oldPassword === "" || newPassword === "" || newPasswordConfirm === "") {
      setError("Tuščias laukelis");
    } else {
      if (newPassword === newPasswordConfirm) {
        const submitNewPassword = await axios.post(
          API_URL + "/change-password",
          {
            oldPassword: oldPassword,
            newPassword: newPassword,
          },
          { withCredentials: true }
        );
        setOldPassword("");
        setNewPassword("");
        setNewPasswordConfirm("");
        {
          submitNewPassword.data.message === "Incorrect password" &&
            setError("Neteisingas slaptažodis");
        }
      } else {
        setError("Slaptažodžiai nesutampa");
      }
    }
  };

  return (
    <InputWindow title="Keisti Slaptažodį">
      <form className={styles.form}>
        <div className={styles.inputs}>
          <div>
            <label>Senas Slaptažodis: </label>
            <input
              name="oldPassword"
              value={oldPassword}
              type="password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Naujas Slaptažodis: </label>
            <input
              name="newPassword"
              value={newPassword}
              type="password"
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div>
            <label>Patvirtinti Naują Slaptažodį: </label>
            <input
              name="newPasswordConfirm"
              value={newPasswordConfirm}
              type="password"
              onChange={(e) => setNewPasswordConfirm(e.target.value)}
            />
          </div>
          {error && <div className={styles.error}>{error}</div>}

          <button onClick={(e) => handleSubmit(e)}>Keisti Slaptažodį</button>
        </div>
      </form>
    </InputWindow>
  );
};

export default ChangePassword;
