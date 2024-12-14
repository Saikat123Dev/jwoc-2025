import React, { useState, useEffect } from "react";
"use client";
import { TextGenerateEffect } from "./ui/text-generate-effect";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

const words = `JWoC provides a fully immersive learning experience for students
      and first-time contributors by promoting the wonders of
      open-source software and crafting a community of new and
      experienced technical developers. The best projects are selected 
      for this program. Students get acquainted with the projects from
      the mentors during the Community Bonding Period. Students work on
      these projects during the coding phase. At the end of the coding
      period, the winners of the programs are announced on the basis of
      their contribution in terms of quantity as well as quality.`;

const wor = [
  {
    text: "JWoC",
    className: "text-blue-500 dark:text-blue-500",
  },
  { text: ":" },
  {
    text: "How it Works?",
  },
];

export default function AboutJWoC() {
  const [showTextGenerate, setShowTextGenerate] = useState(false);

  useEffect(() => {
    // Set the duration after which TextGenerateEffect should appear
    const timer = setTimeout(() => {
      setShowTextGenerate(true);
    }, 3000); // Adjust timing to match TypewriterEffectSmooth duration
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full md:text-left bg-white m-auto rounded-xl shadow-lg px-4 sm:px-5 lg:px-8 my-6 pb-6">
      <div className="text-2xl md:text-4xl font-bold px-7 pt-4">
        <TypewriterEffectSmooth words={wor} />
      </div>
      {/* Wrapper div with transition for smooth expansion */}
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          showTextGenerate ? "max-h-[5000px]" : "max-h-[0px]"
        }`}
      >
        {showTextGenerate && (
          <div className="text-gray-200 leading-relaxed w-full mx-4 my-4 px-6 pb-9 text-[18px] md:text-[13px] sm:text-[10px]">
            <TextGenerateEffect words={words} />
          </div>
        )}
      </div>
    </div>
  );
}
