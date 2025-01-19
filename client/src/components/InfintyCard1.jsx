import React from 'react';
import Marquee from 'react-fast-marquee';

const InfinityCard = () => {
  const imageArray = [
    'eventsInfo.jpg',
    'devfolio_1.jpeg',
    'IIITA.GDSC.png',
    'IITK.GDSC.jpg',
    'NITG.GDSC.jpg',
    'ProElevate.png',
  ];

  // Repeat images to ensure seamless scrolling
  const repeatedImages = [...imageArray, ...imageArray];

  return (
    <div className="relative w-full max-w-full overflow-hidden">
      <div className="text-center py-4 sm:py-6">

        <h1 className="font-extrabold font-rubik text-xl sm:text-3xl lg:text-5xl text-white">
          Community Partners
        </h1>
      </div>

      <div className="w-full">
        <Marquee
          speed={40}
          gradient={false}
          direction="left"
          className="flex items-center"
        >
          {repeatedImages.map((image, index) => (
            <div key={index} className="mx-2 sm:mx-4">
              <img
                src={image}
                alt={`Community Partner ${index + 1}`}
                className="h-28 w-28 lg:mx-2  sm:h-28 sm:w-28 lg:h-36 lg:w-36
                  rounded-lg object-contain
                  opacity-75 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default InfinityCard;
