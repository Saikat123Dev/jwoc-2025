import { motion } from "framer-motion";
import React from "react";

const GlowingTitle = ({ children, className }) => (
  <h2
    className={`${className} text-white drop-shadow-[0_0_10px_rgba(219,234,254,0.3)]`}
  >
    {children}
  </h2>
);

const TimelineItem = ({ item, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay: index * 0.2
        }
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex justify-start pt-10 md:pt-40 md:gap-10"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        whileInView={{
          scale: 1,
          transition: {
            duration: 0.5,
            delay: index * 0.2
          }
        }}
        viewport={{ once: true }}
        className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full"
      >
        <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-blue-500/20 backdrop-blur-sm flex items-center justify-center border border-blue-300/30">
          <div className="h-4 w-4 rounded-full bg-blue-400/50 border border-blue-300/50 animate-pulse" />
        </div>
        <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-white drop-shadow-[0_0_10px_rgba(219,234,254,0.3)]">
          {item.title}
        </h3>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.6,
            delay: (index * 0.2) + 0.3
          }
        }}
        viewport={{ once: true }}
        className="relative pl-20 pr-4 md:pl-4 w-full"
      >
        <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-white drop-shadow-[0_0_10px_rgba(219,234,254,0.3)]">
          {item.title}
        </h3>
        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-blue-300/10 shadow-xl">
          <div className="text-white drop-shadow-[0_0_8px_rgba(219,234,254,0.2)]">
            {item.content}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Timeline = ({ data }) => {
  return (
    <div className="min-h-screen">
      <div className="w-full font-sans relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10"
        >
          <GlowingTitle className="text-lg md:text-4xl mb-4 font-bold">
            Changelog from my journey
          </GlowingTitle>
          <p className="text-blue-100 text-sm md:text-base max-w-sm drop-shadow-[0_0_8px_rgba(219,234,254,0.3)]">
            I&apos;ve been working on Aceternity for the past 2 years. Here&apos;s
            a timeline of my journey.
          </p>
        </motion.div>
        <div className="relative max-w-7xl mx-auto pb-20">
          {data.map((item, index) => (
            <TimelineItem key={index} item={item} index={index} />
          ))}
          <div
            className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-blue-300/30 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
            style={{
              height: "100%",
            }}
          >
            <div className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-blue-400 via-blue-300 to-transparent from-[0%] via-[10%] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
