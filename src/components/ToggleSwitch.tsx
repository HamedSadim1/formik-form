import { useField } from "formik";
import { FC } from "react";
import { cn } from "@/utils/helpers";
import { glassPanelHover } from "@/utils/uiClasses";

interface ToggleSwitchProps {
  /** Formik-veldnaam van het (boolean) checkbox-veld. */
  name: string;
  /** Hoofdtekst op de rij (bijv. "Ben je lang?"). */
  label: string;
  /** Toelichting onder de hoofdtekst. */
  description: string;
}

/**
 * Aan/uit-schakelaar op een glazen rij: een sr-only checkbox met gestylde
 * track en knop. Gekoppeld aan Formik via de Field-component; de id is gelijk
 * aan de veldnaam (conventie van de oorspronkelijke toggle).
 */
const ToggleSwitch: FC<ToggleSwitchProps> = ({ name, label, description }) => {
  // Zelfde useField-koppeling als FormField, OptionGroup en OptionChip; de id
  // is gelijk aan de veldnaam (conventie van de oorspronkelijke toggle).
  const [field] = useField({ name, type: "checkbox" });

  return (
    <label
      className={cn(
        "flex cursor-pointer items-center justify-between gap-3",
        glassPanelHover,
        "px-4 py-3.5 active:scale-[0.98]",
      )}
    >
      <span>
        <span className="block text-sm font-medium text-white">{label}</span>
        <span className="block text-xs text-white/60">{description}</span>
      </span>
      <span className="relative inline-flex items-center">
        <input id={name} type="checkbox" {...field} className="peer sr-only" />
        <span
          aria-hidden="true"
          className="h-6 w-11 rounded-full border border-white/20 bg-white/10 shadow-inner transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-white/60 peer-checked:border-transparent peer-checked:primary-gradient-compact"
        />
        <span
          aria-hidden="true"
          className="absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow-md transition-transform duration-200 peer-checked:translate-x-5"
        />
      </span>
    </label>
  );
};

export default ToggleSwitch;
