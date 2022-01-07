import React, { useEffect, useRef, useState, useContext } from "react";
import styles from "../style/Header.module.css";
import { IoIosArrowDropdown } from "react-icons/io";
import DropDown from "./DropDown";
import axios from "axios";
import { API_URL } from "../constants";
import { UserCtx } from "../context/userContext";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [DropDownBtnVisile, setDropDownBtnVisible] = useState(false);
  const [error, setError] = useState(false);
  const { user, setUser } = useContext(UserCtx);
  const dropDownRef = useRef() as any;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await axios.get(API_URL + "/authenticated", {
          withCredentials: true,
        });
        setUser(userData.data[0]);
        setDropDownBtnVisible(true);
      } catch (error) {
        setError(true);
      }
    };

    if (user.message === "") {
      fetchUser();
    } else if (user.message === "Not Authenticated") {
      setDropDownBtnVisible(false);
    } else {
      setDropDownBtnVisible(true);
    }
  }, [user]);

  // Close Dropdown on clock outside
  const handleMouseDown = (event: any) => {
    if (!dropDownRef?.current.contains(event.target)) {
      setDropDownOpen(false);
    }
  };

  useEffect(() => {
    if (dropDownOpen) {
      document.addEventListener("mousedown", handleMouseDown);
    } else {
      document.removeEventListener("mousedown", handleMouseDown);
    }
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [dropDownOpen, handleMouseDown]);

  return (
    <div className={styles.header}>
      <h1 className={styles.fakeLogo}>LOGO</h1>
      <div className={styles.rightSide}>
        <div className={styles.username}>{user.username}</div>
        <div ref={dropDownRef} className={styles.dropDownBtn}>
          {DropDownBtnVisile && (
            <>
              <IoIosArrowDropdown
                color="white"
                size="30"
                cursor="pointer"
                onClick={() => setDropDownOpen(!dropDownOpen)}
              />
            </>
          )}
          {error && <div className={styles.error}>Įvyko klaida</div>}
          {dropDownOpen && <DropDown />}
        </div>
      </div>
    </div>
  );
};

export default Header;
