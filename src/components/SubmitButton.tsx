import React from "react";
import { FaSpinner } from "react-icons/fa";

interface SubmitButtonProps {
  isSubmitting: boolean;
  children: React.ReactNode;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  isSubmitting,
  children,
}) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className="w-full py-3 bg-linear-to-r from-blue-500/80 to-purple-600/80 backdrop-blur-sm border border-white/40 rounded-lg text-white font-semibold hover:from-blue-600/80 hover:to-purple-700/80 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
    >
      {isSubmitting ? (
        <>
          <FaSpinner className="animate-spin" />
          <span>Verzenden...</span>
        </>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
};

export default SubmitButton;
