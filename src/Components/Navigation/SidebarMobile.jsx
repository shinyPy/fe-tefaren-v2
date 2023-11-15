import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logoTelkom from "../../Assets/Image/logo-telkom-schools-horisontal-1024x320.png";
import { useNavigation } from "../../Utils/Navigation";

const SidebarMobile = ({ items }) => {
  const navigate = useNavigation();

  const handleLogout = () => {
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_nis");
    localStorage.removeItem("user_email");
    localStorage.removeItem("login_success_message");
    localStorage.removeItem("accessToken");
    localStorage.setItem("preloadState", "2");
    localStorage.setItem("login_success_message", "Logout Berhasil!");
    navigate("/");
  };

  return (
    <div>
    <div className="overflow-y-auto">
        <div className="mt-8 mb-4">
            <center>
                <img src={logoTelkom} className="w-9/12 h-9/12" alt="jnweini"/>
            </center>
        </div>
        <ul>
            {items.map((item, index) => (<SidebarItem key={index} item={item}/>))}
        </ul>
    </div>
    <div className="px-4 tracking-widest mb-4">
        <center>
            <button
                type="button"
                onClick={() => navigate("/")}
                className="text-white px-3 w-full font-semibold tracking-wider py-2 bg-gray-600 rounded-md">
                Beranda
            </button>
            <button
                type="button"
                onClick={handleLogout}
                className="text-white mt-4 px-3 w-full font-semibold tracking-wider py-2 bg-red-600 rounded-md">
                Logout
            </button>
        </center>
    </div>
</div>
  );
};

const SidebarItem = ({ item }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const navigate = useNavigation();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
    setIsActive(!isActive);
  };

  return (
    <li className="py-1 relative group transition duration-300">
      {item.subtext ? (
        <center>
          <div className=" text-lg tracking-wider font-bold py-2 text-gray-700">
            {item.subtext}
          </div>
        </center>
      ) : null}

      {item.children ? (
        <div>
          <button
            className={`flex group relative overflow-hidden px-4 py-2 text-${
              isActive ? "gray" : "red"
            }-600 transition duration-300 hover:text-red-600 `}
            onClick={toggleDropdown}
          >
            <span className=" font-semibold ml-7 flex">
              <span className="mt-1 mr-2">{item.icon}</span>
              {item.text}
            </span>
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-3 w-3 ml-0.5 mt-2`}
              animate={{ rotate: isDropdownOpen ? 0 : -90 }}
              initial={false}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M19 9l-7 7-7-7"
              />
            </motion.svg>
            <div
              className={`absolute left-0 top-0 rounded-r-full bg-red-600 ${
                isActive ? "w-0 " : "w-2.5"
              } h-full transition-all duration-300 ${
                isActive ? "group-hover:w-2.5" : ""
              }`}
            />
          </button>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.ul
                className="ml-8 mt-2"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
              >
                {item.children.map((child, childIndex) => (
                  <motion.li
                    key={childIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-1"
                  >
                    <button
                      onClick={() => navigate(child.path)}
                      className="text-gray-600 font-semibold transition duration-300 hover:text-red-600"
                    >
                      <span className=" ml-6">{child.sub}</span>
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      ) : (
        <button
          onClick={() => navigate(item.path)}
          className="group relative overflow-hidden px-4 py-2 text-gray-600 hover:text-red-600"
        >
          <span className=" font-semibold ml-7 flex">
            <span className="mt-1 mr-2">{item.icon}</span>
            {item.text}
          </span>
          <div
            className={`absolute left-0 top-0 rounded-r-full bg-red-600 ${
              isActive ? "w-0 " : "w-2.5"
            } h-full transition-all duration-300 ${
              isActive ? "group-hover:w-2.5" : ""
            }`}
          />
        </button>
      )}
    </li>
  );
};

export default SidebarMobile;
