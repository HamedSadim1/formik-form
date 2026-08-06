import { useField } from "formik";
import { FC } from "react";
import FieldGroup from "./FieldGroup";
import OptionChip from "./OptionChip";

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  name: string;
  label: string;
  options: CheckboxOption[];
  columns?: 1 | 2 | 3;
  required?: boolean;
}

const columnClasses: Record<NonNullable<CheckboxGroupProps["columns"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
};

const CheckboxGroup: FC<CheckboxGroupProps> = ({
  name,
  label,
  options,
  columns = 2,
  required = true,
}) => {
  const [, meta] = useField<string[]>(name);
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
        className={`grid ${columnClasses[columns]} gap-2.5 rounded-xl ring-1 transition-all duration-200 ${
          showError ? "ring-danger-400/60" : "ring-transparent"
        }`}
      >
        {options.map((option) => (
          <OptionChip
            key={option.value}
            name={name}
            type="checkbox"
            value={option.value}
            label={option.label}
            required={required}
          />
        ))}
      </div>
    </FieldGroup>
  );
};

export default CheckboxGroup;
