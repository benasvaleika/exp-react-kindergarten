import axios from "axios";
import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { API_URL } from "../constants";
import { UserCtx } from "../context/userContext";
import styles from "../style/Login.module.css";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const [userField, setUserField] = useState("");
  const [passField, setPassField] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { user, setUser } = useContext(UserCtx);

  if (loggedIn) {
    return <Redirect to="/" />;
  }

  const userChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserField(e.target.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassField(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (userField === "" || passField === "") {
      setError("Tuščias langelis");
    } else {
      try {
        await axios.post(
          `${API_URL}/login`,
          {
            username: userField,
            password: passField,
          },
          { withCredentials: true }
        );
        const fetchedUser = await axios.get(API_URL + "/authenticated", {
          withCredentials: true,
        });
        setUser(fetchedUser.data[0]);

        setLoggedIn(true);
      } catch (error) {
        if (error.message === "Request failed with status code 401") {
          setError("Netesingas vartotojas ar slaptažodis");
          setUserField("");
          setPassField("");
        } else {
          setError("Įvyko klaida");
        }
      }
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.loginWindow}>
        <form className={styles.form}>
          <h1 className={styles.fakeLogo}>Logo</h1>
          <input
            name="username"
            placeholder="Vartotojas"
            value={userField}
            onChange={(e) => userChangeHandler(e)}
          ></input>
          <input
            type="password"
            placeholder="Slaptažodis"
            name="password"
            value={passField}
            onChange={(e) => passwordChangeHandler(e)}
          ></input>
          <button onClick={(e) => handleSubmit(e)} className={styles.submitBtn}>
            Prisijungti
          </button>
        </form>
        {error && <div className={styles.error}>{error}</div>}
      </div>
    </div>
  );
};

export default Login;
