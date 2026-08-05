import { FC, ReactNode } from "react";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";

interface SubmitButtonProps {
  isSubmitting: boolean;
  children: ReactNode;
}

const SubmitButton: FC<SubmitButtonProps> = ({ isSubmitting, children }) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      aria-busy={isSubmitting || undefined}
      className="group flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-linear-to-r from-accent-500 via-primary-500 to-primary-600 px-4 py-3.5 font-semibold text-white shadow-lg shadow-primary-950/50 transition duration-200 hover:from-accent-600 hover:via-primary-600 hover:to-primary-700 hover:shadow-xl hover:shadow-primary-800/50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-400/30 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {isSubmitting ? (
        <>
          <FaSpinner className="animate-spin" aria-hidden="true" />
          <span>Verzenden...</span>
        </>
      ) : (
        <>
          <span>{children}</span>
          <FaPaperPlane
            aria-hidden="true"
            className="text-xs transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </>
      )}
    </button>
  );
};

export default SubmitButton;
