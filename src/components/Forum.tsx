import { Form, Formik } from "formik";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { submitForm } from "../services/forumApi";
import {
  cookieOptions,
  FormValues,
  NAME_MAX_LENGTH,
  validationSchema,
  yoghurtOptions,
} from "../utils/formUtils";
import ClearSubmitErrorOnChange from "./ClearSubmitErrorOnChange";
import FormField from "./FormField";
import FormHeader from "./FormHeader";
import LiveValues from "./LiveValues";
import OptionGroup from "./OptionGroup";
import ScrollToFirstError from "./ScrollToFirstError";
import SubmitButton from "./SubmitButton";
import SubmitErrorBanner from "./SubmitErrorBanner";
import SuccessMessage from "./SuccessMessage";
import ToggleSwitch from "./ToggleSwitch";

const EMPTY_FORM_VALUES: FormValues = {
  name: "",
  email: "",
  isTall: false,
  cookies: [],
  yoghurt: "",
};

const Forum: FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<FormValues | null>(null);
  const [submitError, setSubmitError] = useState(false);
  // Formik mount opnieuw bij het wisselen tussen succes- en formulierweergave,
  // dus deze state bepaalt de startwaarden van het (her)opgebouwde formulier.
  const [initialValues, setInitialValues] = useState<FormValues>(EMPTY_FORM_VALUES);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const submitErrorRef = useRef<HTMLDivElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  // Stabiele callback, gedeeld door onSubmit (retry) en ClearSubmitErrorOnChange.
  const clearSubmitError = useCallback(() => setSubmitError(false), []);
  // Sluit de banner expliciet (Escape of de knop) en breng de focus terug
  // naar de submit-knop — maar alleen als die op dat moment in de banner lag.
  // Was de focus elders (bijv. in een veld), dan blijft die gewoon staan.
  const closeSubmitError = useCallback(() => {
    setSubmitError(false);
    if (submitErrorRef.current?.contains(document.activeElement)) {
      requestAnimationFrame(() => submitButtonRef.current?.focus());
    }
  }, []);

  // Verplaats de focus naar de foutbanner zodat toetsenbordgebruikers direct
  // "Opnieuw proberen" of "Sluiten" kunnen bereiken.
  useEffect(() => {
    if (submitError) submitErrorRef.current?.focus();
  }, [submitError]);

  // Escape sluit de foutbanner, ook als de focus elders ligt.
  useEffect(() => {
    if (!submitError) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSubmitError();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [submitError, closeSubmitError]);

  const returnToForm = (restore: boolean) => {
    // Kopieer de inzending, zodat een eventuele latere mutatie van values de
    // terugblik (lastSubmission) niet kan aantasten.
    setInitialValues(restore && lastSubmission ? { ...lastSubmission } : EMPTY_FORM_VALUES);
    setIsSubmitted(false);
    requestAnimationFrame(() => nameInputRef.current?.focus());
  };

  return (
    <div className="w-full animate-fade-in-up rounded-card bg-linear-to-b from-white/25 via-white/10 to-white/5 p-px shadow-2xl shadow-black/50">
      <div className="rounded-card-inner bg-[#1d1a47]/60 p-6 backdrop-blur-2xl sm:p-8">
        <FormHeader
          badge="Registratie"
          title="Mijn Forum"
          subtitle="Vul het formulier in om deel te nemen"
        />

        {isSubmitted && lastSubmission ? (
          <SuccessMessage
            lastSubmission={lastSubmission}
            onBackToForm={() => returnToForm(true)}
            onReset={() => returnToForm(false)}
          />
        ) : (
          <Formik<FormValues>
            initialValues={initialValues}
            validationSchema={validationSchema}
            // Fouten pas tonen na blur (en bij submit): tijdens het typen blijft
            // het veld rustig, zodat er geen error-flash midden in het typen
            // verschijnt. Validatie op change is daarvoor uitgeschakeld.
            validateOnChange={false}
            validateOnBlur
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              // Formik zet isSubmitting zelf al op true vóór onSubmit én
              // blokkeert dubbel-submit natively in handleSubmit (plus: de
              // knop is tijdens submit disabled).
              // De foutbanner blijft bewust zichtbaar tijdens een retry:
              // direct wissen zou de gefocuste "Opnieuw proberen"-knop
              // unmounten en de focus naar het body-element laten vallen.
              try {
                await submitForm(values);
              } catch {
                // Gesimuleerde netwerkfout — bij falen blijven de waarden in
                // het formulier staan, zodat direct opnieuw proberen mogelijk is.
                setSubmitError(true);
                return;
              } finally {
                setSubmitting(false);
              }
              // Pas bij succes de foutmelding wissen, vóór de switch naar het
              // succes-scherm (anders zou de banner bij "Terug naar mijn
              // formulier" weer verschijnen).
              clearSubmitError();
              // Bewaar de inzending zodat het succes-scherm een terugblik
              // toont en "Terug naar mijn formulier" de waarden herstelt.
              setLastSubmission(values);
              setIsSubmitted(true);
              resetForm();
            }}
          >
            {({ values, isSubmitting }) => (
              <>
                <ScrollToFirstError />
                <ClearSubmitErrorOnChange onClear={clearSubmitError} />
                <Form className="space-y-6">
                  <FormField
                    name="name"
                    label="Naam"
                    placeholder="Voer je naam in"
                    icon={FaUser}
                    autoComplete="name"
                    required
                    maxLength={NAME_MAX_LENGTH}
                    inputRef={nameInputRef}
                  />

                  <FormField
                    name="email"
                    label="E-mail"
                    type="email"
                    placeholder="Voer je e-mail in"
                    icon={FaEnvelope}
                    autoComplete="email"
                    required
                  />

                  <ToggleSwitch
                    name="isTall"
                    label="Ben je lang?"
                    description="Schakel in als je lang bent"
                  />

                  <OptionGroup
                    type="checkbox"
                    name="cookies"
                    label="Koekjes (meerdere keuze)"
                    options={cookieOptions}
                  />

                  <OptionGroup
                    type="radio"
                    name="yoghurt"
                    label="Yoghurt (één keuze)"
                    options={yoghurtOptions}
                  />

                  {submitError && (
                    <SubmitErrorBanner
                      bannerRef={submitErrorRef}
                      isSubmitting={isSubmitting}
                      onClose={closeSubmitError}
                    />
                  )}

                  <SubmitButton submitButtonRef={submitButtonRef} isSubmitting={isSubmitting}>
                    Verzenden
                  </SubmitButton>

                  {/* Debug-paneel: alleen zichtbaar in development, niet in productie. */}
                  {import.meta.env.DEV && <LiveValues values={values} />}
                </Form>
              </>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default Forum;
