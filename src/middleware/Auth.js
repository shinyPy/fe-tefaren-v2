import React from "react";
import AuthPage from "../Pages/AuthPage";
import Home from "../Pages/Home";
import axios from "axios";

const Auth = () => {
  let token = localStorage.getItem("accessToken");
  let hasil = false;
  axios
    .get(`http://127.0.0.1:8000/api/user`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      if (res.status.ok) {
        hasil = true;
      }
    })
    .catch((err) => {
      hasil = false;
    });

  if (hasil) {
    return <AuthPage />;
  }

  if (!hasil !== null) {
    return <Home />;
  }
};

export default Auth;
