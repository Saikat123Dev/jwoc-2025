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
      className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-black via-[#1a0540] to-[#0b0035] overflow-hidden relative"
      onMouseMove={handleMouseMove}
    >
      {/* Aurora Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-800 via-purple-500 to-transparent opacity-30 blur-3xl animate-[move_10s_linear_infinite]"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-r from-teal-800 via-blue-500 to-transparent opacity-30 blur-3xl animate-[move_10s_linear_infinite_reverse]"></div>

      <div
        ref={leaderboardRef}
        className="relative w-[90%] h-[80%] flex items-center justify-center [transform-style:preserve-3d] [perspective:1000px] transition-transform duration-500 ease-out hover:scale-105"
      >
        {/* Left Card */}
        <div className="w-[20%] h-full inset-y-0 bg-white bg-opacity-10 rounded-lg shadow-[5px_5px_15px_rgba(0,0,0,0.6),_10px_10px_20px_rgba(0,0,0,0.2),_inset_-5px_-5px_10px_rgba(255,255,255,0.1)] backdrop-blur-lg flex items-center justify-center font-bold text-white text-3xl transform origin-top-right skew-y-[-15deg] scale-y-[1] translate-x-[-100px] translate-z-[100px] [rotate-y:35deg] transition-transform duration-500 ease-out hover:translate-z-[150px] hover:skew-y-[-5deg] hover:scale-[1.05]">
          Left Card
        </div>

        {/* Back Card */}
        <div className="w-[35%] h-full inset-0 bg-white bg-opacity-10 rounded-lg shadow-[5px_5px_15px_rgba(0,0,0,0.7),_10px_10px_25px_rgba(0,0,0,0.3)] backdrop-blur-lg flex items-center justify-center font-bold text-white text-3xl transform scale-[0.9] -translate-z-[300px] transition-transform duration-500 ease-out hover:translate-z-[0] hover:rotate-y-[10deg] hover:scale-[1.1]">
          Back Card
        </div>

        {/* Right Card */}
        <div className="w-[20%] h-full inset-y-0 bg-white bg-opacity-10 rounded-lg shadow-[5px_5px_15px_rgba(0,0,0,0.6),_10px_10px_20px_rgba(0,0,0,0.2),_inset_-5px_-5px_10px_rgba(255,255,255,0.1)] backdrop-blur-lg flex items-center justify-center font-bold text-white text-3xl transform origin-top-left skew-y-[15deg] scale-y-[1] translate-x-[100px] translate-z-[100px] [rotate-y:-35deg] transition-transform duration-500 ease-out hover:translate-z-[150px] hover:skew-y-[5deg] hover:scale-[1.05]">
          Right Card
        </div>
      </div>
    </div>
  );
};

export default App;
