import { FC, RefObject } from "react";
import { FaExclamationTriangle, FaRedo } from "react-icons/fa";
import { LABELS } from "@/utils/constants";
import { dangerButton, secondaryButton } from "@/utils/uiClasses";

interface SubmitErrorBannerProps {
  /** Ref op de banner zelf: ontvangt de focus na een mislukte submit. */
  bannerRef: RefObject<HTMLDivElement | null>;
  /** Submit in uitvoering (disabled de retry-knop). */
  isSubmitting: boolean;
  /** Sluit de banner (Escape of "Sluiten"-knop). */
  onClose: () => void;
}

/**
 * Foutbanner voor een mislukte submit, met "Opnieuw proberen" (submit) en
 * "Sluiten". Moet binnen het <Form> gerenderd worden zodat de retry-knop de
 * normale Formik-submit hergebruikt (validatie + onSubmit).
 */
const SubmitErrorBanner: FC<SubmitErrorBannerProps> = ({ bannerRef, isSubmitting, onClose }) => (
  <div
    ref={bannerRef}
    tabIndex={-1}
    className="animate-fade-in rounded-xl border border-danger-400/50 bg-danger-500/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
  >
    <div className="flex items-start gap-3">
      <FaExclamationTriangle className="mt-0.5 shrink-0 text-danger-400" aria-hidden="true" />
      <p role="alert" className="flex-1 text-sm text-danger-300">
        <span className="font-semibold">{LABELS.errorBanner.title}</span>{" "}
        {LABELS.errorBanner.message}
      </p>
    </div>
    <div className="mt-3 flex flex-wrap justify-end gap-2">
      <button type="submit" disabled={isSubmitting} className={dangerButton}>
        <FaRedo className="text-xs" aria-hidden="true" />
        {LABELS.buttons.retry}
      </button>
      <button type="button" onClick={onClose} className={secondaryButton}>
        {LABELS.buttons.close}
      </button>
    </div>
  </div>
);

export default SubmitErrorBanner;
