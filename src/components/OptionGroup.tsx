import { useField, useFormikContext } from "formik";
import { FC, useEffect } from "react";
import { Option } from "../utils/formUtils";
import FieldGroup from "./FieldGroup";
import OptionChip from "./OptionChip";

interface OptionGroupProps {
  name: string;
  label: string;
  /** Bepaalt input-type en layout (grid bij checkbox, stack bij radio). */
  type: "checkbox" | "radio";
  options: Option[];
  /** Alleen voor checkbox: aantal kolommen (vanaf het sm-breakpoint). */
  columns?: 1 | 2 | 3;
  required?: boolean;
}

// Op mobiel altijd één kolom, zodat labels niet in smalle chips klemmen;
// vanaf het sm-breakpoint wordt het opgegeven aantal kolommen gebruikt.
const columnClasses: Record<NonNullable<OptionGroupProps["columns"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
};

/**
 * Gedeelde optie-groep voor checkbox- én radioselecties: verzorgt de
 * Formik-koppeling, de fout-ring, de hervalidatie na wijziging en de
 * OptionChip-lijst. Checkbox en radio verschillen alleen in input-type,
 * waarde-type en layout.
 */
const OptionGroup: FC<OptionGroupProps> = ({
  name,
  label,
  type,
  options,
  columns = 2,
  required = true,
}) => {
  const [field, meta] = useField<string[] | string>(name);
  const { validateField } = useFormikContext();
  const showError = Boolean(meta.touched && meta.error);

  useEffect(() => {
    // validateOnChange={false} laat een foutmelding anders staan tot de
    // volgende submit; zodra de selectie wijzigt ná een fout, direct
    // hervalideren zodat de (inmiddels geldige) selectie de fout opruimt.
    if (meta.touched && meta.error) void validateField(name);
  }, [field.value, name, meta.touched, meta.error, validateField]);

  return (
    <FieldGroup
      name={name}
      label={label}
      required={required}
      showError={showError}
      error={meta.error}
    >
      <div
        className={`${
          type === "checkbox" ? `grid ${columnClasses[columns]} gap-2.5` : "space-y-2.5"
        } rounded-xl ring-1 transition-all duration-200 ${
          showError ? "ring-danger-400/60" : "ring-transparent"
        }`}
      >
        {options.map((option) => (
          <OptionChip
            key={option.value}
            name={name}
            type={type}
            value={option.value}
            label={option.label}
          />
        ))}
      </div>
    </FieldGroup>
  );
};

export default OptionGroup;
