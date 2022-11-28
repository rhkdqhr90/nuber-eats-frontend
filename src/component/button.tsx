import React from "react";
interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => (
  <button
    className={` mt-3 mb-3 py-3 px-5 text-lg text-white font-mediumtransition-colors focus:outline-none ${
      canClick
        ? " bg-lime-600 hover:bg-lime-700 "
        : "bg-gray-300 pointer-events-none"
    } "bg-gray-400" : ""}`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
