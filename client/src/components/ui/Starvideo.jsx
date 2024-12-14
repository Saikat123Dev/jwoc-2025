import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import React, { useCallback, useEffect, useRef } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import starVideo from "../../assets/videos/star.mp4";
import AboutJWoC from "../AboutJWoc";
gsap.registerPlugin(ScrollTrigger);

const BackgroundVideo = () => {
  const videoContainerRef = useRef(null);
  const headingRef = useRef(null);

  const init = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  useEffect(() => {
    // Create a ScrollTrigger to pin the video container
    const pinTrigger = ScrollTrigger.create({
      trigger: videoContainerRef.current,
      start: "top top",
      end: "+=100%", // Pin for the height of one viewport
      pin: true,
      pinSpacing: true,
    });

    // Animate the heading
    gsap.fromTo(
      headingRef.current,
      {
        y: 400, // Start position below
        opacity: 0, // Start invisible
        scale: 0.8, // Start smaller
      },
      {
        y: 0, // Move to final position
        opacity: 1, // Fade in
        scale: 1, // Scale to original size
        duration: 3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          end: "bottom top",
          scrub: 0.5,
          markers: false,
        },
      }
    );

    // Cleanup function
    return () => {
      pinTrigger.kill(); // Remove the ScrollTrigger when component unmounts
    };
  }, []);

  return (
    <div>
    <div
      ref={videoContainerRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Full-Screen Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={starVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Snowfall Particles */}
      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
        <Particles
          options={{
            particles: {
              color: {
                value: "#ffffff", // Bright white color for snow
              },
              number: {
                value: 100, // Dense snowfall
                density: {
                  enable: true,
                  area: 800,
                },
              },
              opacity: {
                value: 1, // Bright and noticeable snow
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 2, max: 4 }, // Larger particles for brightness
              },
              move: {
                direction: "up", // Snowfall direction
                enable: true,
                speed: { min: 1, max: 2 }, // Smooth movement
                straight: false,
              },
            },
          }}
          init={init}
        />
      </div>

      {/* Deer Image Covering Full Screen */}
      <div className="absolute bottom-0 w-full h-full z-20">
        <img
          className="w-full h-full object-contain object-bottom"
          src="deer.webp"
          alt="Deer in Snow"
        />
      </div>

      {/* Pine Tree Overlay in the Middle */}
      {/* <div className="absolute bottom-0 w-full h-full z-30 flex items-center justify-center">
        <img
          className="w-1/2 max-w-[500px] object-contain"
          src="pineTree.webp"
          alt="Pine Tree"
        />
      </div> */}

      {/* Overlay Content with Animated Heading */}
      <div className="absolute top-0 left-0 w-full h-full z-40 flex items-center justify-center">
        <h1
          ref={headingRef}
          className="text-white text-4xl md:text-6xl font-bold text-center"
        >
          Welcome to Our Platform
        </h1>
      </div>
    </div>
  <div className="py-4 mr-4 ml-4"><AboutJWoC/></div>
    </div>
  );
};

export default BackgroundVideo;