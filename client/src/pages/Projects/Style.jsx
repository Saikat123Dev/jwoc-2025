import React from 'react';

const StarryNightBackground = ({ children }) => {
  const generateStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      stars.push({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 0.1 + 0.1, 
        delay: Math.random() * 3
      });
    }
    return stars;
  };

  const stars = generateStars(150); 

  return (
    <div className="relative min-h-screen bg-[#0F1C3F] overflow-hidden">
      {stars.map((star, index) => (
        <div
          key={index}
          className="absolute bg-white/70 rounded-full star-twinkle"
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}rem`,
            height: `${star.size}rem`,
            animationDelay: `${star.delay}s`
          }}
        />
      ))}
      
  
      <div className="relative z-10">
        {children}
      </div>
      
     
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F1C3F]/30 to-[#0F1C3F]/50 pointer-events-none" />
    </div>
  );
};

export default StarryNightBackground;