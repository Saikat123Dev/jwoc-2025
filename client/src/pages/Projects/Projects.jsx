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
        const filtered = data.filter(project =>
            project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
    }, [searchQuery, data]);

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        // <div className="gap-y-4 flex flex-col p-4">
        //     <div className="my-[120px]">
        //         <div className="flex-col relative flex gap-y-3 items-center project-title justify-center h-30">
        //             <h1 className="text-transperent relative font-rubik text-cyan-500 text-glow">Projects</h1>
        //             <div className="relative mt-3">
        //                 <SearchBar onSearch={handleSearch} />
        //             </div>
        //         </div>
        //         <div className="flex flex-wrap mt-11 justify-center">
        //             {filteredData.map((items, i) => (
        //                 <div key={i}>
        //                     <Card data={items} />
        //                 </div>
        //             ))}
        //         </div>
        //     </div>
        // </div>
        <div className="min-h-screen flex items-center justify-center  ">
            <div className="text-center p-8">
                <h1 className="text-6xl md:text-8xl font-rubik font-bold text-cyan-500 mb-8 animate-pulse">
                    Coming Soon
                </h1>
                <div className="text-xl md:text-2xl text-cyan-300 font-light">
                    We're working on something awesome!
                    <div className="mt-4 flex justify-center space-x-2">
                        <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}