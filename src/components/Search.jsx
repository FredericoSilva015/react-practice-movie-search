import React from 'react';

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search w-full flex justify-center">
      <input
        className="w-5/6 border border-white focus:outline-none text-white placeholder:text-[#FFD700] p-3 rounded-xl"
        type="text"
        placeholder="🔍 Search your cozy movie!"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default Search;
