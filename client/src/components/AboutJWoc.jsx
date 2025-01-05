"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { TypewriterEffectSmooth } from "./ui/typewriter-effect";

const words = [
  {
    text: "JWOC",
    className: "text-blue-500 dark:text-blue-500"
  },
  {
    text: ": How it Works ?"
  }
];

const content = `JWoC provides a fully immersive learning experience for students and first-time contributors by promoting the wonders of open-source software and crafting a community of new and experienced technical developers. The best projects are selected for this program. Students get acquainted with the projects from the mentors during the Community Bonding Period. Students work on these projects during the coding phase. At the end of the coding period, the winners of the programs are announced on the basis of their contribution in terms of quantity as well as quality.`;

const TextGenerateEffect = ({ text }) => {
  const [displayedContent, setDisplayedContent] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedContent(text.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 20); // Reduced interval for smoother animation

    return () => clearInterval(intervalId);
  }, [text]);

  return <div>{displayedContent}</div>;
};

export default function AboutJWoC() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full z-[99999999] md:text-left bg-white m-auto rounded-xl shadow-lg px-4 sm:px-5 lg:px-8  pb-6">
      <div className="text-2xl md:text-4xl font-bold px-7 pt-4">
        <TypewriterEffectSmooth
          words={words}
          cursorClassName="bg-blue-500"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: showContent ? 1 : 0,
          height: showContent ? "auto" : 0
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut"
        }}
        className="overflow-hidden"
      >
        {showContent && (
          <div className="text-gray-600 dark:text-gray-200 leading-relaxed w-full mx-4 my-4 px-6 pb-9 text-[18px] md:text-[16px] sm:text-[14px]">
            <TextGenerateEffect text={content} />
          </div>
        )}
      </motion.div>
    </div>
  );
}
