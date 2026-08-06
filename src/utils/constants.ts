/**
 * Centrale constanten en magische waarden — één bron van waarheid (SSOT) voor
 * de hele app. Gegroepeerd per domein; componenten importeren hieruit in
 * plaats van zelf literals te herhalen.
 *
 * Let op de dependency-richting: constants.ts importeert niets uit de rest van
 * de app, zodat alle andere modules veilig hierop kunnen bouwen.
 */

/* ===== Pagina ===== */

/** Id van de h1, gelinkt aan de <main>-landmark via aria-labelledby (App.tsx). */
export const PAGE_TITLE_ID = "page-title";

/** Badge-tekst boven de paginatitel. */
export const PAGE_BADGE_TEXT = "Registratie";

/** Hoofdtitel van de pagina. */
export const PAGE_TITLE = "Mijn Forum";

/** Subtekst onder de hoofdtitel. */
export const PAGE_SUBTITLE = "Vul het formulier in om deel te nemen";

/* ===== Formuliervelden ===== */

/**
 * Veldnamen als één bron van waarheid: de FormValues-interface, de
 * Yup-schema-keys, de veld-/groep-aanroepen én de scroll-volgorde bouwen
 * hierop voort. `as const` maakt elke waarde een letterlijk type, zodat een
 * typefout optreedt zodra een gebruiker afwijkt.
 */
export const FIELD_NAMES = {
  name: "name",
  email: "email",
  isTall: "isTall",
  cookies: "cookies",
  yoghurt: "yoghurt",
} as const;

/**
 * De formuliervorm zelf, met FIELD_NAMES als computed keys: de velden zijn
 * daardoor niet te hernoemen zonder deze SSOT erbij te betrekken, en de
 * lege-waarden (EMPTY_FORM_VALUES) kunnen niet stilletjes afdrijven.
 */
export interface FormValues {
  [FIELD_NAMES.name]: string;
  [FIELD_NAMES.email]: string;
  [FIELD_NAMES.isTall]: boolean;
  [FIELD_NAMES.cookies]: string[];
  [FIELD_NAMES.yoghurt]: string;
}

/** Type van alle formulierveldnamen. */
export type FieldName = (typeof FIELD_NAMES)[keyof typeof FIELD_NAMES];

/** Volgorde waarin velden op fouten worden gecontroleerd (bovenste eerst). */
export const FIELD_ORDER: readonly FieldName[] = [
  FIELD_NAMES.name,
  FIELD_NAMES.email,
  FIELD_NAMES.cookies,
  FIELD_NAMES.yoghurt,
];

/* ===== Validatie & karakters-teller ===== */

/** Enige bron van waarheid voor de naamlengte: gebruikt door Yup én de input. */
export const NAME_MAX_LENGTH = 10;

/** Drempel (aandeel van maxLength) waarop de karakters-teller amber kleurt. */
export const NEAR_LIMIT_RATIO = 0.8;

/* ===== Labels & validatiemeldingen ===== */

/**
 * Alle formulier-copy: veldlabels, placeholders, beschrijvingen en
 * validatiemeldingen — één bron van waarheid, zodat tekst wijzigen nooit
 * op meerdere plekken tegelijk hoeft.
 */
export const LABELS = {
  /** Veldlabels, gekoppeld aan de veldnamen. */
  fields: {
    [FIELD_NAMES.name]: "Naam",
    [FIELD_NAMES.email]: "E-mail",
    [FIELD_NAMES.isTall]: "Ben je lang?",
    [FIELD_NAMES.cookies]: "Koekjes (meerdere keuze)",
    [FIELD_NAMES.yoghurt]: "Yoghurt (één keuze)",
  },
  /** Beschrijvingen onder veldlabels. */
  descriptions: {
    [FIELD_NAMES.isTall]: "Schakel in als je lang bent",
  },
  /** Placeholders van de tekstvelden. */
  placeholders: {
    [FIELD_NAMES.name]: "Voer je naam in",
    [FIELD_NAMES.email]: "Voer je e-mail in",
  },
  /** Validatiemeldingen zoals getoond onder de velden. */
  validation: {
    nameRequired: "Naam is verplicht",
    nameMaxLength: `Maximaal ${NAME_MAX_LENGTH} karakters`,
    emailInvalid: "Ongeldig e-mailadres",
    emailRequired: "E-mail is verplicht",
    cookiesMin: "Selecteer minstens één koekje",
    yoghurtRequired: "Kies een yoghurtsoort",
  },
  /** Knopteksten. */
  buttons: {
    submit: "Verzenden",
    submitBusy: "Verzenden...",
    retry: "Opnieuw proberen",
    close: "Sluiten",
    backToForm: "Terug naar mijn formulier",
    reset: "Opnieuw invullen",
  },
  /** Teksten op het succes-scherm. */
  success: {
    heading: "Bedankt voor je inzending!",
    body: "We nemen spoedig contact met je op.",
    summarySection: "Jouw inzending",
  },
  /** Teksten in de submit-foutbanner. */
  errorBanner: {
    title: "Verzenden mislukt.",
    message: "Er is iets misgegaan bij het verzenden van je formulier. Probeer het opnieuw.",
  },
  /** Rijlabels van het samenvattingspaneel (korte varianten van de veldlabels). */
  summary: {
    [FIELD_NAMES.name]: "Naam",
    [FIELD_NAMES.email]: "E-mail",
    [FIELD_NAMES.isTall]: "Lang",
    [FIELD_NAMES.cookies]: "Koekjes",
    [FIELD_NAMES.yoghurt]: "Yoghurt",
    yes: "Ja",
    no: "Nee",
  },
  /** Kop van het dev-only debug-paneel. */
  devPanel: {
    heading: "Huidige waarden",
  },
  /** Toegankelijkheidscopy (sr-only aankondigingen). */
  a11y: {
    requiredLabel: "(verplicht)",
  },
} as const;

/* ===== API-simulatie (forumApi) ===== */

/** Gesimuleerde netwerk-latency (ms). */
export const SIMULATED_LATENCY_MS = 1000;

/** Standaard faalkans (0 = altijd succes; triggerbaar via ?fail=...). */
export const DEFAULT_FAILURE_RATE = 0;

/** URL-parameter waarmee de faalkans van de mock getest wordt. */
export const FAIL_PARAM = "fail";

/** ?fail=always: altijd een gesimuleerde netwerkfout. */
export const FAIL_PARAM_ALWAYS = "always";

/** ?fail=never: nooit een gesimuleerde netwerkfout. */
export const FAIL_PARAM_NEVER = "never";

/* ===== Animatie (succes-scherm) ===== */

/** Startvertraging (ms) van de eerste fade op het succes-scherm. */
export const FADE_START_MS = 150;

/** Stapgrootte (ms) tussen opeenvolgende fades. */
export const FADE_STAGGER_MS = 50;

/* ===== Weergave ===== */

/** Toonwaarde voor lege velden in het samenvattingspaneel. */
export const EMPTY_VALUE = "—";

/** Startwaarden van een leeg formulier (Formik initialValues + reset). */
export const EMPTY_FORM_VALUES: FormValues = {
  [FIELD_NAMES.name]: "",
  [FIELD_NAMES.email]: "",
  [FIELD_NAMES.isTall]: false,
  [FIELD_NAMES.cookies]: [],
  [FIELD_NAMES.yoghurt]: "",
};
