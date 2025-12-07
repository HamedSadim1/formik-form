import React from "react";
import { Field, ErrorMessage, FormikErrors, FormikTouched } from "formik";
import { IconType } from "react-icons";
import { FormValues } from "../utils/formUtils";

interface FormFieldProps {
  name: keyof FormValues;
  label: string;
  type?: string;
  placeholder?: string;
  icon: IconType;
  errors: FormikErrors<FormValues>;
  touched: FormikTouched<FormValues>;
}

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  errors,
  touched,
}) => {
  return (
    <div className="relative">
      <label className="flex items-center text-white text-sm font-medium mb-2">
        <Icon className="mr-2" />
        {label}
      </label>
      <Field
        type={type}
        name={name}
        className={`w-full px-4 py-3 pl-12 bg-white/20 backdrop-blur-sm border rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 transition duration-200 ${
          errors[name] && touched[name]
            ? "border-red-400 focus:ring-red-400"
            : "border-white/30 focus:ring-white/50"
        }`}
        placeholder={placeholder}
      />
      <Icon className="absolute left-4 top-11 text-white/70" />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-300 text-sm mt-1"
      />
    </div>
  );
};

export default FormField;
