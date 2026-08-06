import { FC, ReactNode } from "react";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import { primaryButton } from "../utils/buttonClasses";

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
      className={primaryButton}
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
