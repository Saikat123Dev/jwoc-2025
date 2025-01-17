import React from 'react';

const StarryNightBackground = ({ children }) => {
  const generateSnowflakes = (count) => {
    const snowflakes = [];
    for (let i = 0; i <= count; i++) {
      snowflakes.push({
        left: `${Math.random() * 100}%`,
        size: Math.random() * 0.7 + 0.3,
        blur: Math.random() *  6+ 0,
        duration: Math.random() * 10 + 12,
        delay: Math.random() * 10,
      });
    }
    return snowflakes;
  };

  const snowflakes = generateSnowflakes(120);

  return (
    <div className="relative min-h-screen bg-[#021c0e] overflow-hidden">
      {/* Background Image */}
      <div className="absolute w-full h-full">
        <img
          src="pixelcut-export-Photoroom.png"
          alt="doogle"
          className="w-full h-auto blur-[5px] opacity-50 filter invert fixed"
        />
      </div>

      {/* Snowflakes */}
      {snowflakes.map((snowflake, index) => (
        <div
          key={`snowflake-${index}`}
          className="absolute bg-white rounded-full snow-fall z-10"
          style={{
            left: snowflake.left,
            width: `${snowflake.size}rem`,
            height: `${snowflake.size}rem`,
            filter:` blur(${snowflake.blur}px)`,
            animationDuration: `${snowflake.duration}s`,
            animationDelay:` ${snowflake.delay}s`,
          }}
        />
      ))}

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to right, rgba(2, 7, 32, 0.7), rgba(0, 0, 0, 0.3))`,
        }}
      />

      {/* Children */}
      <div className="relative z-10">{children}</div>

      {/* Tailwind Styles with Custom Animations */}
      <style jsx>{`
        @tailwind base;
        @tailwind components;
        @tailwind utilities;

        .snow-fall {
          animation: wind-drift ease-in-out infinite;
        }

         @keyframes wind-drift {
          0% {
            transform: translate(-5vh,-100vh, -300vh);
          }
          100% {
            transform: translate(100vw, 300vh);
          }
        }
      `}</style>
    </div>
  );
};

export default StarryNightBackground;
