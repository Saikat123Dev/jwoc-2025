"use client";

import React from "react";

const content = `JWoC provides a fully immersive learning experience for students and first-time contributors by promoting the wonders of open-source software and crafting a community of new and experienced technical developers. The best projects are selected for this program. Students get acquainted with the projects from the mentors during the Community Bonding Period. Students work on these projects during the coding phase. At the end of the coding period, the winners of the programs are announced on the basis of their contribution in terms of quantity as well as quality.`;

export default function AboutJWoC() {
  return (
    <div className="w-full z-[99999999] backdrop-blur-lg bg-white/5
    m-auto rounded-xl shadow-2xl px-4 sm:px-6 lg:px-8 pb-6">
      <div className="text-3xl md:text-4xl font-extrabold text-white px-7 pt-6 leading-tight">
        <span className="bg-clip-text
        text-5xl text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600"
        style={{
          fontFamily: "Jersey, sans-serif",


        }}
        >
          JWoC: How it Works?
        </span>
      </div>

      <div className="text-gray-100 dark:text-gray-300 leading-relaxed w-full mx-4 my-5 px-6 text-lg md:text-base sm:text-sm">
        <p className="mb-4 first-letter:text-5xl first-letter:font-bold first-letter:text-cyan-400 first-letter:mr-2 first-letter:float-left text-md tracking-widest"
        style={
     {     fontFamily: "Electrolize",

}
}

        >
          {content}
        </p>
        <p className="text-[0.7rem] italic text-gray-300">
          Note: Contributions are evaluated based on quality and quantity.
        </p>
      </div>
    </div>
  );
}
