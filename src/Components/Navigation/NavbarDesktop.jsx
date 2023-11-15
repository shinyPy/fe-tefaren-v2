import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from "../../Utils/Navigation";

const NavbarDesktop = ({ items, login }) => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigation();

  useEffect(() => {
    // Add an event listener to track scroll position
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_nis");
    localStorage.removeItem("user_email");
    localStorage.removeItem("login_success_message");
    localStorage.removeItem("accessToken");
    localStorage.setItem("preloadState", "2");
    localStorage.setItem("login_success_message", "Logout Berhasil!");
    window.location.reload();
  };

  const itemClass = (index) =>
    index === hoveredItem
      ? "relative group p-4 text-gray-600 transition duration-300 hover:text-red-600"
      : "relative group p-4 text-gray-600 transition duration-300";

  return (
    <nav
      className={` w-full ${
        isScrolled ? " fixed bg-white shadow-md" : "bg-transparent"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-red-600 tracking-wider text-2xl font-bold px-4">
          TEFAREN
        </div>
        <ul className="flex space-x-4">
          {items.map((item, index) => (
            <li
              key={index}
              className={item.display === "display" ? itemClass(item) : ""}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {item.display === "display" ? (
                <div className="relative">
                  {item.isSub ? (
                    <div className="font-semibold text-xl tracking-wider cursor-pointer">
                      {item.text}
                      <div className="absolute w-full bg-red-500 h-0.5 rounded-full bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                    </div>
                  ) : item.isLink ? (
                    <button
                      onClick={() => navigate(item.link)}
                      className="font-semibold text-xl tracking-wider cursor-pointer relative"
                    >
                      {item.text}
                      <div className="absolute w-full bg-red-500 h-0.5 rounded-full bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                    </button>
                  ) : (
                    <button className="font-semibold text-xl tracking-wider cursor-pointer">
                      {item.text}
                      <div className="absolute w-full bg-red-500 h-0.5 rounded-full bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                    </button>
                  )}
                </div>
              ) : null}

              {item.display === "display" ? (
                <AnimatePresence>
                  {hoveredItem === index && item.subnav && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                      className="fixed mt-6 py-2 bg-white text-gray-600 border shadow-lg rounded-md"
                    >
                      {item.subnav.map((subItem, subIndex) => (
                        <button
                          key={subIndex}
                          className="block px-4 py-2 font-semibold transition duration-300 hover:text-red-600"
                        >
                          {subItem.text}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              ) : null}
            </li>
          ))}
        </ul>
        <div>
          <div className="px-4">
            {localStorage.getItem("user_role") === "admin" ||
            localStorage.getItem("user_role") === "user" ? (
              <button
                type="button"
                onClick={handleLogout}
                className="text-white px-3 font-semibold tracking-wider py-2 bg-red-600 rounded-md"
              >
                Logout
              </button>
            ) : (
              <button
                type="button"
                onClick={login}
                className="text-white px-3 font-semibold tracking-wider py-2 bg-red-600 rounded-md"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDesktop;
