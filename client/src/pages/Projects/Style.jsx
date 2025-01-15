import React from 'react';
import Snowfall from 'react-snowfall';
const StarryNightBackground = ({ children }) => {

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


      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to right, rgba(2, 7, 35, 0.9), rgba(0,70, 0, 0.3))`,
        }}
      />
         <Snowfall
        snowflakeCount={250}
        style={{
          zIndex: 5,
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}

        wind={[0, 1]} // Subtle wind effect
        radius={[1, 3]} // Varying snowflake sizes
        speed={[0.5, 2]} // Varying falling speeds
      />
      {/* Children */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default StarryNightBackground;
