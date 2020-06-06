import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="search-bar">
      <div className="search-field">
        <input
          id="search-input"
          className="search-input"
          type="text"
          onKeyPress={(e) => {
            e.key === "Enter" && onSearch();
          }}
          placeholder="Search tags, example: style"
          required
        />
        <button type="submit" className="search-button" onClick={onSearch}>
          <FiSearch />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
