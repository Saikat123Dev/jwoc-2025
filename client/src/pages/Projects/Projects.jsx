import React, { useState, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Card from "../../components/ProjectCard/Card";
import "./Tagstyle.css";
import SearchBar from "../../components/ProjectCard/SearchBar";
import StarryNightBackground from "../Projects/Style"
export default function Projects() {
    const init = useCallback(async (engine) => {
        await loadFull(engine);
    }, []);
    return (
        <div className="gap-y-4   bg-gradient-to-br from-[#3B1578] to-[#B6116B] flex flex-col p-4">
            <StarryNightBackground />
            <Particles options={{
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
                        value: { min: 1, max: 5 }
                    },
                    move: {
                        direction: "bottom-right",
                        enable: true,
                        speed: { min: 3, max: 5 },
                        straight: true
                    }
                }
            }} init={init} />
            <div className="my-[120px]">
                <div className=" flex-col relative flex gap-y-3 items-center project-title  justify-center h-30">
                    <h1 className="text-white relative ">Projects</h1>
                    <div className="relative">
                        <SearchBar />
                    </div>
                </div>
                <div className="flex flex-wrap">
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
    );
}
