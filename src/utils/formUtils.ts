import * as Yup from "yup";

export interface FormValues {
  name: string;
  email: string;
  isTall: boolean;
  cookies: string[];
  yoghurt: string;
}

export const validationSchema = Yup.object({
  name: Yup.string()
    .required("Naam is verplicht")
    .max(10, "Maximaal 10 karakters"),
  email: Yup.string()
    .email("Ongeldig e-mailadres")
    .required("E-mail is verplicht"),
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
