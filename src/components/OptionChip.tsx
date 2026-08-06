import { useField } from "formik";
import { FC } from "react";
import { FaCheck } from "react-icons/fa";

interface OptionChipProps {
  name: string;
  value: string;
  type: "checkbox" | "radio";
  label: string;
  /** Wordt aan de input doorgegeven als aria-required voor screenreaders. */
  required?: boolean;
}

/**
 * Herbruikbare optie-chip voor checkbox- en radiogroepen.
 * Verzorgt de Formik-koppeling, de selectie-indicator (per type) en de
 * checked/unchecked styling.
 */
const OptionChip: FC<OptionChipProps> = ({ name, value, type, label, required = false }) => {
  const [field] = useField({ name, type, value });
  const checked = Boolean(field.checked);

  const indicatorBase = `flex size-5 shrink-0 items-center justify-center border transition-all duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-white/60 ${
    checked
      ? "border-transparent bg-linear-to-br from-accent-500 to-primary-600"
      : "border-white/25 bg-white/5"
  }`;

  return (
    <label
      className={`flex cursor-pointer items-center gap-3 rounded-xl border px-3.5 py-3 transition-all duration-200 active:scale-[0.98] ${
        checked
          ? "border-primary-400/60 bg-primary-500/10 shadow-[0_0_24px_rgba(139,92,246,0.2)]"
          : "border-white/10 bg-white/5 hover:border-white/25 hover:bg-white/10"
      }`}
    >
      <input
        type={type}
        {...field}
        value={value}
        aria-required={required || undefined}
        className="peer sr-only"
      />
      {type === "checkbox" ? (
        <span aria-hidden="true" className={`${indicatorBase} rounded-md`}>
          <FaCheck
            className={`size-3 text-white transition-all duration-200 ${
              checked ? "scale-100 opacity-100" : "scale-50 opacity-0"
            }`}
          />
        </span>
      ) : (
        <span aria-hidden="true" className={`${indicatorBase} rounded-full`}>
          <span
            className={`size-2 rounded-full bg-white transition-all duration-200 ${
              checked ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          />
        </span>
      )}
      <span
        className={`text-sm transition-colors duration-200 ${
          checked ? "font-medium text-white" : "text-white/80"
        }`}
      >
        {label}
      </span>
    </label>
  );
};

export default OptionChip;
