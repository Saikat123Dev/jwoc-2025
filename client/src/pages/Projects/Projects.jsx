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
        const filtered = data.filter(project => {
            const searchLower = searchQuery.toLowerCase();
            
       
            const nameMatch = project.projectName.toLowerCase().includes(searchLower);
            
       
            const tagMatch = project.projectTags.some(tag => 
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
        <div className="gap-y-4 flex flex-col p-4">
            <div className="my-[120px]">
                <div className="flex-col relative flex gap-y-3 items-center project-title justify-center h-30">
                    <h1 className="text-transperent relative font-rubik text-cyan-500 text-glow">
                        Projects
                    </h1>
                    <div className="relative mt-3">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                </div>
                <div className="flex flex-wrap mt-11 justify-center">
                    {filteredData.map((items, i) => (
                        <div key={i}>
                            <Card data={items} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}