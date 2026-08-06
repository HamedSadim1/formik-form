import { useField, useFormikContext } from "formik";
import { FC, useEffect } from "react";
import FieldGroup from "./FieldGroup";
import OptionChip from "./OptionChip";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
  required?: boolean;
}

const RadioGroup: FC<RadioGroupProps> = ({ name, label, options, required = true }) => {
  const [field, meta] = useField<string>(name);
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
        className={`space-y-2.5 rounded-xl ring-1 transition-all duration-200 ${
          showError ? "ring-danger-400/60" : "ring-transparent"
        }`}
      >
        {options.map((option) => (
          <OptionChip
            key={option.value}
            name={name}
            type="radio"
            value={option.value}
            label={option.label}
          />
        ))}
      </div>
    </FieldGroup>
  );
};

export default RadioGroup;
