import { useField } from "formik";
import { FC, RefObject } from "react";
import { FaExclamationCircle } from "react-icons/fa";
import { IconType } from "react-icons";
import { FormValues } from "../utils/formUtils";

interface FormFieldProps {
  /** Alleen tekstvelden, geen booleans — anders zou field.value.length crashen. */
  name: keyof Pick<FormValues, "name" | "email">;
  label: string;
  type?: string;
  placeholder?: string;
  icon: IconType;
  autoComplete?: string;
  required?: boolean;
  maxLength?: number;
  inputRef?: RefObject<HTMLInputElement | null>;
}

const FormField: FC<FormFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  autoComplete,
  required = false,
  maxLength,
  inputRef,
}) => {
  const [field, meta] = useField<string>(name);
  const hasError = Boolean(meta.touched && meta.error);
  // Successtyling pas tonen wanneer het veld is aangeraakt én gevalideerd is:
  // door de blur-validatie verschijnt de groene glow pas na een geslaagde
  // validatie, nooit op nog niet gevalideerde (of ongeldige) input.
  const hasSuccess = Boolean(meta.touched && !meta.error && field.value);
  const inputId = `field-${name}`;
  const errorId = `${inputId}-error`;
  const valueLength = field.value.length;
  // Rood alleen bij daadwerkelijk overschrijden; het input-element klemt typen
  // af op maxLength, dus overschrijding kan alleen nog via browser-autofill of
  // programmatisch (setFieldValue) optreden. Amber bij het benaderen én op
  // exact de limiet (10/10 is een geldige waarde).
  const isOverLimit = maxLength ? valueLength > maxLength : false;
  const isNearOrAtLimit = maxLength ? valueLength >= Math.round(maxLength * 0.8) : false;

  return (
    <div>
      <label
        htmlFor={inputId}
        className="mb-2.5 flex items-center justify-between gap-2 text-xs font-semibold uppercase tracking-wider text-white/60"
      >
        <span>
          {label}
          {required && (
            <span className="ml-1 text-accent-400" aria-hidden="true">
              *
            </span>
          )}
        </span>
        {maxLength && (
          <span
            className={`text-[10px] font-medium tabular-nums tracking-normal ${
              isOverLimit
                ? "text-danger-400"
                : isNearOrAtLimit
                  ? "text-warning-300"
                  : "text-white/60"
            }`}
            aria-hidden="true"
          >
            {valueLength}/{maxLength}
          </span>
        )}
      </label>
      <div className="relative">
        <input
          id={inputId}
          ref={inputRef}
          type={type}
          {...field}
          maxLength={maxLength}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-required={required || undefined}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : undefined}
          className={`peer w-full rounded-xl border bg-white/5 py-3 pl-11 pr-4 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-sm transition duration-200 placeholder-white/60 hover:border-white/25 focus:outline-none focus:ring-4 ${
            hasError
              ? "border-danger-400/70 focus:border-danger-400 focus:ring-danger-400/15"
              : hasSuccess
                ? "border-success-400/50 focus:border-accent-400 focus:ring-accent-400/15"
                : "border-white/15 focus:border-accent-400 focus:ring-accent-400/15"
          }`}
        />
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-4 bottom-1 h-0.5 origin-center scale-x-0 rounded-full transition-transform duration-300 peer-focus:scale-x-100 ${
            hasError
              ? "bg-danger-400"
              : "bg-linear-to-r from-accent-500 via-primary-500 to-accent-500"
          }`}
        />
        <Icon
          className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm transition-all duration-200 peer-focus:scale-110 ${
            hasError
              ? "text-danger-400/80 peer-focus:text-danger-400"
              : "text-white/60 peer-focus:text-accent-400"
          }`}
        />
      </div>
      {hasError && (
        <p
          id={errorId}
          role="alert"
          className="mt-1.5 flex animate-fade-in items-center gap-1.5 text-xs text-danger-300"
        >
          <FaExclamationCircle className="shrink-0" aria-hidden="true" />
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default FormField;
