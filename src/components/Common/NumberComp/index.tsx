import React from "react";
interface NumberCompProps {
  title: string;
  value: string;
  error: string;
  fieldId: string;
  onChangeValue: (val: string) => void;
}

export const NumberComp = ({
  error,
  fieldId,
  title,
  value,
  onChangeValue,
}: NumberCompProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={fieldId}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {title}
      </label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChangeValue(e.target.value)}
        placeholder="Initial Quantity"
        id={fieldId}
        className="w-full border border-gray-300 rounded py-2 px-3 mb-6"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
