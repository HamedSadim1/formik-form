import { useField } from "formik";
import { FC } from "react";
import { FaCheck } from "react-icons/fa";

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  name: string;
  label: string;
  options: CheckboxOption[];
  columns?: 1 | 2 | 3;
}

const columnClasses: Record<NonNullable<CheckboxGroupProps["columns"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
};

interface OptionProps {
  name: string;
  option: CheckboxOption;
}

const CheckboxOption: FC<OptionProps> = ({ name, option }) => {
  const [field] = useField({ name, type: "checkbox", value: option.value });
  const checked = Boolean(field.checked);

  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 transition-all duration-200 active:scale-[0.98] ${
        checked
          ? "border-primary-400/60 bg-primary-500/10 shadow-[0_0_24px_rgba(139,92,246,0.2)]"
          : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
      }`}
    >
      <input type="checkbox" {...field} value={option.value} className="peer sr-only" />
      <span
        aria-hidden="true"
        className={`flex size-5 shrink-0 items-center justify-center rounded-md border transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-white/60 ${
          checked
            ? "border-transparent bg-linear-to-br from-accent-500 to-primary-600"
            : "border-white/25 bg-white/5"
        }`}
      >
        <FaCheck
          className={`size-3 text-white transition-all duration-200 ${
            checked ? "scale-100 opacity-100" : "scale-50 opacity-0"
          }`}
        />
      </span>
      <span
        className={`text-sm transition-colors duration-200 ${
          checked ? "font-medium text-white" : "text-white/80"
        }`}
      >
        {option.label}
      </span>
    </label>
  );
};

const CheckboxGroup: FC<CheckboxGroupProps> = ({ name, label, options, columns = 2 }) => {
  return (
    <fieldset>
      <legend className="mb-3 flex items-center gap-2 text-sm font-semibold text-white/90">
        <span className="size-1.5 rounded-full bg-primary-400" aria-hidden="true" />
        {label}
      </legend>
      <div className={`grid ${columnClasses[columns]} gap-2.5`}>
        {options.map((option) => (
          <CheckboxOption key={option.value} name={name} option={option} />
        ))}
      </div>
    </fieldset>
  );
};

export default CheckboxGroup;
