import React from "react";
import { Field } from "formik";

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
}

const RadioGroup: React.FC<RadioGroupProps> = ({ name, label, options }) => {
  return (
    <div>
      <label className="block text-white text-sm font-medium mb-3">
        {label}
      </label>
      <div className="space-y-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2">
            <Field
              name={name}
              value={option.value}
              type="radio"
              className="h-4 w-4 text-blue-600 bg-white/20 border-white/30 focus:ring-white/50"
            />
            <span className="text-white text-sm">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioGroup;
