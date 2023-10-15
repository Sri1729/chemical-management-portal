import React from "react";

interface DateCompProps {
  selectedDate: string;
  setSelectedDate: (val: string) => void;
  selectedTime: string;
  setSelectedTime: (val: string) => void;
}

export const DateComp = ({
  selectedDate,
  selectedTime,
  setSelectedDate,
  setSelectedTime,
}: DateCompProps) => {
  return (
    <div className="flex mb-4">
      <div className="w-1/2 mr-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="dateInput"
        >
          Select Date
        </label>
        <input
          type="date"
          id="dateInput"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          max={new Date().toISOString().split("T")[0]} // Set max date to today
          className="w-full border border-gray-300 rounded py-2 px-3"
        />
      </div>

      <div className="w-1/2 ml-2">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="timeDropdown"
        >
          Select Time
        </label>
        <input
          type="time"
          id="timeDropdown"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          className="w-full border border-gray-300 rounded py-2 px-3"
        />
      </div>
    </div>
  );
};
