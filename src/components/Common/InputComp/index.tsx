import React, { useState } from "react";

interface InputCompProps {
  title: string;
  value: string;
  error: string;
  fieldId: string;
  onChangeValue: (val: string) => void;
}

export const InputComp = ({
  error,
  title,
  value,
  onChangeValue,
  fieldId,
}: InputCompProps) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={fieldId}
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        {title}
      </label>
      <input
        type="text"
        id={fieldId}
        value={value}
        onChange={(e) => onChangeValue(e?.target?.value)}
        placeholder="Enter here..."
        className={`w-full border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded py-2 px-3 focus:border-blue-500 outline-none`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
