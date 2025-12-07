import React from "react";
import { Field } from "formik";

interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  name: string;
  label: string;
  options: CheckboxOption[];
  columns?: number;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  name,
  label,
  options,
  columns = 2,
}) => {
  return (
    <div>
      <label className="block text-white text-sm font-medium mb-3">
        {label}
      </label>
      <div className={`grid grid-cols-${columns} gap-3`}>
        {options.map((option) => (
          <label key={option.value} className="flex items-center space-x-2">
            <Field
              name={name}
              value={option.value}
              type="checkbox"
              className="h-4 w-4 text-blue-600 bg-white/20 border-white/30 rounded focus:ring-white/50"
            />
            <span className="text-white text-sm">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CheckboxGroup;
