import React from 'react';

const StarryNightBackground = ({ children }) => {
  const generateStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 0.1 + 0.1,
        delay: Math.random() * 3,
      });
    }
    return stars;
  };

  const generateSnowflakes = (count) => {
    const snowflakes = [];
    for (let i = 0; i < count; i++) {
      snowflakes.push({
        left: `${Math.random() * 100}%`,
        size: Math.random() * 0.3 + 0.2,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 3,
      });
    }
    return snowflakes;
  };

  const stars = generateStars(300); // Increase star count
  const snowflakes = generateSnowflakes(200); // Add snowflakes

  return (
    <div className="relative min-h-screen bg-[#030331] overflow-hidden">
      {/* Pixel Image */}
     <div className="absolute w-full h-full ">
        <img
          src="pixelcut-export-Photoroom.png"
          alt="doogle"
          className="w-full h-auto blur-[5px] opacity-50 filter invert fixed"
        />
      </div>

      {/* Stars */}
      {stars.map((star, index) => (
        <div
          key={`star-${index}`}
          className="absolute bg-white/70 rounded-full star-twinkle"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}rem`,
            height: `${star.size}rem`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {/* Snowflakes */}
      {snowflakes.map((snowflake, index) => (
        <div
          key={`snowflake-${index}`}
          className="absolute bg-white rounded-full snow-fall"
          style={{
            left: snowflake.left,
            width: `${snowflake.size}rem`,
            height: `${snowflake.size}rem`,
            animationDuration: `${snowflake.duration}s`,
            animationDelay: `${snowflake.delay}s`,
          }}
        />
      ))}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to right, rgba(2, 7, 35, 0.9), rgba(0,0, 0, 0.3))`,
        }}
      />

      {/* Children */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default StarryNightBackground;
