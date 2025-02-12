import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        onSearch(newQuery);
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className={`
                relative flex items-center
                bg-white/10 backdrop-blur-md
                border border-white/20
                rounded-2xl overflow-hidden
                transition-all duration-300 ease-in-out
                ${isFocused ? 'ring-2 ring-cyan-500 shadow-lg shadow-cyan-500/20' : ''}
            `}>
                <Search 
                    className={`
                        w-5 h-5 ml-4
                        transition-colors duration-300
                        ${isFocused ? 'text-cyan-500' : 'text-white/50'}
                    `}
                />
                <input
                    className="
                        w-full px-4 py-3
                        bg-transparent
                        text-white placeholder-white/50
                        outline-none
                        font-medium
                    "
                    type="text"
                    value={query}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Search projects..."
                />
                {query && (
                    <button
                        onClick={() => {
                            setQuery('');
                            onSearch('');
                        }}
                        className="
                            px-4 text-white/50 hover:text-white
                            transition-colors duration-200
                        "
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

export default SearchBar;