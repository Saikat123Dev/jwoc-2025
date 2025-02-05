import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/ProjectCard/Card";
import SearchBar from "../../components/ProjectCard/SearchBar";
import "./Tagstyle.css";

export default function Projects() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "https://jwoc-2025.onrender.com/api/mentor/project/getAllProjects"
                );
                setData(response.data.projects);
                setFilteredData(response.data.projects);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = data.filter((project) => {
            const searchLower = searchQuery.toLowerCase();
            const nameMatch = project.projectName.toLowerCase().includes(searchLower);
            const tagMatch = project.projectTags.some((tag) =>
                tag.toLowerCase().includes(searchLower)
            );
            const ownerMatch = project.projectOwner?.name?.toLowerCase().includes(searchLower);

            return nameMatch || tagMatch || ownerMatch;
        });

        setFilteredData(filtered);
    }, [searchQuery, data]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <div className="flex flex-col items-center p-4 gap-y-6">
            <div className="my-[100px] w-full max-w-5xl">
                <div className="flex flex-col items-center text-center gap-y-4">
                    <h1 className="text-cyan-500 font-rubik text-3xl font-semibold text-glow">
                        Projects
                    </h1>
                    <div className="w-full max-w-md">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
                <div className="flex flex-wrap mt-10 justify-center gap-6">
                    {filteredData.map((item, i) => (
                        <Card key={i} data={item} />
                    ))}
                </div>
            </div>

            {/* Footer message */}
            <div className="mt-12 text-center text-lg font-medium px-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-fadeIn">
    More exciting projects are on the way! Stay tuned and keep exploring. 🚀✨
</div>

        </div>
    );
}
