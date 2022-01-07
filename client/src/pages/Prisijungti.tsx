import React from "react";
import Header from "../components/Header";
import Login from "../components/Login";

interface prisijungtiProps {}

const prisijungti: React.FC<prisijungtiProps> = ({}) => {
  return (
    <>
      <Header />
      <Login />
    </>
  );
};

export default prisijungti;
