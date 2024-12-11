import React, { useState } from "react";


const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div >
      <div className="" >
        <input
        className="h-11  bg-gradient-to-br from-white/20 to-white/10 dark:from-black/30 dark:to-black/20  p-2"
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search..."
        />
        <button className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600">Search</button>
      </div>
    </div>
  );
};

export default SearchBar;
