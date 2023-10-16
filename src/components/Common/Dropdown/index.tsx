import { SelectLab } from "@/types";
import React from "react";

interface DropdownProps {
  title: string;
  value: string;
  error: string;
  fieldId: string;
  onChangeValue: (val: string) => void;
  labs: SelectLab[];
}
export const Dropdown = ({
  title,
  value,
  error,
  fieldId,
  onChangeValue,
  labs,
}: DropdownProps) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={fieldId}
      >
        {title}
      </label>
      <select
        id={fieldId}
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
        className={`w-full border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded py-2 px-3 focus:border-blue-500 outline-none`}
      >
        <option value="">Select a lab</option>
        {labs.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
