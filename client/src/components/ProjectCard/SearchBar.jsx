import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");

    const handleChange = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        onSearch(newQuery);
    };

    return (
        <div>
            <div className="">
                <input
                    className="h-11 bg-gradient-to-br from-white/20 to-white/10 p-2"
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Search projects..."
                />
            </div>
        </div>
    );
};

export default SearchBar;