import { qunatity_units } from "@/store/models";
import React from "react";
interface NumberCompProps {
  title: string;
  value: string;
  error: string;
  fieldId: string;
  onChangeValue: (val: string) => void;
  quantatiyTitle: string;
  quantatiyValue: string;
  quantatiyError: string;
  quantatiyFieldId: string;
  onQuantatiyChangeValue: (val: string) => void;
  showDisabledQuantity?: boolean;
  maxQuantityValue?: string;
}

export const NumberComp = ({
  error,
  fieldId,
  title,
  value,
  onChangeValue,
  quantatiyError,
  onQuantatiyChangeValue,
  quantatiyFieldId,
  quantatiyTitle,
  quantatiyValue,
  showDisabledQuantity = false,
  maxQuantityValue,
}: NumberCompProps) => {
  return (
    <div className="mb-4 flex">
      <div className="w-1/2 pr-2 h-full">
        <label
          htmlFor={fieldId}
          className="block text-gray-700 text-sm font-bold mb-2"
        >
          {title}
        </label>
        <input
          type="number"
          value={value}
          min={0}
          max={maxQuantityValue}
          onChange={(e) => onChangeValue(e.target.value)}
          placeholder="Quantity"
          id={fieldId}
          className={`w-full h-full border ${
            error ? "border-red-500" : "border-gray-300"
          } border-gray-300 rounded py-2 px-3 focus:border-blue-500 outline-none`}
        />
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>

      <div className="w-1/2 pl-2 h-full">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor={quantatiyFieldId}
        >
          {quantatiyTitle}
        </label>
        <select
          id={quantatiyFieldId}
          value={quantatiyValue}
          onChange={(e) => onQuantatiyChangeValue(e.target.value)}
          className={`w-full h-full border ${
            quantatiyError ? "border-red-500" : "border-gray-300"
          } rounded py-2 px-3 focus:border-blue-500 outline-none ${
            showDisabledQuantity ? "cursor-not-allowed bg-gray-200" : ""
          }`}
          disabled={showDisabledQuantity}
        >
          <option value="">Units</option>
          {qunatity_units.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        {quantatiyError && (
          <p className="text-red-500 text-xs mt-1">{quantatiyError}</p>
        )}
      </div>
    </div>
  );
};
