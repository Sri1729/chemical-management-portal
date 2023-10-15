import React, { useState } from "react";

interface CheckboxProps {
  val: boolean;
  setValue: (val: boolean) => void;
  fieldId: string;
  title: string;
}
export const Checkbox = ({ val, setValue, fieldId, title }: CheckboxProps) => {
  const handleCheckboxChange = () => {
    setValue(!val);
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={fieldId}
        className="form-checkbox h-5 w-5 text-blue-500"
        checked={val}
        onChange={handleCheckboxChange}
      />
      <label htmlFor={fieldId} className="ml-2 text-gray-700">
        {title}
      </label>
    </div>
  );
};
