import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import NotFound from "./Pages/NotFound";
import Dashboard from "./Pages/Dashboard";
import NotAuth from "./Pages/NotAuth";
import AccountData from "./Pages/AccountData";

//style
import "./Assets/Style/App.css";
import "./Assets/Style/Preload.css";
import "./Assets/Style/Homepreload.css";

//function
import PrivateRoute from "./Utils/PrivateRoutes";
import { useModal } from "./Utils/ModalUtils";

const App = () => {
  const [isLoginOpen, setIsLoginOpen] = useModal("login", false);
  const [isRegisterOpen, setIsRegisterOpen] = useModal("register", false);

  const openLogin = useCallback(() => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  }, [setIsLoginOpen, setIsRegisterOpen]);

  const openRegister = useCallback(() => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  }, [setIsRegisterOpen, setIsLoginOpen]);

  useEffect(() => {
    const handleRouteChange = () => {
      if (window.location.pathname === "/login") {
        localStorage.setItem("preloadState", "2");
        openLogin();
      } else if (window.location.pathname === "/register") {
        localStorage.setItem("preloadState", "2");
        openRegister();
      }
    };
    return () => {
      handleRouteChange();
    };
  }, [openLogin, openRegister]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute
              element={<Dashboard />}
              element2={<NotAuth />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/account"
          element={
            <PrivateRoute
              element={<AccountData />}
              element2={<NotAuth />}
              allowedRoles={["admin"]}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
