import { FC, useEffect, useRef } from "react";
import { FaArrowLeft, FaCheck } from "react-icons/fa";
import { cookieOptions, FormValues, getOptionLabel, yoghurtOptions } from "../utils/formUtils";

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
          className="mb-2 animate-fade-in-up text-2xl font-semibold text-white outline-none [animation-delay:150ms]"
        >
          Bedankt voor je inzending!
        </h2>
        <p className="animate-fade-in-up text-white/80 [animation-delay:250ms]">
          We nemen spoedig contact met je op.
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-sm animate-fade-in-up rounded-xl border border-white/10 bg-white/5 p-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm [animation-delay:300ms]">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/60">
          Jouw inzending
        </p>
        <dl className="space-y-2.5 text-sm">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-white/60">Naam</dt>
            <dd className="truncate font-medium text-white/90">{lastSubmission.name}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-white/60">E-mail</dt>
            <dd className="truncate font-medium text-white/90">{lastSubmission.email}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-white/60">Lang</dt>
            <dd className="font-medium text-white/90">{lastSubmission.isTall ? "Ja" : "Nee"}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-white/60">Koekjes</dt>
            <dd className="flex flex-wrap justify-end gap-1.5">
              {lastSubmission.cookies.map((cookie) => (
                <span
                  key={cookie}
                  className="rounded-full bg-primary-500/15 px-2.5 py-0.5 text-xs text-primary-200"
                >
                  {getOptionLabel(cookieOptions, cookie)}
                </span>
              ))}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-white/60">Yoghurt</dt>
            <dd className="font-medium text-white/90">
              {lastSubmission.yoghurt
                ? getOptionLabel(yoghurtOptions, lastSubmission.yoghurt)
                : "—"}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex animate-fade-in-up flex-col gap-3 [animation-delay:350ms]">
        <button
          type="button"
          onClick={onBackToForm}
          className="group flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-linear-to-r from-accent-500 via-primary-500 to-primary-600 px-6 py-3 font-semibold text-white shadow-lg shadow-primary-950/50 transition duration-200 hover:from-accent-600 hover:via-primary-600 hover:to-primary-700 hover:shadow-xl hover:shadow-primary-800/50 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-400/30"
        >
          <FaArrowLeft
            aria-hidden="true"
            className="text-xs transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          Terug naar mijn formulier
        </button>
        <button
          type="button"
          onClick={onReset}
          className="w-full rounded-xl border border-white/40 bg-white/30 px-6 py-3 font-semibold text-white backdrop-blur-sm transition duration-200 hover:bg-white/40 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          Opnieuw invullen
        </button>
      </div>
    </div>
  );
};

export default SuccessMessage;
