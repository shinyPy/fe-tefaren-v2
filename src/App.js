import React, { useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./Pages/Home";
import AuthPage from "./Pages/AuthPage";
import NotFound from "./Pages/NotFound";
import Dashboard from "./Pages/Dashboard";
import NotAuth from "./Pages/NotAuth";
import AccountData from "./Pages/AccountData";
import ItemData from "./Pages/ItemData";
import Jobset from "./Pages/Jobset";
import Cataset from "./Pages/Cataset";
import Auth from "./middleware/Auth";

//style
import "./Assets/Style/App.css";
import "./Assets/Style/Preload.css";
import "./Assets/Style/Homepreload.css";

//function
import PrivateRoute from "./Utils/PrivateRoutes";
import { useModal } from "./Utils/ModalUtils";
import Majorset from "./Pages/Majorset";

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
        <Route path="/" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
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
          path="/accountdata"
          element={
            <PrivateRoute
              element={<AccountData />}
              element2={<NotAuth />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/itemdata"
          element={
            <PrivateRoute
              element={<ItemData />}
              element2={<NotAuth />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/jobset"
          element={
            <PrivateRoute
              element={<Jobset />}
              element2={<NotAuth />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/cataset"
          element={
            <PrivateRoute
              element={<Cataset />}
              element2={<NotAuth />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/majorset"
          element={
            <PrivateRoute
              element={<Majorset />}
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
