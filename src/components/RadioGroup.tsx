import { useField } from "formik";
import { FC } from "react";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
}

interface OptionProps {
  name: string;
  option: RadioOption;
}

const RadioOption: FC<OptionProps> = ({ name, option }) => {
  const [field] = useField({ name, type: "radio", value: option.value });
  const checked = Boolean(field.checked);

  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 transition-all duration-200 active:scale-[0.98] ${
        checked
          ? "border-primary-400/60 bg-primary-500/10 shadow-[0_0_24px_rgba(139,92,246,0.2)]"
          : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
      }`}
    >
      <input type="radio" {...field} value={option.value} className="peer sr-only" />
      <span
        aria-hidden="true"
        className={`flex size-5 shrink-0 items-center justify-center rounded-full border transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-white/60 ${
          checked
            ? "border-transparent bg-linear-to-br from-accent-500 to-primary-600"
            : "border-white/25 bg-white/5"
        }`}
      >
        <span
          className={`size-2 rounded-full bg-white transition-all duration-200 ${
            checked ? "scale-100 opacity-100" : "scale-0 opacity-0"
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

const RadioGroup: FC<RadioGroupProps> = ({ name, label, options }) => {
  return (
    <fieldset>
      <legend className="mb-3 flex items-center gap-2 text-sm font-semibold text-white/90">
        <span className="size-1.5 rounded-full bg-primary-400" aria-hidden="true" />
        {label}
      </legend>
      <div className="space-y-2.5">
        {options.map((option) => (
          <RadioOption key={option.value} name={name} option={option} />
        ))}
      </div>
    </fieldset>
  );
};

export default RadioGroup;
