import React from 'react';

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search">
      <div>
        🔍
        <input
          className="text-white"
          type="text"
          placeholder="Search your cozy movie!"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Search;
