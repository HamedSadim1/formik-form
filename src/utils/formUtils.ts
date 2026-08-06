import * as Yup from "yup";
import { FIELD_NAMES, LABELS, NAME_MAX_LENGTH } from "./constants";

/**
 * Id-conventies voor formuliervelden en -groepen, als één bron van waarheid.
 * FormField, FieldGroup en ScrollToFirstError bouwen hierop voort, zodat een
 * wijziging van het patroon nergens anders stilletjes kan breken.
 */
export const fieldId = (name: string) => `field-${name}`;
export const fieldErrorId = (name: string) => `${fieldId(name)}-error`;
export const fieldGroupId = (name: string) => `field-group-${name}`;
export const fieldGroupErrorId = (name: string) => `${fieldGroupId(name)}-error`;

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

/** Vertaalt een opgeslagen waarde terug naar het leesbare label; valt terug op de waarde zelf. */
export const getOptionLabel = (options: readonly Option[], value: string): string =>
  options.find((option) => option.value === value)?.label ?? value;
