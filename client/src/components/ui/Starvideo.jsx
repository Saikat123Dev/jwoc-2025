import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AboutJWoC from "../AboutJWoc";
import InfinityCard from "../InfintyCard";
import TimelineDemo from "../TimelineDemo";
// import auroraVideo from "../../assets/videos/aurora.mp4";

gsap.registerPlugin(ScrollTrigger);

const Starvideo = () => {
  const videoContainerRef = useRef(null);
  const headingRef = useRef(null);
  const buttonRef = useRef(null);
  const contentRef = useRef(null);

  const init = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  useEffect(() => {
    // Create a timeline for smoother animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: videoContainerRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        scrub: 1, // Smooth scrubbing effect
        toggleActions: "play reverse play reverse", // Controls the animation on scroll up/down
      },
    });

    // Initial state for the content wrapper
    gsap.set(contentRef.current, {
      opacity: 0,
      y: 100,
    });

    // Animate the content wrapper
    tl.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power2.out",
    });

    // Animate heading with a slight delay and different movement
    gsap.fromTo(
      headingRef.current,
      {
        y: 200,
        opacity: 0,
        scale: 0.9,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          end: "center 30%",
          scrub: 1.5,
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Animate button with a follow-up movement
    gsap.fromTo(
      buttonRef.current,
      {
        y: 100,
        opacity: 0,
        scale: 0.8,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: buttonRef.current,
          start: "top 85%",
          end: "center 35%",
          scrub: 2,
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Create a parallax effect for the deer image
    gsap.to("img", {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: videoContainerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 2,
      },
    });

    return () => {
      // Cleanup all ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div>
    <div
    ref={videoContainerRef}
    className="relative h-screen w-full overflow-hidden"
  >
    {/* Snowfall Particles */}
   {/* Pine Image with Glow */}
<div className="absolute bottom-10 left-10 w-40 z-20">
  <img
    className="w-full h-auto object-contain glow-effect transform transition-transform duration-300 hover:scale-110"
    src="pine.png"
    alt="Pine"
  />
</div>

    <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
      <Particles
        options={{
          particles: {
            color: {
              value: "#ffffff",
            },
            number: {
              value: 100,
              density: {
                enable: true,
                area: 800,
              },
            },
            opacity: {
              value: 1,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 2, max: 4 },
            },
            move: {
              direction: "up",
              enable: true,
              speed: { min: 1, max: 2 },
              straight: false,
            },
          },
        }}
        init={init}
      />
    </div>

    {/* Pine Image with Glow */}


    {/* Deer Image with Parallax */}
    <div className="absolute bottom-0 w-full h-full z-20">
  <img
    className="w-full h-full object-contain object-bottom glow-effect transform"
    src="deer.webp"
    alt="Deer in Snow"
  />
</div>


    {/* Content Wrapper */}
    <div
      ref={contentRef}
      className="absolute top-0 left-0 w-full h-full z-40 flex flex-col items-center justify-center"
    >
     <h1
  ref={headingRef}
  className="text-4xl md:text-6xl font-bold text-center text-white mb-8 glowing-text"
>
  Welcome to a month of open-source
</h1>

      <button
        ref={buttonRef}
        className="relative px-8 py-4 bg-gradient-to-r from-blue-600/80 to-indigo-700/80 text-white font-semibold text-lg rounded-lg shadow-lg transform transition-all duration-300
                    hover:scale-105 hover:shadow-indigo-500/50 group flex items-center justify-center overflow-hidden glowing-button"
      >
        <span className="relative z-10">Register Now</span>
      </button>
    </div>

  </div>
  <div className="py-4 mr-4 ml-4"><AboutJWoC/></div>
  <div className="py-4 mr-4 ml-4"><InfinityCard/></div>
  <div>
    <TimelineDemo/>
  </div>
  </div>
  );
};

export default Starvideo;
