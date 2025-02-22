import React from "react";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  searchTerm: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, handleSearch }) => {
  return (
    <div className="relative mb-4">
      <FiSearch className="absolute left-3 top-3 text-gray-400" />
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
      />
    </div>
  );
};

export default SearchBar;
