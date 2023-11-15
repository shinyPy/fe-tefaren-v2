import React, { useState } from "react";
import { FaCloud, FaEye, FaEyeSlash } from "react-icons/fa"; // Import the eye icons

const CommonInput = ({
  onChange = () => console.log("Bankai : Kannonbiraki Benihime Aratame"),
  onFocus = () => console.log("Bankai : Senbonzakura Kageyoshi"),
  onBlur = () => console.log("Bankai : Minazuki"),
  onClick = () => console.log("Bankai : Hakka no Togame"),
  placeholder,
  icon: Icon = FaCloud,
  value,
  isSelect = false,
  children,
  enable = true, // Enable prop to control input element
  customStyle = "", // Custom CSS class for input
  inputType, // Input type (text, password, email, etc.)
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const inputClassName = enable
    ? `w-full px-12 py-2 border bg-white border-gray-300 rounded-lg transition-colors duration-300 focus:outline-none focus:border-blue-500 ${customStyle}`
    : `w-full px-12 py-2 border bg-gray-200 rounded-lg transition-colors duration-300 focus:outline-none focus:border-blue-500 cursor-not-allowed ${customStyle}`;

  const finalInputType = enable
    ? inputType === "password"
      ? passwordVisible
        ? "text"
        : "password"
      : inputType
    : inputType === "password"
    ? "password"
    : "text";

  if (isSelect) {
    return (
      <div className="relative w-full mt-4">
        <div className="relative">
          <select
            className={inputClassName}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            value={value}
            disabled={!enable}
          >
            {children}
          </select>
          <div
            className={`absolute top-0 left-0 h-full w-12 flex items-center justify-center text-gray-400 transition-all duration-300 focus:border-blue-500`}
            onClick={onClick}
          >
            <Icon size={20} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full mt-4">
      <div className="relative">
        <input
          type={finalInputType}
          className={inputClassName}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          value={value}
          onClick={onClick}
          disabled={!enable}
        />
        <div
          className={`absolute top-0 left-0 h-full w-12 flex items-center justify-center text-gray-400 transition-all duration-300 focus:border-blue-500`}
          onClick={onClick}
        >
          <Icon size={20} />
        </div>
        {inputType === "password" && (
          <div
            className={`absolute top-0 right-0 h-full w-12 flex items-center justify-center text-gray-400 transition-all duration-300 focus:border-blue-500`}
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </div>
        )}
      </div>
    </div>
  );
};

export const Input = CommonInput;
export const Select = (props) => <CommonInput {...props} isSelect={true} />;
