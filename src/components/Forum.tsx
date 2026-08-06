import { Field, Form, Formik } from "formik";
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import { FaEnvelope, FaExclamationTriangle, FaRedo, FaUser } from "react-icons/fa";
import { cookieOptions, FormValues, validationSchema, yoghurtOptions } from "../utils/formUtils";
import CheckboxGroup from "./CheckboxGroup";
import FormField from "./FormField";
import LiveValues from "./LiveValues";
import RadioGroup from "./RadioGroup";
import ScrollToFirstError from "./ScrollToFirstError";
import SubmitButton from "./SubmitButton";
import SuccessMessage from "./SuccessMessage";

const EMPTY_FORM_VALUES: FormValues = {
  name: "",
  email: "",
  isTall: false,
  cookies: [],
  yoghurt: "",
};

// Gesimuleerde netwerkfout: standaard 15% kans op een mislukte verzending,
// zodat het error-pad (foutmelding + retry) in de demo getest kan worden.
// Deterministisch testbaar via de URL: ?fail=always | ?fail=never | ?fail=0.5
const DEFAULT_FAILURE_RATE = 0.15;

const getFailureRate = (): number => {
  const param = new URLSearchParams(window.location.search).get("fail");
  if (!param) return DEFAULT_FAILURE_RATE;
  if (param === "always") return 1;
  if (param === "never") return 0;
  const parsed = Number(param);
  return Number.isFinite(parsed) && parsed >= 0 && parsed <= 1 ? parsed : DEFAULT_FAILURE_RATE;
};

// Cleart de gesimuleerde netwerkfout zodra de gebruiker het formulier aanpast.
// Zo blijft de banner niet staan als veldvalidatie de eigenlijke oorzaak is
// geworden (bijv. een retry-knop die faalt omdat een veld ongeldig is).
const ClearSubmitErrorOnChange: FC<{
  values: FormValues;
  onClear: Dispatch<SetStateAction<boolean>>;
}> = ({ values, onClear }) => {
  const prevValues = useRef(values);

  useEffect(() => {
    if (prevValues.current !== values) {
      prevValues.current = values;
      onClear(false);
    }
  }, [values, onClear]);

  return null;
};

const Forum: FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [lastSubmission, setLastSubmission] = useState<FormValues | null>(null);
  const [submitError, setSubmitError] = useState(false);
  // Eenmalig gelezen; de ?fail= param maakt het error-pad deterministisch testbaar.
  const [failureRate] = useState(getFailureRate);
  // Formik mount opnieuw bij het wisselen tussen succes- en formulierweergave,
  // dus deze state bepaalt de startwaarden van het (her)opgebouwde formulier.
  const [initialValues, setInitialValues] = useState<FormValues>(EMPTY_FORM_VALUES);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const returnToForm = (restore: boolean) => {
    setInitialValues(restore && lastSubmission ? lastSubmission : EMPTY_FORM_VALUES);
    setIsSubmitted(false);
    requestAnimationFrame(() => nameInputRef.current?.focus());
  };

  return (
    <div className="w-full animate-fade-in-up rounded-3xl bg-linear-to-b from-white/25 via-white/10 to-white/5 p-px shadow-2xl shadow-black/50">
      <div className="rounded-[calc(1.5rem_-_1px)] bg-[#1d1a47]/60 p-6 backdrop-blur-2xl sm:p-8">
        <div className="mb-8 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-400/40 bg-primary-500/10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-primary-300">
            <span
              className="size-1.5 animate-pulse rounded-full bg-primary-400"
              aria-hidden="true"
            />
            Registratie
          </span>
          <h1 className="mb-2 bg-linear-to-r from-white via-white to-white/60 bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
            Mijn Forum
          </h1>
          <p className="text-sm text-white/60">Vul het formulier in om deel te nemen</p>
        </div>

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
            // Live validatie op change: een fout tijdens het typen wordt meteen
            // zichtbaar, dus de succes-glow verschijnt nooit op ongeldige input.
            validateOnChange
            validateOnBlur
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              setSubmitError(false);
              setTimeout(() => {
                setSubmitting(false);
                // Gesimuleerde netwerkfout — bij falen blijven de waarden in het
                // formulier staan, zodat direct opnieuw proberen mogelijk is.
                if (Math.random() < failureRate) {
                  setSubmitError(true);
                  return;
                }
                // Bewaar de inzending zodat het succes-scherm een terugblik
                // toont en "Terug naar mijn formulier" de waarden herstelt.
                setLastSubmission(values);
                setIsSubmitted(true);
                resetForm();
              }, 1000);
            }}
          >
            {({ values, isSubmitting }) => (
              <>
                <ScrollToFirstError />
                <ClearSubmitErrorOnChange values={values} onClear={setSubmitError} />
                <Form className="space-y-6">
                  <FormField
                    name="name"
                    label="Naam"
                    placeholder="Voer je naam in"
                    icon={FaUser}
                    autoComplete="name"
                    required
                    maxLength={10}
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

                  <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors duration-200 hover:border-white/25 hover:bg-white/10">
                    <div>
                      <span className="block text-sm font-medium text-white">Ben je lang?</span>
                      <span className="block text-xs text-white/60">
                        Schakel in als je lang bent
                      </span>
                    </div>
                    <label
                      htmlFor="isTall"
                      className="relative inline-flex cursor-pointer items-center transition-transform duration-200 active:scale-[0.98]"
                    >
                      <Field id="isTall" name="isTall" type="checkbox" className="peer sr-only" />
                      <span
                        aria-hidden="true"
                        className="h-6 w-11 rounded-full border border-white/20 bg-white/10 shadow-inner transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-white/60 peer-checked:border-transparent peer-checked:bg-linear-to-r peer-checked:from-accent-500 peer-checked:to-primary-600"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute left-0.5 top-0.5 size-5 rounded-full bg-white shadow-md transition-transform duration-200 peer-checked:translate-x-5"
                      />
                    </label>
                  </div>

                  <CheckboxGroup
                    name="cookies"
                    label="Koekjes (meerdere keuze)"
                    options={cookieOptions}
                  />

                  <RadioGroup name="yoghurt" label="Yoghurt (één keuze)" options={yoghurtOptions} />

                  {submitError && (
                    <div className="animate-fade-in rounded-xl border border-danger-400/50 bg-danger-500/10 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                      <div className="flex items-start gap-3">
                        <FaExclamationTriangle
                          className="mt-0.5 shrink-0 text-danger-400"
                          aria-hidden="true"
                        />
                        <p role="alert" className="flex-1 text-sm text-danger-300">
                          <span className="font-semibold">Verzenden mislukt.</span> Er is iets
                          misgegaan bij het verzenden van je formulier. Probeer het opnieuw.
                        </p>
                      </div>
                      <div className="mt-3 flex flex-wrap justify-end gap-2">
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 rounded-xl border border-danger-400/40 bg-danger-500/20 px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-danger-500/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-danger-400/40"
                        >
                          <FaRedo className="text-xs" aria-hidden="true" />
                          Opnieuw proberen
                        </button>
                        <button
                          type="button"
                          onClick={() => setSubmitError(false)}
                          className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80 transition duration-200 hover:bg-white/20 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                        >
                          Sluiten
                        </button>
                      </div>
                    </div>
                  )}

                  <SubmitButton isSubmitting={isSubmitting}>Verzenden</SubmitButton>

                  <LiveValues values={values} />
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
