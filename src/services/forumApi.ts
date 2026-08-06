import {
  DEFAULT_FAILURE_RATE,
  FAIL_PARAM,
  FAIL_PARAM_ALWAYS,
  FAIL_PARAM_NEVER,
  FormValues,
  SIMULATED_LATENCY_MS,
} from "../utils/constants";

// Gesimuleerde netwerkfout: standaard 0% — het normale pad verloopt dus
// altijd vlekkeloos. Het error-pad (foutmelding + retry) is uitsluitend
// triggerbaar via de URL: ?fail=always | ?fail=never | ?fail=0.5
const getFailureRate = (): number => {
  const param = new URLSearchParams(window.location.search).get(FAIL_PARAM);
  if (!param) return DEFAULT_FAILURE_RATE;
  if (param === FAIL_PARAM_ALWAYS) return 1;
  if (param === FAIL_PARAM_NEVER) return 0;
  const parsed = Number(param);
  return Number.isFinite(parsed) && parsed >= 0 && parsed <= 1 ? parsed : DEFAULT_FAILURE_RATE;
};

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

/**
 * Verstuurt het formulier. Dit is de enige plek die later vervangen wordt door
 * een echte API-call (fetch); de interface — een Promise die bij falen gooit —
 * blijft daardoor ongewijzigd voor de rest van de app.
 */
export const submitForm = async (values: FormValues): Promise<void> => {
  await wait(SIMULATED_LATENCY_MS);
  if (Math.random() < getFailureRate()) {
    throw new Error("Gesimuleerde netwerkfout");
  }
  // De mock verstuurt nog niets; zodra er een backend is, wordt `values` hier
  // gepost (de parameter maakt de toekomstige API-contract al expliciet).
  void values;
};
