import React, { useState, useEffect, useCallback } from "react";
import star from "../../assets/videos/star.mp4"; // Background video
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const BackgroundVideo = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const init = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // GSAP animation for the heading with ScrollTrigger
  useEffect(() => {
    gsap.fromTo(
      ".heading", // Targeting the class of the heading
      {
        y: 200, // Start position off-screen
        opacity: 0, // Start as invisible
        scale: 0.8, // Start slightly smaller
      },
      {
        y: 0, // Move to its final position
        opacity: 1, // Fade in
        scale: 1, // Scale to original size
        duration: 2, // Duration of the animation
        ease: "power4.out", // Smooth easing for a fluid effect
        scrollTrigger: {
          trigger: ".heading", // Trigger the animation when the element comes into view
          start: "top 80%", // Start the animation when the top of the element reaches 80% of the viewport height
          end: "bottom top", // End the animation when the bottom of the element reaches the top of the viewport
          scrub: 0.5, // Scrub value to tie the animation directly to the scroll position (smooth)
          markers: false, // Disable markers (can be enabled for debugging)
          toggleActions: "play none none none", // Ensures the animation only plays when entering the viewport
        },
      }
    );
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Full-Screen Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={star}
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

      {/* Deer Image with Transparent Background */}
      <div className="absolute bottom-0 w-full h-1/2 z-20">
        <img
          className="w-full h-full object-cover"
          src="deer.webp" // Image with transparent background
          alt="Deer in Snow"
        />
      </div>

      {/* Overlay Content with Parallax Heading */}
      <div className="absolute top-0 left-0 w-full h-full z-30 flex items-center justify-center">
        <h1
          className="heading text-white text-4xl md:text-6xl font-bold text-center"
        >
          Welcome to Our Platform
        </h1>
      </div>
    </div>
  );
};

export default BackgroundVideo;
