import { Field, Form, Formik } from "formik";
import { FC, useRef, useState } from "react";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { cookieOptions, FormValues, validationSchema, yoghurtOptions } from "../utils/formUtils";
import CheckboxGroup from "./CheckboxGroup";
import FormField from "./FormField";
import LiveValues from "./LiveValues";
import RadioGroup from "./RadioGroup";
import SubmitButton from "./SubmitButton";
import SuccessMessage from "./SuccessMessage";

const Forum: FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
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

        {isSubmitted ? (
          <SuccessMessage onReset={handleReset} />
        ) : (
          <Formik<FormValues>
            initialValues={{
              name: "",
              email: "",
              isTall: false,
              cookies: [],
              yoghurt: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(_, { setSubmitting, resetForm }) => {
              setSubmitting(true);
              setTimeout(() => {
                setSubmitting(false);
                setIsSubmitted(true);
                resetForm();
              }, 1000);
            }}
          >
            {({ values, isSubmitting }) => (
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
                    <span className="block text-xs text-white/50">Schakel in als je lang bent</span>
                  </div>
                  <label
                    htmlFor="isTall"
                    className="relative inline-flex cursor-pointer items-center"
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

                <SubmitButton isSubmitting={isSubmitting}>Verzenden</SubmitButton>

                <LiveValues values={values} />
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
};

export default Forum;
