import React from "react";
import { Search } from "react-feather";

interface SearchBoxProps {
  value: string;
  setValue: (val: string) => void;
}

export const SearchBox = ({ setValue, value }: SearchBoxProps) => {
  return (
    <div className="relative">
      <input
        type="text"
        className="py-2 px-4 w-64 rounded-full border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search chemicals..."
        value={value}
        onChange={(e) => setValue(e?.target?.value)}
      />
      <div className="absolute top-0 right-0 mt-2 mr-3 text-gray-500">
        <Search />
      </div>
    </div>
  );
};
