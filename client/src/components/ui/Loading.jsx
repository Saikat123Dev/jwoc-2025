import React, { useEffect, useState } from "react";

const LoadingScreen = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {

    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(visibilityTimer);
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-cover bg-center bg-black" style={{ backgroundImage: `url('../../public/pixelcut-export-Photoroom.png')` }}
    >
      <div className="absolute inset-0 opacity-50 -z-50" style={{
        background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(0,60,25,1) 35%, rgba(5,9,41,1) 100%)',
      }}></div>
       <div className="absolute inset-0 opacity-60 bg-black -z-50"></div>
      <img
        src="jwoc-2024.svg"
        alt="Loading Screen"
        className={`max-w-[20%] max-h-[20vh] object-contain transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'
          }`}
      />
    </div>
  );

};

export default LoadingScreen;
