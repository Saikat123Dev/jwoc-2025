import React, { useRef } from "react";

const App = () => {
  const leaderboardRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX: x, clientY: y } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const rotateX = (y - centerY) / 50;
    const rotateY = (centerX - x) / 50;

    if (leaderboardRef.current) {
      leaderboardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  return (
    <div
      className="h-screen w-sc flex items-center justify-center bg-gradient-to-br from-[#3B1578] to-[#B6116B] overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div
        ref={leaderboardRef}
        className="relative w-[600px] h-[400px] [transform-style:preserve-3d] [perspective:1000px]"
      >
        <div className="absolute w-[200px] h-[300px] bg-white rounded-lg shadow-lg flex items-center justify-center font-bold text-gray-800 transform scale-[0.9] -translate-z-[200px]">
          Back Card
        </div>
        <div className="absolute w-[200px] h-[300px] bg-white rounded-lg shadow-lg flex items-center justify-center font-bold text-gray-800 transform -translate-x-[220px] translate-z-[80px] [rotate-y:35deg] [skew-y:-10deg]">
          Left Card
        </div>
        <div className="absolute w-[200px] h-[300px] bg-white rounded-lg shadow-lg flex items-center justify-center font-bold text-gray-800 transform translate-x-[220px] translate-z-[80px] [rotate-y:-35deg] [skew-y:10deg]">
          Right Card
        </div>
      </div>
    </div>
  );
};

export default App;
