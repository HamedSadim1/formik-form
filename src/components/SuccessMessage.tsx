import { FC, useEffect, useRef } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { FormValues, LABELS } from "../utils/constants";
import { fadeDelay } from "../utils/helpers";
import {
  glassPanelBlur,
  primaryButton,
  secondaryButtonStrong,
  sectionLabel,
} from "../utils/uiClasses";
import SubmissionSummary from "./SubmissionSummary";

interface SuccessMessageProps {
  /** De laatst succesvol ingezonden waarden, getoond als terugblik. */
  lastSubmission: FormValues;
  /** "Terug naar mijn formulier": herstelt de inzending in het formulier. */
  onBackToForm: () => void;
  /** "Opnieuw invullen": start met een leeg formulier. */
  onReset: () => void;
}

const SuccessMessage: FC<SuccessMessageProps> = ({ lastSubmission, onBackToForm, onReset }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div className="animate-fade-in-up py-10 text-center sm:py-12">
      {/* Live region beperkt tot de aankondiging; de knoppen en het overzicht
          vallen erbuiten zodat screenreaders ze als normale interactieve
          elementen blijven exposeren. */}
      <div role="status">
        <div className="relative mx-auto mb-6 size-20">
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full bg-success-400/25"
          />
          <div className="relative flex size-20 animate-pop-in items-center justify-center rounded-full border-2 border-success-400/60 bg-success-400/20 shadow-[0_0_40px_rgba(52,211,153,0.35)]">
            <FaCheck className="text-4xl text-success-400" aria-hidden="true" />
          </div>
        </div>
        <h2
          ref={headingRef}
          tabIndex={-1}
          style={fadeDelay(0)}
          className="mb-2 animate-fade-in-up text-2xl font-semibold text-white outline-none"
        >
          {LABELS.success.heading}
        </h2>
        <p style={fadeDelay(2)} className="animate-fade-in-up text-white/80">
          {LABELS.success.body}
        </p>
      </div>

      <div
        style={fadeDelay(3)}
        className={`mx-auto mt-6 max-w-sm animate-fade-in-up ${glassPanelBlur} p-4 text-left`}
      >
        <p className={`mb-3 ${sectionLabel}`}>{LABELS.success.summarySection}</p>
        <SubmissionSummary values={lastSubmission} />
      </div>

      <div style={fadeDelay(4)} className="mt-8 flex animate-fade-in-up flex-col gap-3">
        <button type="button" onClick={onBackToForm} className={primaryButton}>
          <FaArrowLeft
            aria-hidden="true"
            className="text-xs transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          {LABELS.buttons.backToForm}
        </button>
        <button type="button" onClick={onReset} className={secondaryButtonStrong}>
          {LABELS.buttons.reset}
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
