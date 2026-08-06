import { FormValues, SIMULATED_LATENCY_MS } from "@/utils/constants";
import { getFailureRate, wait } from "@/utils/helpers";

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
