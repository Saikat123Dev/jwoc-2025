import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/ProjectCard/Card";
import SearchBar from "../../components/ProjectCard/SearchBar";
import "./Tagstyle.css";

export default function Projects() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);

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
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const filtered = data.filter((project) => {
            const searchLower = searchQuery.toLowerCase();
            return (
                project.projectName.toLowerCase().includes(searchLower) ||
                project.projectTags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
                project.projectOwner?.name?.toLowerCase().includes(searchLower)
            );
        });

        setFilteredData(filtered);
    }, [searchQuery, data]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <div className="w-screen flex flex-col items-center p-4 gap-y-6">
            <div className="my-[100px] w-full max-w-[1400px]">
                <div className="flex flex-col items-center text-center gap-y-4">
                    <h1 className="text-cyan-500 pb-4 font-rubik text-6xl font-semibold text-glow">
                        Projects
                    </h1>
                    <div className="w-full max-w-md">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>

                {/* Show loading indicator */}
                {loading ? (
                    <div className="mt-10 flex justify-center items-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
                    </div>
                ) : (
                    <div className="flex flex-wrap mt-10 justify-center gap-6">
                        {filteredData.length > 0 ? (
                            filteredData.map((item, i) => <Card key={i} data={item} />)
                        ) : (
                            <p className="text-gray-500 text-lg">No projects found.</p>
                        )}
                    </div>
                )}
            </div>

            {/* Footer message */}

        </div>
    );
}
