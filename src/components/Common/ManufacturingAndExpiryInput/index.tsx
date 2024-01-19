import React from "react";

interface DateInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  fieldId: string;
  error: string;
}

interface ManufacturingAndExpiryInputProps {
  manufacturingDate: string;
  expiryDate: string;
  showExpiry: boolean;
  onManufacturingDateChange: (val: string) => void;
  onExpiryDateChange: (val: string) => void;
  onShowExpiryChange: (val: boolean) => void;
  manufacturingDateError: string;
  expiryDateError: string;
}
const DateInput = ({
  label,
  value,
  onChange,
  fieldId,
  error,
}: DateInputProps) => (
  <div className="">
    <label
      htmlFor={fieldId}
      className="block text-gray-700 text-sm font-bold mb-2"
    >
      {label}
    </label>
    <input
      id={fieldId}
      type="date"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded py-2 px-3 focus:border-blue-500 outline-none`}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export const ManufacturingAndExpiryInput = ({
  manufacturingDate,
  expiryDate,
  showExpiry,
  onManufacturingDateChange,
  onExpiryDateChange,
  onShowExpiryChange,
  expiryDateError,
  manufacturingDateError,
}: ManufacturingAndExpiryInputProps) => (
  <div className="flex flex-col">
    <div className="flex mb-2">
      <div className="w-1/2 pr-2">
        <DateInput
          label="Manufacturing Date"
          value={manufacturingDate}
          onChange={onManufacturingDateChange}
          fieldId="MfgDate"
          error={manufacturingDateError}
        />
      </div>
      {showExpiry && (
        <div className="w-1/2 pl-2">
          <DateInput
            label="Expiry Date"
            value={expiryDate}
            onChange={onExpiryDateChange}
            fieldId="ExpDate"
            error={expiryDateError}
          />
        </div>
      )}
    </div>
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        checked={showExpiry}
        onChange={(e) => onShowExpiryChange(e.target.checked)}
        className="form-checkbox h-4 w-4 text-blue-500"
      />
      <label className="ml-2 text-gray-700">Add Expiry Date</label>
    </div>
  </div>
);
