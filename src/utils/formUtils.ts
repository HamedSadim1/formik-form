import * as Yup from "yup";
import { FIELD_NAMES, LABELS, NAME_MAX_LENGTH } from "./constants";

/** Formulierdomein: validatieschema, optie-data en het Option-type. */

export const validationSchema = Yup.object({
  [FIELD_NAMES.name]: Yup.string()
    .required(LABELS.validation.nameRequired)
    .max(NAME_MAX_LENGTH, LABELS.validation.nameMaxLength),
  [FIELD_NAMES.email]: Yup.string()
    .email(LABELS.validation.emailInvalid)
    .required(LABELS.validation.emailRequired),
  [FIELD_NAMES.cookies]: Yup.array().of(Yup.string()).min(1, LABELS.validation.cookiesMin),
  [FIELD_NAMES.yoghurt]: Yup.string().required(LABELS.validation.yoghurtRequired),
});

/** Een keuze-optie binnen een checkbox- of radiogroep. */
export interface Option {
  value: string;
  label: string;
}

export const cookieOptions: Option[] = [
  { value: "chocolate chip", label: "Chocolate Chip" },
  { value: "sugar", label: "Sugar" },
  { value: "lays", label: "Lays" },
  { value: "coca", label: "Coca" },
];

export const yoghurtOptions: Option[] = [
  { value: "peach", label: "Perzik" },
  { value: "blueberry", label: "Blauwe bes" },
  { value: "apple", label: "Appel" },
];
