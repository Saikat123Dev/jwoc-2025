import React, { useState, useEffect, useRef } from 'react';

const InfinityCard = () => {
    const [key, setKey] = useState(0);
    const scrollRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    
    const imageArray = [
        'eventsInfo.jpg',
        'Devfolio.png',
        'IIITA.GDSC.png',
        'IITK.GDSC.jpg',
        'NITG.GDSC.jpg',
        'ProElevate.png',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setKey(prevKey => prevKey + 1);
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    const calculateSpeed = () => {
        if (window.innerWidth < 640) return 0.3; // Slower speed for mobile
        if (window.innerWidth < 1024) return 0.5;
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
                const newPosition = prev + speed;
                if (scrollRef.current) {
                    const containerWidth = scrollRef.current.scrollWidth / 3;
                    return newPosition >= containerWidth ? 0 : newPosition;
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
        <div className="w-full overflow-x-hidden px-2 sm:px-6 lg:px-8">
            <div className="relative text-center mt-4 sm:mt-7 mb-4 sm:mb-11">
            <span className="absolute left-1/2 transform -translate-x-1/2 
                    w-[80vw] lg:w-[43vw] h-10 lg:h-[5vw]
                    bg-gradient-to-r from-blue-500 to-indigo-500 blur-lg opacity-80"></span>
                    <h1 className="relative font-extrabold font-rubik 
                    text-2xl sm:text-4xl lg:text-6xl text-white
                    px-4 sm:px-6 py-2 sm:py-4">
                    Community Partners
                </h1>
            </div>
            <div className="w-full overflow-hidden">
                <div className="relative w-full h-[20vh] sm:h-[30vh] lg:h-[35vh]">
                    <div
                        ref={scrollRef}
                        key={key}
                        className="flex"
                        style={{
                            whiteSpace: 'nowrap',
                            transform: `translateX(-${scrollPosition}px)`,
                        }}
                    >
                        {[...imageArray, ...imageArray, ...imageArray].map((image, index) => (
                            <img
                                key={`${index}-${key}`}
                                src={image}
                                alt={`Image ${index + 1}`}
                                className="h-[15vh] w-[15vh] sm:h-[25vh] sm:w-[25vh] lg:h-[30vh] lg:w-[30vh] 
                                    mx-2 sm:mx-4 lg:mx-6 
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

export default InfinityCard;