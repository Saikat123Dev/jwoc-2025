import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';

const InfinityCard2 = () => {
  const [speed, setSpeed] = useState(50);

  // Replace with your actual image URLs or paths
  const originalImages = [
    'LWT.Academy.jpeg',
    'GiveMYCertificate.png',
    'InterviewBit.png',
  ];

  // Repeat the cards multiple times to fill the marquee
  const repeatedImages = [...originalImages, ...originalImages, ...originalImages];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSpeed(30); // Slow speed for smaller screens
      } else if (window.innerWidth < 1024) {
        setSpeed(40); // Medium speed for tablets
      } else {
        setSpeed(50); // Fast speed for larger screens
      }
    };

    // Set initial speed
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full overflow-x-hidden px-4 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="text-center mt-4 sm:mt-7 mb-6 sm:mb-11">
        <h1 className="font-extrabold font-rubik text-3xl sm:text-4xl lg:text-6xl text-white">
          SPONSORS
        </h1>
      </div>

      {/* Infinite Scrolling Cards */}
      <Marquee speed={speed} gradient={false} direction="right" className="w-full">
        {repeatedImages.map((image, index) => (
          <div
            key={index}
            className="mx-4 flex-shrink-0 rounded-lg overflow-hidden transition-transform transform "
          >
            <img
              src={image}
              alt={`Sponsor ${index + 1}`}
              className="h-[25vh] w-[25vh] sm:h-[20vh] sm:w-[20vh] lg:h-[25vh] lg:w-[25vh]
                object-cover opacity-65  "
            />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default InfinityCard2;
