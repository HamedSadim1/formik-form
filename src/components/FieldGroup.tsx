import { FC, ReactNode } from "react";
import { cn, fieldGroupErrorId, fieldGroupId } from "@/utils/helpers";
import { sectionLabel } from "@/utils/uiClasses";
import FieldError from "@/components/FieldError";
import RequiredAsterisk from "@/components/RequiredAsterisk";

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
 * gebruikt door OptionGroup (checkbox- en radioselecties).
 */
const FieldGroup: FC<FieldGroupProps> = ({
  name,
  label,
  required = true,
  showError = false,
  error,
  children,
}) => {
  const errorId = fieldGroupErrorId(name);

  // Bewuste afweging: aria-required op het fieldset is officieel geen
  // ondersteund attribuut voor de group-rol (WAI-ARIA 1.2) en validatietools
  // zoals axe vlaggen het als aria-allowed-attr. Toch is het bewust toegevoegd
  // als progressive enhancement: sommige screenreaders kondigen de
  // groepsverplichting er wél mee aan. De betrouwbare aankondiging is de
  // expliciete "(verplicht)"-tekst in de legend, die door alle screenreaders
  // wordt voorgelezen; aria-required is daarbovenop alleen een bonus.
  return (
    <fieldset
      id={fieldGroupId(name)}
      aria-required={required || undefined}
      aria-describedby={showError ? errorId : undefined}
    >
      <legend className={cn("mb-2.5 flex items-center gap-2", sectionLabel)}>
        <span className="size-1.5 rounded-full bg-primary-400" aria-hidden="true" />
        {label}
        {required && <RequiredAsterisk srLabel />}
      </legend>
      {children}
      <FieldError id={errorId} message={showError ? error : undefined} className="mt-2" />
    </fieldset>
  );
};

export default FieldGroup;
