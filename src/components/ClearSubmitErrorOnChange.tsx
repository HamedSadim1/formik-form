import { useFormikContext } from "formik";
import { FC, useEffect, useRef } from "react";
import { FormValues } from "@/utils/constants";

interface ClearSubmitErrorOnChangeProps {
  /** Wordt aangeroepen zodra de formulierwaarden wijzigen. */
  onClear: () => void;
}

/**
 * Cleart de gesimuleerde netwerkfout zodra de gebruiker het formulier aanpast.
 * Zo blijft de banner niet staan als veldvalidatie de eigenlijke oorzaak is
 * geworden (bijv. een retry-knop die faalt omdat een veld ongeldig is).
 * Rendert zelf niets.
 */
const ClearSubmitErrorOnChange: FC<ClearSubmitErrorOnChangeProps> = ({ onClear }) => {
  const { values } = useFormikContext<FormValues>();
  const previousValues = useRef(values);

  useEffect(() => {
    if (previousValues.current !== values) {
      previousValues.current = values;
      onClear();
    }
  }, [values, onClear]);

  return null;
};

export default ClearSubmitErrorOnChange;
