import { Field, Form, Formik } from "formik";
import { FC, useState } from "react";
import { FaEnvelope, FaUser } from "react-icons/fa";
import {
  cookieOptions,
  FormValues,
  validationSchema,
  yoghurtOptions,
} from "../utils/formUtils";
import CheckboxGroup from "./CheckboxGroup";
import FormField from "./FormField";
import RadioGroup from "./RadioGroup";
import SubmitButton from "./SubmitButton";
import SuccessMessage from "./SuccessMessage";

const Forum: FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8 w-96 mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-2">Mijn Forum</h1>
        <p className="text-white/80">Vul het formulier in om deel te nemen</p>
      </div>

      {isSubmitted ? (
        <SuccessMessage onReset={() => setIsSubmitted(false)} />
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
          onSubmit={(data: FormValues, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            console.log(` submit ${JSON.stringify(data)}`);
            setTimeout(() => {
              setSubmitting(false);
              setIsSubmitted(true);
              resetForm();
            }, 1000);
          }}
        >
          {({ values, isSubmitting, errors, touched }) => (
            <Form className="space-y-6">
              <FormField
                name="name"
                label="Naam"
                placeholder="Voer je naam in"
                icon={FaUser}
                errors={errors}
                touched={touched}
              />

              <FormField
                name="email"
                label="E-mail"
                type="email"
                placeholder="Voer je e-mail in"
                icon={FaEnvelope}
                errors={errors}
                touched={touched}
              />

              <div className="flex items-center space-x-3">
                <Field
                  name="isTall"
                  type="checkbox"
                  className="h-5 w-5 text-blue-600 bg-white/20 border-white/30 rounded focus:ring-white/50"
                />
                <label className="text-white text-sm">Ben je lang?</label>
              </div>

              <CheckboxGroup
                name="cookies"
                label="Koekjes (meerdere keuze)"
                options={cookieOptions}
              />

              <RadioGroup
                name="yoghurt"
                label="Yoghurt (één keuze)"
                options={yoghurtOptions}
              />

              <SubmitButton isSubmitting={isSubmitting}>Verzenden</SubmitButton>

              <div className="bg-black/20 backdrop-blur-sm border border-white/20 rounded-lg p-4 mt-6">
                <h3 className="text-white text-sm font-medium mb-2">
                  Huidige waarden:
                </h3>
                <pre className="text-white text-xs overflow-x-auto">
                  {JSON.stringify(values, null, 2)}
                </pre>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Forum;
