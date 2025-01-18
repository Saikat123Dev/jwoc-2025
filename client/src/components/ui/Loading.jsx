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

    <div className="fixed inset-0  flex items-center justify-center "

    >
      <img
        src="jwoc-2024.svg"
        alt="Loading Screen"
        className={`max-w-[20%] max-h-[20vh] object-contain transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>

  );
};

export default LoadingScreen;
