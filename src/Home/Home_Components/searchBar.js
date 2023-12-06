import React, { useState } from 'react';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log(`Searching for: ${searchTerm}`);
  };

  const searchStyle = {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc", 
    borderRadius: "5px",
  };

  const searchBarForm = {
    display: "flex",
    alignItems: "center"
  }

  const buttonStyle = {
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    marginLeft: '0px',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  return (
    <div style={{width: "50%"}}>
      <form onSubmit={handleSearchSubmit} style={searchBarForm}>
        <input
          style={searchStyle}
          type="text"
          placeholder="Search for restaurants, businesses, etc."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button style={buttonStyle} type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;