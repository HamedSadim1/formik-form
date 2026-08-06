import { FC, ReactNode, RefObject } from "react";
import { FaPaperPlane, FaSpinner } from "react-icons/fa";
import { LABELS } from "@/utils/constants";
import { primaryButton } from "@/utils/uiClasses";

interface SubmitButtonProps {
  isSubmitting: boolean;
  children: ReactNode;
  submitButtonRef?: RefObject<HTMLButtonElement | null>;
}

const SubmitButton: FC<SubmitButtonProps> = ({ isSubmitting, children, submitButtonRef }) => {
  return (
    <button
      ref={submitButtonRef}
      type="submit"
      disabled={isSubmitting}
      aria-busy={isSubmitting || undefined}
      className={primaryButton}
    >
      {isSubmitting ? (
        <>
          <FaSpinner className="animate-spin" aria-hidden="true" />
          <span>{LABELS.buttons.submitBusy}</span>
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
