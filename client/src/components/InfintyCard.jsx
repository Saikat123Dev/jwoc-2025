import React, { useEffect, useState, useRef } from 'react';

const CardForScrolling = () => {
    return (
        <div className="bg-black h-[25vh] w-[22vh] shrink-0 rounded-xl shadow-lg mx-4 p-4">
            {/* Card content can go here */}
        </div>
    );
};

const InfinityCard = () => {
    const containerRef = useRef(null);
    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollRef = useRef({
        lastTimestamp: 0,
        speed: 0.3 // pixels per millisecond
    });

    useEffect(() => {
        const scrollContainer = containerRef.current;
        if (!scrollContainer) return;

        const singleSetWidth = scrollContainer.children[0].offsetWidth;
        
        const animate = (timestamp) => {
            if (!scrollRef.current.lastTimestamp) {
                scrollRef.current.lastTimestamp = timestamp;
            }

            // Calculate time elapsed since last frame
            const deltaTime = timestamp - scrollRef.current.lastTimestamp;
            
            // Update position based on time elapsed and speed
            setScrollPosition(prev => {
                const newPosition = prev + (deltaTime * scrollRef.current.speed);
                return newPosition >= singleSetWidth ? 0 : newPosition;
            });

            scrollRef.current.lastTimestamp = timestamp;
            animationRef.current = requestAnimationFrame(animate);
        };

        const animationRef = { current: requestAnimationFrame(animate) };

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    const cardSet = (
        <div className="flex">
            <CardForScrolling/>
            <CardForScrolling/>
            <CardForScrolling />
            <CardForScrolling />
            <CardForScrolling />
        </div>
    );

    return (
     <div className=''>
           <div className="relative inline-block text-center mt-7 flex-col justify-center ml-[79vh]">
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 blur-lg"></span>
          <h1 className="relative font-extrabold font-rubik text-4xl sm:text-6xl text-white">
          OUTREACH
          </h1>
        </div>
        <div className="bg-white h-[30vh] overflow-hidden relative my-8 px-6 py-4 shadow-md rounded-lg">
           
            <div 
                ref={containerRef}
                className="flex absolute"
                style={{ 
                    transform: `translateX(-${scrollPosition}px)`,
                    transition: scrollPosition === 0 ? 'none' : 'transform 0.1s linear'
                }}
            >
                {cardSet}
                {cardSet}
                {cardSet}
            </div>
        </div>
     </div>
    );
};

export default InfinityCard;