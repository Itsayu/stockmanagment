import React, { ChangeEvent } from 'react';

interface SearchBarProps {
  searchTerm: string;
  handleSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearchSubmit: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, handleSearchChange, handleSearchSubmit }) => {
  return (
    <div className="flex items-center gap-2">
        Search:
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="form-input"
      />
      <button onClick={handleSearchSubmit} ></button>
    </div>
  );
};

export default SearchBar;
