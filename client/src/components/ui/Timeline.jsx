import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const FloatingStars = () => {
  const starPositions = Array.from({ length: 12 }, (_, i) => ({
    left: `${45 + Math.random() * 10}%`,
    animationDelay: `${Math.random() * 3}s`,
    scale: 0.5 + Math.random() * 0.5
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {starPositions.map((pos, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: pos.left,
            top: `${(i * 25)}%`,
            animationDelay: pos.animationDelay,
            transform: `scale(${pos.scale})`
          }}
        >
          <Star
            className="text-blue-300/30 animate-pulse"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(147, 197, 253, 0.5))'
            }}
            size={16}
          />
        </div>
      ))}
    </div>
  );
};



const TimelineItem = ({ item, index, isEven }) => {
  const containerVariants = {
    hidden: { opacity: 0, x: isEven ? 50 : -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: index * 0.3,
        ease: "easeOut"
      }
    }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: (index * 0.3) + 0.2,
        ease: "backOut"
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative w-full"
    >
      <div className={`flex items-center justify-center w-full ${isEven ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 pt-16`}>
        <motion.div 
          className={`w-full md:w-[calc(45%-2rem)] ${isEven ? 'md:text-right' : 'md:text-left'}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: (index * 0.3) + 0.4 }
          }}
          viewport={{ once: true }}
        >
          <h3 className={`text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent 
                        bg-gradient-to-r ${isEven ? 'from-blue-200 to-white' : 'from-white to-blue-200'}
                        drop-shadow-[0_0_15px_rgba(219,234,254,0.4)]`}>
            {item.title}
          </h3>
          <div className="group bg-gradient-to-br from-white/10 to-white/5 
                        hover:from-white/15 hover:to-white/10 transition-all duration-300 
                        backdrop-blur-lg rounded-xl p-6 
                        border border-blue-300/10 shadow-xl 
                        hover:shadow-2xl hover:shadow-blue-500/10">
            <div className="prose prose-invert max-w-none">
              <div className="text-blue-50 leading-relaxed space-y-4 text-base md:text-lg ">
                {item.content}
              </div>
              {item.tags && (
                <div className={`flex flex-wrap gap-2 mt-4 pt-4 border-t border-blue-200/10 
                              ${isEven ? 'justify-end' : 'justify-start'}`}>
                  {item.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-sm rounded-full 
                               bg-blue-400/10 text-blue-200 border border-blue-300/20
                               hover:bg-blue-400/20 transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={dotVariants}
          className="absolute left-1/2 transform -translate-x-1/2 z-10"
        >
          <div className="relative group">
            <div className="h-15 w-15 rounded-full 
                          bg-gradient-to-br from-blue-400/30 to-purple-500/30 
                          backdrop-blur-md flex items-center justify-center 
                          border border-blue-300/30 shadow-lg shadow-blue-500/20
                          group-hover:from-blue-400/40 group-hover:to-purple-500/40
                          transition-all duration-300">
              <div className="h-10 w-10 rounded-full 
                            bg-gradient-to-r from-blue-400 to-purple-400 
                            border border-blue-300/50 animate-pulse 
                            shadow-lg shadow-blue-400/30
                            group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 rounded-full bg-blue-400/20 animate-ping" />
              <div className="absolute -inset-2 rounded-full bg-blue-400/10 
                            group-hover:bg-blue-400/20 transition-colors duration-300" />
              <Star 
                className="absolute text-white/50 animate-spin"
                style={{ animation: 'spin 4s linear infinite' }}
                size={24}
              />
            </div>
          </div>
        </motion.div>

        <div className="w-full md:w-[calc(45%-2rem)]" />
      </div>
    </motion.div>
  );
};

const Timeline = ({ data }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="py-16 text-center"
        >
          <h1 className="text-4xl font-extrabold font-rubik  text-cyan-500 text-glow lg:text-5xl mb-6">
          
            Journey Through Time
          </h1>
          <p className="text-blue-100 text-lg mx-auto max-w-2xl leading-relaxed 
                       drop-shadow-[0_0_8px_rgba(219,234,254,0.3)]">
            Tracking the evolution and milestones of our project. Each step represents a significant 
            achievement in our ongoing journey to create something extraordinary.
          </p>
        </motion.div>

        <div className="relative pb-20">
          <div className="absolute left-1/2 top-0 transform -translate-x-1/2 h-full w-[3px]">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-300/30 to-transparent" />
            <motion.div
              initial={{ height: "0%" }}
              animate={{ height: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="absolute inset-x-0 top-0 w-full bg-gradient-to-b 
                         from-blue-400 via-blue-300 to-transparent 
                         shadow-[0_0_15px_rgba(59,130,246,0.5)]"
            />
            <div className="absolute inset-0 blur-sm bg-blue-400/20" />
          </div>

       

          {data.map((item, index) => (
            <TimelineItem 
              key={index} 
              item={item} 
              index={index} 
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(10deg); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Timeline;