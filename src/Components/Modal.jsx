import React from "react";

const Modal = ({ isOpen, onClose, children, modalStyle, contentStyle }) => {
  if (!isOpen) return null;

  return (
    <div style={modalStyle}>
      <div style={contentStyle}>
        <button onClick={onClose} className="close-button">
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
