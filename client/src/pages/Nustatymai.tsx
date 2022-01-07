import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router";
import Header from "../components/Header";
import SettingsAdmin from "../components/SettingsAdmin";
import SettingsUser from "../components/SettingsUser";
import { API_URL } from "../constants";
import { UserCtx } from "../context/userContext";

interface KeistiSlaptazodiProps {}

const KeistiSlaptazodi: React.FC<KeistiSlaptazodiProps> = ({}) => {
  const [loginRedirect, setLoginRedirect] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserCtx);

  useEffect(() => {
    const fetchUser = async () => {
      let userInfo = await axios.get(API_URL + "/authenticated", {
        withCredentials: true,
      });
      if (userInfo.data[0].message === "Not Authenticated") {
        setLoginRedirect(true);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <>
      {!loading ? (
        loginRedirect ? (
          <Redirect to="/prisijungti" />
        ) : user.role === "admin" ? (
          <>
            <Header />
            <SettingsAdmin />
          </>
        ) : (
          <>
            <Header />
            <SettingsUser />
          </>
        )
      ) : null}
    </>
  );
};

export default KeistiSlaptazodi;
