import { FC } from "react";
import { LABELS } from "../utils/constants";

interface RequiredAsteriskProps {
  /** Extra klassen (bijv. marge vóór de ster). */
  className?: string;
  /** Toont een sr-only "(verplicht)"-aankondiging naast de ster. */
  srLabel?: boolean;
}

/**
 * Gedeelde verplicht-indicator (ster), gebruikt door veld-labels én
 * groeps-legends, zodat de styling en de aankondiging op één plek leven.
 */
const RequiredAsterisk: FC<RequiredAsteriskProps> = ({ className, srLabel = false }) => (
  <>
    <span className={`text-accent-400${className ? ` ${className}` : ""}`} aria-hidden="true">
      *
    </span>
    {srLabel && <span className="sr-only">{LABELS.a11y.requiredLabel}</span>}
  </>
);

export default RequiredAsterisk;
