import React from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition duration-300 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
};