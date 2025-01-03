"use client";

import { cn } from "@/lib/utils";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { useEffect, useState } from "react";

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}) => {
  const [showCursor, setShowCursor] = useState(true);

  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""), // Split into characters
  }));

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: [0, 1],
          y: [20, 0],
          scale: [0.8, 1],
        },
        {
          duration: 0.5,
          delay: stagger(0.08),
          ease: [0.25, 1, 0.5, 1],
        }
      ).then(() => {
        setShowCursor(false);
      });
    }
  }, [isInView, animate]);

  const renderWords = () => (
    <motion.div ref={scope} className="inline">
      {wordsArray.map((word, idx) => (
        <div key={`word-${idx}`} className="inline-block">
          {word.text.map((char, index) => (
            <motion.span
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              key={`char-${index}`}
              className={cn(
                "dark:text-white text-black font-semibold opacity-0 hidden transition-colors duration-300 hover:text-blue-500 hover:scale-110",
                word.className
              )}
            >
              {char}
            </motion.span>
          ))}
          {idx < wordsArray.length - 1 && (
            <span className="inline-block mr-1">&nbsp;</span>
          )}
        </div>
      ))}
    </motion.div>
  );

  return (
    <div
      className={cn(
        "text-lg sm:text-2xl md:text-4xl lg:text-6xl font-extrabold text-center my-4 leading-tight tracking-wide",
        className
      )}
    >
      {renderWords()}
      {showCursor && (
        <motion.span
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: [0, 1],
            height: ["0%", "100%"],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className={cn(
            "inline-block rounded-sm w-[4px] h-5 md:h-8 lg:h-12 bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse",
            cursorClassName
          )}
        />
      )}
    </div>
  );
};

export const TypewriterEffectSmooth = ({
  words,
  className,
  cursorClassName,
}) => {
  const [showCursor, setShowCursor] = useState(true);
  const [animationComplete, setAnimationComplete] = useState(false);

  const wordsArray = words.map((word) => ({
    ...word,
    text: word.text.split(""), // Split into characters
  }));

  const containerVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "fit-content",
      transition: {
        duration: 2,
        ease: [0.25, 1, 0.5, 1],
        delay: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCursor(false);
      setAnimationComplete(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const renderWords = () => (
    <div>
      {wordsArray.map((word, idx) => (
        <motion.div
          key={`word-${idx}`}
          className="inline-block"
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: idx * 0.15 }}
        >
          {word.text.map((char, index) => (
            <span
              key={`char-${index}`}
              className={cn(
                "dark:text-white text-black font-medium transition-colors duration-300 hover:text-purple-500 hover:scale-110",
                word.className,
                animationComplete && "hover:text-blue-500 dark:hover:text-blue-400"
              )}
            >
              {char}
            </span>
          ))}
          {idx < wordsArray.length - 1 && (
            <span className="inline-block mr-1">&nbsp;</span>
          )}
        </motion.div>
      ))}
    </div>
  );

  return (
    <div className={cn("flex space-x-2 my-4", className)}>
      <motion.div
        className="overflow-hidden pb-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className="text-sm sm:text-lg md:text-2xl lg:text-4xl xl:text-5xl font-bold tracking-wide"
          style={{
            whiteSpace: "nowrap",
          }}
        >
          {renderWords()}
        </div>
      </motion.div>
      {showCursor && (
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1],
            scale: [0.8, 1],
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className={cn(
            "block rounded-sm w-[4px] h-5 sm:h-8 xl:h-12 bg-gradient-to-r from-purple-400 to-purple-600 shadow-lg animate-pulse shadow-purple-500/50",
            cursorClassName
          )}
        />
      )}
    </div>
  );
};
