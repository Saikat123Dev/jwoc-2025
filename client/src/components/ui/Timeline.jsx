import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const Snowfall = () => {
  const generateSnowflakes = () => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 3 + 2}s`,
      opacity: Math.random() * 0.7 + 0.3,
      size: `${Math.random() * 3 + 1}px`
    }));
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      {generateSnowflakes().map((snowflake) => (
        <div
          key={snowflake.id}
          className="absolute bg-white rounded-full animate-snowfall"
          style={{
            left: snowflake.left,
            width: snowflake.size,
            height: snowflake.size,
            opacity: snowflake.opacity,
            animationDuration: snowflake.animationDuration,
            top: '-5px',
            filter: 'blur(0.5px)'
          }}
        />
      ))}
    </div>
  );
};

const GlowingTitle = ({ children, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 1,
      type: "spring",
      stiffness: 100
    }}
    className={`relative group ${className}`}
  >
    <motion.span
      className="absolute inset-0 blur-lg bg-blue-400/30"
      whileHover={{ scale: 1.1 }}
      animate={{
        background: ["rgba(59,130,246,0.3)", "rgba(59,130,246,0.5)", "rgba(59,130,246,0.3)"],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    <span className="relative text-white drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.7)] transition-all duration-500">
      {children}
    </span>
  </motion.div>
);

const TimelineItem = ({ item, index, isVisible }) => {
  const variants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: index * 0.2
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      className="flex justify-start pt-10 md:pt-40 md:gap-10"
    >
      <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
        <motion.div
          className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-blue-500/20 backdrop-blur-sm flex items-center justify-center border border-blue-300/30"
          whileHover={{ scale: 1.2 }}
          animate={{
            boxShadow: [
              "0 0 10px rgba(59,130,246,0.3)",
              "0 0 20px rgba(59,130,246,0.5)",
              "0 0 10px rgba(59,130,246,0.3)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="h-4 w-4 rounded-full bg-blue-400/50 border border-blue-300/50 animate-pulse" />
        </motion.div>
        <motion.h3
          className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-white drop-shadow-[0_0_10px_rgba(219,234,254,0.3)]"
          animate={{
            textShadow: [
              "0 0 10px rgba(219,234,254,0.3)",
              "0 0 20px rgba(219,234,254,0.5)",
              "0 0 10px rgba(219,234,254,0.3)"
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {item.title}
        </motion.h3>
      </div>
      <div className="relative pl-20 pr-4 md:pl-4 w-full">
        <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-white drop-shadow-[0_0_10px_rgba(219,234,254,0.3)]">
          {item.title}
        </h3>
        <motion.div
          className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-blue-300/10 shadow-xl transition-all duration-300"
          whileHover={{
            scale: 1.02,
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
        >
          <motion.div
            className="text-white drop-shadow-[0_0_8px_rgba(219,234,254,0.2)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.3 }}
          >
            {item.content}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const Timeline = ({ data }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [visibleItems, setVisibleItems] = useState([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }

    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setIsFixed(rect.top <= 0 && rect.bottom >= window.innerHeight);

        // Calculate which items are visible
        const visible = data.map((_, index) => {
          const itemTop = (window.innerHeight * 0.4) * index;
          const scrollPosition = Math.abs(rect.top);
          return scrollPosition >= itemTop;
        });
        setVisibleItems(visible);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data, ref]);

  return (
    <div className="min-h-screen">

      <div
        className={`w-full font-sans relative z-10 ${isFixed ? 'fixed top-0' : ''}`}
        ref={containerRef}
      >
        <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
          <GlowingTitle className="text-lg md:text-4xl mb-4 font-bold">
            Changelog from my journey
          </GlowingTitle>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-blue-100 text-sm md:text-base max-w-sm drop-shadow-[0_0_8px_rgba(219,234,254,0.3)]"
          >
            I&apos;ve been working on Aceternity for the past 2 years. Here&apos;s
            a timeline of my journey.
          </motion.p>
        </div>
        <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
          <AnimatePresence>
            {data.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
                index={index}
                isVisible={visibleItems[index]}
              />
            ))}
          </AnimatePresence>
          <motion.div
            style={{
              height: height + "px",
            }}
            className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-blue-300/30 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-blue-400 via-blue-300 to-transparent from-[0%] via-[10%] rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />
          </motion.div>
        </div>
      </div>
      {isFixed && <div style={{ height: `${height}px` }} />}
    </div>
  );
};

export default Timeline;
