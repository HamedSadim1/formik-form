import { FC, ReactNode } from "react";
import { FaExclamationCircle } from "react-icons/fa";

interface FieldGroupProps {
  name: string;
  label: string;
  required?: boolean;
  showError?: boolean;
  error?: string;
  children: ReactNode;
}

/**
 * Gedeelde wrapper voor formuliergroepen (fieldset + legende + foutmelding),
 * gebruikt door CheckboxGroup en RadioGroup.
 */
const FieldGroup: FC<FieldGroupProps> = ({
  name,
  label,
  required = true,
  showError = false,
  error,
  children,
}) => {
  const errorId = `${name}-group-error`;

  // Bewuste afweging: aria-required op het fieldset is officieel geen
  // ondersteund attribuut voor de group-rol (WAI-ARIA 1.2) en validatietools
  // zoals axe vlaggen het als aria-allowed-attr. Toch is het bewust toegevoegd
  // als progressive enhancement: sommige screenreaders kondigen de
  // groepsverplichting er wél mee aan. De betrouwbare aankondiging is de
  // expliciete "(verplicht)"-tekst in de legend, die door alle screenreaders
  // wordt voorgelezen; aria-required is daarbovenop alleen een bonus.
  return (
    <fieldset
      id={`field-group-${name}`}
      aria-required={required || undefined}
      aria-describedby={showError ? errorId : undefined}
    >
      <legend className="mb-2.5 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/60">
        <span className="size-1.5 rounded-full bg-primary-400" aria-hidden="true" />
        {label}
        {required && (
          <>
            <span className="text-accent-400" aria-hidden="true">
              *
            </span>
            <span className="sr-only">(verplicht)</span>
          </>
        )}
      </legend>
      {children}
      {showError && (
        <p
          id={errorId}
          role="alert"
          className="mt-2 flex animate-fade-in items-center gap-1.5 text-xs text-danger-300"
        >
          <FaExclamationCircle className="shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </fieldset>
  );
};

export default FieldGroup;
