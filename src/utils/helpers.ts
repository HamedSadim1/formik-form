import type { CSSProperties } from "react";
import {
  DEFAULT_FAILURE_RATE,
  FADE_STAGGER_MS,
  FADE_START_MS,
  FAIL_PARAM,
  FAIL_PARAM_ALWAYS,
  FAIL_PARAM_NEVER,
} from "@/utils/constants";

/**
 * Centrale helpers — herbruikbare functies gegroepeerd per domein, zonder
 * domeinkoppeling (UI-types alleen waar nodig, bijv. CSSProperties).
 * Componenten en services importeren hieruit in plaats van zelf de logica
 * te herhalen.
 */

/* ===== DOM-id's ===== */

/**
 * Id-conventies voor formuliervelden en -groepen, als één bron van waarheid.
 * FormField, FieldGroup en ScrollToFirstError bouwen hierop voort, zodat een
 * wijziging van het patroon nergens anders stilletjes kan breken.
 */
export const fieldId = (name: string): string => `field-${name}`;
export const fieldErrorId = (name: string): string => `${fieldId(name)}-error`;
export const fieldGroupId = (name: string): string => `field-group-${name}`;
export const fieldGroupErrorId = (name: string): string => `${fieldGroupId(name)}-error`;

/* ===== Opmaak ===== */

/**
 * Vertaalt een opgeslagen waarde terug naar het leesbare label van de
 * bijbehorende optie; valt terug op de waarde zelf. De generieke constraint
 * (elke optie met een value én label) houdt deze helper domein-onafhankelijk.
 */
export const getOptionLabel = <T extends { value: string; label: string }>(
  options: readonly T[],
  value: string,
): string => options.find((option) => option.value === value)?.label ?? value;

/* ===== Async ===== */

/** Promise-gebaseerde vertraging (setTimeout-wrapper). */
export const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

/* ===== Animatie ===== */

/**
 * Opbouwende fade-cascade: elke stap start FADE_STAGGER_MS later dan de
 * vorige, na een startvertraging van FADE_START_MS. Inline animationDelay
 * i.p.v. Tailwind-arbitrary-klassen: Tailwinds scanner zou de dynamisch
 * gebouwde `[animation-delay:...ms]`-klasse niet kunnen extraheren.
 */
export const fadeDelay = (step: number): CSSProperties => ({
  animationDelay: `${FADE_START_MS + step * FADE_STAGGER_MS}ms`,
});

/* ===== API-simulatie ===== */

/**
 * Leest de gesimuleerde faalkans uit de URL: ?fail=always | ?fail=never |
 * ?fail=0.5. Standaard 0% — het normale pad verloopt dus altijd vlekkeloos;
 * het error-pad (foutmelding + retry) is uitsluitend triggerbaar via de URL.
 */
export const getFailureRate = (): number => {
  const param = new URLSearchParams(window.location.search).get(FAIL_PARAM);
  if (!param) return DEFAULT_FAILURE_RATE;
  if (param === FAIL_PARAM_ALWAYS) return 1;
  if (param === FAIL_PARAM_NEVER) return 0;
  const parsed = Number(param);
  return Number.isFinite(parsed) && parsed >= 0 && parsed <= 1 ? parsed : DEFAULT_FAILURE_RATE;
};
