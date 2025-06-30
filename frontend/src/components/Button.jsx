import React from "react";

const Button = React.memo(({ type, disabled, onClick, children }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      className="bg-blue-800 text-white font-medium cursor-pointer hover:bg-blue-700 transition-all text-xl px-4 py-2 rounded-2xl "
      onClick={onClick}
    >
      {children}
    </button>
  );
});

export default Button;
