"use client";
import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 1
}) => {
  const [scope, animate] = useAnimate();
  const [isAnimating, setIsAnimating] = useState(false); // To track if the animation has started
  
  let wordsArray = words.split(" ");
  
  useEffect(() => {
    // Trigger animation after the component has mounted
    setIsAnimating(true);
    
    animate("span", {
      opacity: 1,
      filter: filter ? "blur(0px)" : "none",
      scale: 1,
    }, {
      duration: duration || 0.1,
      delay: stagger(0.1),
    });
    
  }, []);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-white text-black opacity-0"
              style={{
                filter: filter ? "blur(10px)" : "none",
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 2.5,
                ease: "easeOut",
                delay: idx * 0.1,
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-2">
        <motion.div
          initial={{ maxHeight: 0 }}
          animate={{ maxHeight: isAnimating ? "5000px" : "0" }}
          transition={{
            duration: 2, // Increase duration for smoother expansion
            ease: "easeInOut", // Smooth easing
          }}
          style={{
            overflow: "hidden", // Prevent content from spilling outside during animation
          }}
        >
          <div className="dark:text-white text-black text-18px leading-snug tracking-wide">
            {renderWords()}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
