import * as Yup from "yup";

export interface FormValues {
  name: string;
  email: string;
  isTall: boolean;
  cookies: string[];
  yoghurt: string;
}

export const validationSchema = Yup.object({
  name: Yup.string().required("Naam is verplicht").max(10, "Maximaal 10 karakters"),
  email: Yup.string().email("Ongeldig e-mailadres").required("E-mail is verplicht"),
  cookies: Yup.array().of(Yup.string()).min(1, "Selecteer minstens één koekje"),
  yoghurt: Yup.string().required("Kies een yoghurtsoort"),
});

export const cookieOptions = [
  { value: "chocolate chip", label: "Chocolate Chip" },
  { value: "sugar", label: "Sugar" },
  { value: "lays", label: "Lays" },
  { value: "coca", label: "Coca" },
];

export const yoghurtOptions = [
  { value: "peach", label: "Perzik" },
  { value: "blueberry", label: "Blauwe bes" },
  { value: "apple", label: "Appel" },
];

interface Option {
  value: string;
  label: string;
}

/** Vertaalt een opgeslagen waarde terug naar het leesbare label; valt terug op de waarde zelf. */
export const getOptionLabel = (options: readonly Option[], value: string): string =>
  options.find((option) => option.value === value)?.label ?? value;
