import * as Yup from "yup";

export interface FormValues {
  name: string;
  email: string;
  isTall: boolean;
  cookies: string[];
  yoghurt: string;
}

/**
 * Id-conventies voor formuliervelden en -groepen, als één bron van waarheid.
 * FormField, FieldGroup en ScrollToFirstError bouwen hierop voort, zodat een
 * wijziging van het patroon nergens anders stilletjes kan breken.
 */
export const fieldId = (name: string) => `field-${name}`;
export const fieldErrorId = (name: string) => `${fieldId(name)}-error`;
export const fieldGroupId = (name: string) => `field-group-${name}`;
export const fieldGroupErrorId = (name: string) => `${fieldGroupId(name)}-error`;

/** Id van de h1, gelinkt aan de <main>-landmark via aria-labelledby. */
export const PAGE_TITLE_ID = "page-title";

/** Enige bron van waarheid voor de naamlengte: gebruikt door Yup én de input. */
export const NAME_MAX_LENGTH = 10;

export const validationSchema = Yup.object({
  name: Yup.string()
    .required("Naam is verplicht")
    .max(NAME_MAX_LENGTH, `Maximaal ${NAME_MAX_LENGTH} karakters`),
  email: Yup.string().email("Ongeldig e-mailadres").required("E-mail is verplicht"),
  cookies: Yup.array().of(Yup.string()).min(1, "Selecteer minstens één koekje"),
  yoghurt: Yup.string().required("Kies een yoghurtsoort"),
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
