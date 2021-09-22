import React, { Fragment } from "react";
import "../App.css";

const SearchBox = (props) => {
  const { searchTerm, handleSearch, setSearchTerm } = props;
  return (
    <Fragment>
      <input
        type="text"
        className="search"
        placeholder="Enter City here.."
        value={searchTerm}
        onKeyUp={(e) => {
          if (e.code === "Enter") handleSearch(searchTerm);
        }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="search-button"
        onClick={() => handleSearch(searchTerm)}
      >
        Search
      </button>
    </Fragment>
  );
};

export default SearchBox;
