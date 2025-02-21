import React from 'react';

const Sponsors = () => {
  const imageArray = [
      'tuf.jpg',
    'LWT.Academy.jpeg',
    'InterviewBit.png',
    'GiveMYCertificate.png'


  ];

  return (
    <div className="w-screen pt-16 h-screen px-4 sm:px-6 lg:px-8">
      <div className="text-center mt-4 sm:mt-7 mb-6 sm:mb-11">
        <h1 className="font-extrabold font-rubik text-3xl sm:text-4xl lg:text-6xl text-white">
          SPONSORS
        </h1>
      </div>
      <div className="min-w-full min-h-screen">
        {/* Adjust flex direction based on screen size */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 lg:gap-8">
          {imageArray.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Sponsor ${index + 1}`}
              className="h-[20vh] w-[50vw] sm:h-[30vh] sm:w-[30vw] lg:h-[30vh] lg:w-[20vw] rounded-lg object-cover opacity-70 transition-opacity duration-300 hover:opacity-100"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
