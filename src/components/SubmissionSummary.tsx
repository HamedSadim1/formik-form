import { FC, ReactNode } from "react";
import { EMPTY_VALUE, FIELD_NAMES, FormValues, LABELS } from "../utils/constants";
import { getOptionLabel } from "../utils/helpers";
import { cookieOptions, yoghurtOptions } from "../utils/formUtils";

interface SummaryRowProps {
  label: string;
  /** Overschrijf de dd-styling (bijv. bij chips of truncation). */
  ddClassName?: string;
  children: ReactNode;
}

/** Eén label/waarde-rij binnen het overzicht. */
const SummaryRow: FC<SummaryRowProps> = ({
  label,
  ddClassName = "font-medium text-white/90",
  children,
}) => (
  <div className="flex items-center justify-between gap-4">
    <dt className="text-white/60">{label}</dt>
    <dd className={ddClassName}>{children}</dd>
  </div>
);

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
      <SummaryRow
        label={LABELS.summary[FIELD_NAMES.name]}
        ddClassName="truncate font-medium text-white/90"
      >
        {values.name || EMPTY_VALUE}
      </SummaryRow>
      <SummaryRow
        label={LABELS.summary[FIELD_NAMES.email]}
        ddClassName="truncate font-medium text-white/90"
      >
        {values.email || EMPTY_VALUE}
      </SummaryRow>
      <SummaryRow label={LABELS.summary[FIELD_NAMES.isTall]}>
        {values.isTall ? LABELS.summary.yes : LABELS.summary.no}
      </SummaryRow>
      <SummaryRow
        label={LABELS.summary[FIELD_NAMES.cookies]}
        ddClassName="flex flex-wrap justify-end gap-1.5"
      >
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
          <span className="font-medium text-white/90">{EMPTY_VALUE}</span>
        )}
      </SummaryRow>
      <SummaryRow label={LABELS.summary[FIELD_NAMES.yoghurt]}>
        {values.yoghurt ? getOptionLabel(yoghurtOptions, values.yoghurt) : EMPTY_VALUE}
      </SummaryRow>
    </dl>
  );
};

export default SubmissionSummary;
