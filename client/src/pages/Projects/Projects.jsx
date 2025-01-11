import React, { useState, useCallback, useEffect } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Card from "../../components/ProjectCard/Card";
import "./Tagstyle.css";
import axios from "axios";
import SearchBar from "../../components/ProjectCard/SearchBar";
export default function Projects() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/mentor/project/getAllProjects"
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

    const init = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);

    return (
        <div className="gap-y-4 flex flex-col p-4">
            <Particles
                options={{
                    particles: {
                        color: {
                            value: "#fff"
                        },
                        number: {
                            value: 200,
                            density: {
                                enable: true,
                                area: 800,
                            },
                        },
                        opacity: {
                            value: { min: 0.3, max: 1 }
                        },
                        shape: {
                            type: "circle"
                        },
                        size: {
                            value: { min: 1, max: 3 }
                        },
                        move: {
                            direction: "bottom-right",
                            enable: true,
                            speed: { min: 3, max: 5 },
                            straight: true
                        }
                    }
                }}
                init={init}
            />
            <div className="my-[120px]">
                <div className="flex-col relative flex gap-y-3 items-center project-title justify-center h-30">
                    <h1 className="text-transperent relative font-rubik text-cyan-500 text-glow">Projects</h1>
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