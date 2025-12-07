import React from "react";
import { FaCheck } from "react-icons/fa";

interface SuccessMessageProps {
  onReset: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onReset }) => {
  return (
    <div className="text-center py-12">
      <FaCheck className="text-green-400 text-6xl mx-auto mb-4 animate-bounce" />
      <h2 className="text-2xl font-semibold text-white mb-2">
        Bedankt voor je inzending!
      </h2>
      <p className="text-white/80">We nemen spoedig contact met je op.</p>
      <button
        onClick={onReset}
        className="mt-6 px-6 py-3 bg-white/30 backdrop-blur-sm border border-white/40 rounded-lg text-white font-semibold hover:bg-white/40 transition duration-200"
      >
        Opnieuw invullen
      </button>
    </div>
  );
};

export default SuccessMessage;
