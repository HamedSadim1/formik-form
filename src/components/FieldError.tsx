import { FC } from "react";
import { FaExclamationCircle } from "react-icons/fa";

interface FieldErrorProps {
  id?: string;
  /** De foutmelding; rendert niets zolang deze leeg/afwezig is. */
  message?: string;
  /** Extra klassen (bijv. verticale marge). */
  className?: string;
}

/**
 * Gedeelde foutmelding voor velden én groepen, zodat de alert-markup en het
 * waarschuwingspictogram maar op één plek leven.
 */
const FieldError: FC<FieldErrorProps> = ({ id, message, className = "mt-1.5" }) =>
  message ? (
    <p
      id={id}
      role="alert"
      className={`flex animate-fade-in items-center gap-1.5 text-xs text-danger-300 ${className}`}
    >
      <FaExclamationCircle className="shrink-0" aria-hidden="true" />
      {message}
    </p>
  ) : null;

export default FieldError;
