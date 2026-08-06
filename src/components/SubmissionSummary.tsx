import { FC } from "react";
import { cookieOptions, FormValues, getOptionLabel, yoghurtOptions } from "../utils/formUtils";

interface SubmissionSummaryProps {
  /** De weer te geven waarden (live-formulier of laatst ingezonden). */
  values: FormValues;
}

/**
 * Gedeeld overzicht van de formulierwaarden (naam/e-mail/lang/koekjes/
 * yoghurt). Gebruikt door het dev-only LiveValues-paneel én de terugblik op
 * het succes-scherm, zodat de rijen maar op één plek leven en niet kunnen
 * afdrijven. Lege waarden tonen een em-dash.
 */
const SubmissionSummary: FC<SubmissionSummaryProps> = ({ values }) => {
  return (
    <dl className="space-y-2.5 text-sm">
      <div className="flex items-center justify-between gap-4">
        <dt className="text-white/60">Naam</dt>
        <dd className="truncate font-medium text-white/90">{values.name || "—"}</dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-white/60">E-mail</dt>
        <dd className="truncate font-medium text-white/90">{values.email || "—"}</dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-white/60">Lang</dt>
        <dd className="font-medium text-white/90">{values.isTall ? "Ja" : "Nee"}</dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-white/60">Koekjes</dt>
        <dd className="flex flex-wrap justify-end gap-1.5">
          {values.cookies.length > 0 ? (
            values.cookies.map((cookie) => (
              <span
                key={cookie}
                className="rounded-full bg-primary-500/15 px-2.5 py-0.5 text-xs text-primary-200"
              >
                {getOptionLabel(cookieOptions, cookie)}
              </span>
            ))
          ) : (
            <span className="font-medium text-white/90">—</span>
          )}
        </dd>
      </div>
      <div className="flex items-center justify-between gap-4">
        <dt className="text-white/60">Yoghurt</dt>
        <dd className="font-medium text-white/90">
          {values.yoghurt ? getOptionLabel(yoghurtOptions, values.yoghurt) : "—"}
        </dd>
      </div>
    </dl>
  );
};

export default SubmissionSummary;
