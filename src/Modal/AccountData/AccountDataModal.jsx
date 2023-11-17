import React, {useEffect, useRef} from "react";
import { motion } from "framer-motion";

const AccountDataModal = ({ rowData, closeModal }) => {
    const formRef = useRef(null);
    const customContentStyle = {
        marginBottom: "100vh",
      };

    const modalVariants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: -300 }, // Atur nilai y sesuai dengan tinggi yang diinginkan
      };

      useEffect(() => {
        const handleOutsideClick = (e) => {
          if (formRef.current && !formRef.current.contains(e.target)) {
            closeModal();
          }
        };
    
        if (rowData) {
          document.addEventListener("mousedown", handleOutsideClick);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      }, [rowData, closeModal]);
    
    return (
        <motion.div
            initial="closed"
            animate={rowData
                ? "open"
                : "closed"}
            exit="closed"
            variants={modalVariants}
            transition={{
                duration: 0.35
            }}
            style={{ height: "200vh" }}
            className="fixed top-0 left-0 w-full bg-opacity-50 bg-gray-700 flex justify-center items-center backdrop-blur-sm">
                      <div
        className="bg-white p-8 justify-center items-center rounded-2xl"
        ref={formRef}
        style={customContentStyle}
      >
          {Object.entries(rowData).map(([key, value]) => (
            <p key={key}>
              <strong>{key}:</strong> {value}
            </p>
          ))}
          </div>
          </motion.div>
    );
  };

  export default AccountDataModal;