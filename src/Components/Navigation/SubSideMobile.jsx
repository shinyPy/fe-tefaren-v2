// Navbar.js
import React from "react";

function SubNav({ isOpen, toggleNavbar }) {
  const barColor = "bg-white";
  const logoColor = isOpen ? "text-red-600" : "text-red-600";
  const hamburgerStyles = isOpen
    ? "text-white bg-red-600 rounded-full transition"
    : "text-red-600 bg-white rounded-full transition";

  return (
    <nav className=" fixed w-full top-0 shadow-md z-10">
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
            <button className={`p-2 ${hamburgerStyles}`}  onClick={toggleNavbar}>
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
    </nav>
  );
}

export default SubNav;
