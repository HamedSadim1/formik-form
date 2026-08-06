import { useField } from "formik";
import { FC } from "react";
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
  const [, meta] = useField<string>(name);
  const showError = Boolean(meta.touched && meta.error);

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
            required={required}
          />
        ))}
      </div>
    </FieldGroup>
  );
};

export default RadioGroup;
