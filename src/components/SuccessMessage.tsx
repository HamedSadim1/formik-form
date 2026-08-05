import { FC, useEffect, useRef } from "react";
import { FaCheck } from "react-icons/fa";

interface SuccessMessageProps {
  onReset: () => void;
}

const SuccessMessage: FC<SuccessMessageProps> = ({ onReset }) => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <div role="status" className="animate-fade-in-up py-10 text-center sm:py-12">
      <div className="relative mx-auto mb-6 size-20">
        <span
          aria-hidden="true"
          className="absolute inset-0 animate-ping rounded-full bg-green-400/25"
        />
        <div className="relative flex size-20 animate-pop-in items-center justify-center rounded-full border-2 border-green-400/60 bg-green-400/20 shadow-[0_0_40px_rgba(74,222,128,0.35)]">
          <FaCheck className="text-4xl text-green-400" aria-hidden="true" />
        </div>
      </div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="mb-2 animate-fade-in-up text-2xl font-semibold text-white outline-none [animation-delay:150ms]"
      >
        Bedankt voor je inzending!
      </h2>
      <p className="animate-fade-in-up text-white/80 [animation-delay:250ms]">
        We nemen spoedig contact met je op.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-8 animate-fade-in-up rounded-lg border border-white/40 bg-white/30 px-6 py-3 font-semibold text-white backdrop-blur-sm transition duration-200 [animation-delay:350ms] hover:bg-white/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
      >
        Opnieuw invullen
      </button>
    </div>
  );
};

export default SuccessMessage;
