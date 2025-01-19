import React, { useState, useEffect, useRef } from 'react';

const InfinityCard2 = () => {
    const [key, setKey] = useState(0);
    const scrollRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    
    const imageArray = [
        'LWT.Academy.jpeg',
        'GiveMYCertificate.png',
        'InterviewBit.png',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setKey(prevKey => prevKey + 1);
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const calculateSpeed = () => {
        if (window.innerWidth < 640) return 0.5; 
        if (window.innerWidth < 1024) return 0.7;
        return 0.9;
    };

    useEffect(() => {
        let animationFrameId;
        let speed = calculateSpeed();

        const handleResize = () => {
            speed = calculateSpeed();
        };

        window.addEventListener('resize', handleResize);

        const animate = () => {
            setScrollPosition(prev => {
                const newPosition = prev - speed; // Scroll from left to right
                if (scrollRef.current) {
                    const containerWidth = scrollRef.current.scrollWidth / 3; // Width of one set of images
                    // When the scroll reaches the start of the duplicated set, reset to the end of the first set
                    if (newPosition <= -containerWidth) {
                        return 0;
                    }
                }
                return newPosition;
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="w-full overflow-x-hidden px-4 sm:px-6 lg:px-8">
            <div className="relative text-center mt-4 sm:mt-7 mb-6 sm:mb-11">
                <span className="absolute left-1/2 transform -translate-x-1/2 
                    w-[39vw] lg:w-[24vw] h-10 lg:h-[5vw]
                    bg-gradient-to-r from-blue-500 to-indigo-500 blur-lg opacity-80"></span>
                <h1 className="relative font-extrabold font-rubik 
                    text-3xl sm:text-4xl lg:text-6xl text-white
                    px-4 sm:px-6 py-2 sm:py-4">
                  SPONSORS
                </h1>
            </div>
            <div className="w-full overflow-hidden">
                <div className="relative w-full h-[25vh] sm:h-[30vh] lg:h-[35vh]">
                    <div
                        ref={scrollRef}
                        key={key}
                        className="flex"
                        style={{
                            whiteSpace: 'nowrap',
                            transform: `translateX(${scrollPosition}px)`, // Scroll from left to right
                        }}
                    >
                        {[...imageArray, ...imageArray, ...imageArray].map((image, index) => (
                            <img
                                key={`${index}-${key}`}
                                src={image}
                                alt={`Image ${index + 1}`}
                                className="h-[20vh] w-[20vh] sm:h-[25vh] sm:w-[25vh] lg:h-[30vh] lg:w-[30vh] 
                                    mx-3 sm:mx-4 lg:mx-6 
                                    rounded-lg object-cover 
                                    transition-all duration-300
                                    hover:scale-105 hover:shadow-xl
                                    shadow-md sm:shadow-lg"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InfinityCard2;