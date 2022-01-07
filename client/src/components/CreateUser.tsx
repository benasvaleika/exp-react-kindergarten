import axios from "axios";
import React, { useState } from "react";
import { API_URL } from "../constants";
import InputWindow from "./InputWindow";
import styles from "../style/CreateUser.module.css";

interface CreateUserProps {}

const CreateUser: React.FC<CreateUserProps> = ({}) => {
  const [userField, setUserField] = useState("");
  const [passField, setPassField] = useState("");
  const [adminField, setAdminField] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const userChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUserField(e.target.value);
  };

  const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassField(e.target.value);
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (userField === "" || passField === "") {
      setError("Tuščias langelis");
    } else {
      try {
        const registerUser = await axios.post(
          API_URL + "/register",
          {
            username: userField,
            password: passField,
            role: adminField,
          },
          {
            withCredentials: true,
          }
        );
        setUserField("");
        setPassField("");
        setAdminField(false);
        if (registerUser.data.message === "User already exists") {
          setError("Vartotojas jau egzistuoja");
        }
      } catch (error) {
        setError("Serverio klaida");
      }
    }
  };

  return (
    <>
      <InputWindow title="Kurti Naują Vartotoją">
        <>
          <form className={styles.form}>
            <div className={styles.inputs}>
              <div>
                <label>Vartotojo Vardas: </label>
                <input
                  name="username"
                  value={userField}
                  onChange={(e) => userChangeHandler(e)}
                />
              </div>
              <div>
                <label>Slaptažodis: </label>
                <input
                  type="password"
                  name="password"
                  value={passField}
                  onChange={(e) => passwordChangeHandler(e)}
                />
              </div>
              <div>
                <label>Administratoriaus Privilegijos: </label>
                <input
                  type="checkbox"
                  name="admin"
                  defaultChecked={adminField}
                  onChange={(e) => setAdminField(e.target.checked)}
                />
              </div>

              {error && <div className={styles.error}>{error}</div>}
              <button onClick={(e) => handleSubmit(e)}>Kurti Vartotoją</button>
            </div>
          </form>
        </>
      </InputWindow>
    </>
  );
};

export default CreateUser;
