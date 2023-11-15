import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigation } from "../../Utils/Navigation";

function NavbarMobile({ menuItems, login }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = (index) => {
    setHoveredItem(index);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const itemClass = (index) =>
    index === hoveredItem
      ? "relative group p-4 text-gray-600 transition duration-300 hover:text-red-600"
      : "relative group p-4 text-gray-600 transition duration-300";

  const barColor = "bg-white";
  const logoColor = isOpen ? "text-red-600" : "text-red-600";
  const hamburgerStyles = isOpen
    ? "text-white bg-red-600 rounded-full transition"
    : "text-red-600 bg-white rounded-full transition";

  const navbarVariants = {
    hidden: {
      height: 0,
      opacity: 0,
    },
    visible: {
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const delay = 0.2;

  const itemVariants = {
    initial: {
      opacity: 0, // Atur keadaan awal ke opacity 0
    },
    enter: {
      opacity: 1, // Atur opacity saat memasuki animasi
      transition: {
        duration: 0.3,
        delay: delay, // Atur delay hanya saat masuk
      },
    },
  };

  const handleLogout = () => {
    localStorage.removeItem("user_role");
    localStorage.removeItem("user_nis");
    localStorage.removeItem("user_email");
    localStorage.removeItem("login_success_message");
    localStorage.removeItem("accessToken");
    localStorage.setItem("preloadState", "2");
    localStorage.setItem("logout_success_message", "Logout Berhasil!");
    window.location.reload();
  };

  return (
    <nav className="fixed w-full top-0 shadow-md">
      <div className={`relative transition ${barColor}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={`${logoColor} tracking-wider text-2xl font-bold px-4`}
            >
              TEFAREN
            </div>
          </div>
          <div className="p-4">
            <button className={`p-2 ${hamburgerStyles}`} onClick={toggleNavbar}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.ul
            variants={navbarVariants}
            initial="hidden"
            exit="hidden"
            animate="visible"
            className="text-lg space-y-1 bg-blur backdrop-blur-sm"
          >
            {menuItems.map((item, index) => (
              <motion.li
                key={item.index}
                className={item.display === "display" ? itemClass(item) : ""}
                variants={itemVariants}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {item.login ? (
                  <div className="px-4 pb-4">
                    {localStorage.getItem("user_role") === "admin" ||
                    localStorage.getItem("user_role") === "user" ? (
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="text-white w-full px-3 font-semibold tracking-wider py-2 bg-red-600 rounded-md"
                      >
                        Logout
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={login}
                        className="text-white w-full px-3 font-semibold tracking-wider py-2 bg-red-600 rounded-md"
                      >
                        Login
                      </button>
                    )}
                  </div>
                ) : item.display === "display" ? (
                  <div className="relative text-center">
                    {item.isLink ? (
                      <div className=" relative">
                        <button
                          onClick={() => navigate(item.link)}
                          className="relative font-semibold text-2xl tracking-widest cursor-pointer"
                        >
                          {item.text}
                          <div className="absolute w-full bg-red-500 h-0.5 rounded-full bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                        </button>
                      </div>
                    ) : item.isSub ? (
                      <div className=" relative">
                        <button className="relative font-semibold text-2xl tracking-widest cursor-pointer">
                          {item.text}
                          <div className="absolute w-full bg-red-500 h-0.5 rounded-full bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                        </button>
                        <center>
                          <AnimatePresence initial={false} mode="wait">
                            {hoveredItem === index && item.subnav && (
                              <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{
                                  duration: 0.2,
                                  ease: "easeInOut",
                                }}
                                className="py-2"
                              >
                                {item.subnav.map((subItem, subIndex) => (
                                  <motion.button
                                    key={subIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{
                                      duration: 0.2,
                                      delay: subIndex * 0.05,
                                    }}
                                    className="block px-4 py-2 text-gray-600 font-semibold hover:text-red-600"
                                  >
                                    {subItem.text}
                                  </motion.button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </center>
                      </div>
                    ) : (
                      <button className="relative font-semibold text-2xl tracking-widest cursor-pointer">
                        {item.text}
                        <div className="absolute w-full bg-red-500 h-0.5 rounded-full bottom-0 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                      </button>
                    )}
                  </div>
                ) : null}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default NavbarMobile;
