import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

const EnhancedSnowTransition = () => {
  const transitionRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(transitionRef.current,
      {
        y: 100,
        opacity: 0.5
      },
      {
        y: -50,
        opacity: 1,
        scrollTrigger: {
          trigger: transitionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1.5,
          toggleActions: "play reverse play reverse"
        }
      }
    );
  }, []);

  return (
    <div ref={transitionRef} className="relative -mt-32 h-[120vh] w-full overflow-hidden">
      {/* Main gradient container */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#e0f2fe] to-[#1e3a8a]">
        {/* Wavy snow section */}
        <div
          className="absolute top-0 left-0 w-full h-64 bg-white transform-gpu"
          style={{
            maskImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 40 C 25 60 75 20 100 40 L 100 0 L 0 0 Z\" fill=\"black\"/></svg>')",
            WebkitMaskImage: "url('data:image/svg+xml;utf8,<svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 40 C 25 60 75 20 100 40 L 100 0 L 0 0 Z\" fill=\"black\"/></svg>')"
          }}
        >
          {/* Snow texture overlay */}
          <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] bg-[length:8px_8px]" />
        </div>

        {/* Enhanced snow particles */}
        <div className="absolute inset-0">
          {/* Large particles */}
          <div className="absolute inset-0 animate-snow-large"
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.95) 2px, transparent 2px)',
              backgroundSize: '32px 32px'
            }}
          />
          {/* Medium particles */}
          <div className="absolute inset-0 animate-snow-medium"
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.85) 1.5px, transparent 1.5px)',
              backgroundSize: '24px 24px'
            }}
          />
          {/* Small particles */}
          <div className="absolute inset-0 animate-snow-small"
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(255,255,255,0.75) 1px, transparent 1px)',
              backgroundSize: '16px 16px'
            }}
          />
        </div>

        {/* Aurora effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 animate-aurora bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-200" />
        </div>

        {/* Sparkle overlay */}
        <div className="absolute inset-0 animate-sparkle mix-blend-overlay opacity-50 bg-[radial-gradient(circle_at_center,_white_0.5px,_transparent_0.5px)] bg-[length:12px_12px]" />
      </div>

      <style jsx>{`
        @keyframes snow-large {
          0% { transform: translateY(-5%) translateX(-2%); }
          100% { transform: translateY(105%) translateX(2%); }
        }
        @keyframes snow-medium {
          0% { transform: translateY(-10%) translateX(2%); }
          100% { transform: translateY(110%) translateX(-2%); }
        }
        @keyframes snow-small {
          0% { transform: translateY(-15%) translateX(-1%); }
          100% { transform: translateY(115%) translateX(1%); }
        }
        @keyframes aurora {
          0% { transform: translateX(-25%) skewX(-15deg); opacity: 0.3; }
          50% { transform: translateX(25%) skewX(15deg); opacity: 0.6; }
          100% { transform: translateX(-25%) skewX(-15deg); opacity: 0.3; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.5; }
        }
        .animate-snow-large {
          animation: snow-large 12s linear infinite;
        }
        .animate-snow-medium {
          animation: snow-medium 16s linear infinite;
        }
        .animate-snow-small {
          animation: snow-small 20s linear infinite;
        }
        .animate-aurora {
          animation: aurora 20s ease-in-out infinite;
        }
        .animate-sparkle {
          animation: sparkle 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default EnhancedSnowTransition;
