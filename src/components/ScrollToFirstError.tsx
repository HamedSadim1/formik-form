import { useFormikContext } from "formik";
import { FC, useEffect, useRef } from "react";
import { FormValues } from "../utils/formUtils";

/** Volgorde waarin velden op fouten worden gecontroleerd (bovenste eerst). */
const FIELD_ORDER: (keyof FormValues)[] = ["name", "email", "cookies", "yoghurt"];

/**
 * Geeft na een mislukte submit de focus aan het eerste ongeldige veld en
 * scrolt het in beeld. Rendert zelf niets.
 *
 * De focus wordt maar één keer per submit-poging verplaatst (submitCount
 * als guard), zodat corrigeren en opnieuw verzenden netjes werkt.
 */
const ScrollToFirstError: FC = () => {
  const { submitCount, errors } = useFormikContext<FormValues>();
  const lastHandledSubmit = useRef(0);

  useEffect(() => {
    if (submitCount === 0) return;

    // Eerst errors controleren: Formik verhoogt submitCount synchroon, maar
    // zet errors pas nadat de (async) Yup-validatie is afgerond. Als we de
    // guard vóór deze lookup zouden zetten, zou de focus bij een lege errors-
    // tussenstand voorgoed worden geblokkeerd.
    const firstErrorKey = FIELD_ORDER.find((key) => errors[key]);
    if (!firstErrorKey) return;
    if (submitCount === lastHandledSubmit.current) return;
    lastHandledSubmit.current = submitCount;

    const el =
      document.getElementById(`field-group-${firstErrorKey}`) ??
      document.getElementById(`field-${firstErrorKey}`);
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "center",
    });

    // focus({ preventScroll }) omdat scrollIntoView het scrollen al verzorgt.
    // Bij tekstvelden (naam/e-mail) is `el` zelf al de input; een querySelector
    // zoekt alleen afstammelingen en zou die dan missen.
    const focusable: HTMLElement | null = el.matches("input, select, textarea")
      ? el
      : el.querySelector<HTMLElement>("input, select, textarea");
    focusable?.focus({ preventScroll: true });
  }, [submitCount, errors]);

  return null;
};

export default ScrollToFirstError;
