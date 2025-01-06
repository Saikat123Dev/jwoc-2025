import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AboutJWoC from "../AboutJWoc";
import InfinityCard from "../InfintyCard";
import { TimelineDemo } from "../TimelineDemo";

gsap.registerPlugin(ScrollTrigger);

const Starvideo = () => {
  const videoContainerRef = useRef(null);
  const initialTextRef = useRef(null);
  const headingRef = useRef(null);
  const buttonRef = useRef(null);
  const contentRef = useRef(null);

  const init = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: videoContainerRef.current,
        start: "top top",
        end: "+=90%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
      },
    });

    // Set initial states
    gsap.set([contentRef.current, headingRef.current, buttonRef.current], {
      opacity: 0,
      y: 100,
    });

    gsap.set(initialTextRef.current, {
      opacity: 1,
      y: 0,
    });

    // Initial text animation
    tl.to(initialTextRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.5,
    });

    // Main content animations
    tl.to(contentRef.current, {
      opacity: 1,
      y: -40,
      duration: 1,
      ease: "power2.out",
    });

    tl.to(
      headingRef.current,
      {
        opacity: 1,
        y: -20,
        duration: 1,
        ease: "power2.out",
      },
      "<+=0.2"
    );

    tl.to(
      buttonRef.current,
      {
        opacity: 1,
        y: -20,
        duration: 1,
        ease: "power2.out",
      },
      "<+=0.2"
    );

    // Pine trees parallax effect
    gsap.to("img", {
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: videoContainerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div>
      <div
        ref={videoContainerRef}
        className="relative h-screen w-full overflow-hidden"
      >
        {/* Initial text that fades out */}
        <div
  ref={initialTextRef}
  className="absolute top-1/3 pt-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-center"
>
  <h1
    className="text-4xl mt-7 sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 font-rubik glow-text"
  >
    JWoC - 2025
  </h1>
  <p className="text-2xl font-bold text-cyan-500 glow-subtext mt-2">
    Season 6
  </p>
  <p className="text-[9px] text-white glow-subtext  ">
     In association with
  </p>
<div className="flex justify-center items-center glow-subtext gap-2">
<img className="w-10 h-5 " src="gdsc.png" alt="GDSC Logo" />
<div>
  <h2 className="text-sm   opacity-70 text-white  font-bold mt-2">
    Google Developer Student Club
  </h2>
 <p className="text-white   text-[9px] opacity-50  gap-2 flex items-center justify-center">

  Jalpaiguri Government Engineering College

</p>
</div>
</div>

  <style jsx>
    {`
      /* Glow animation for main heading */
      @keyframes glow-text {
        0% {
          text-shadow: 0 0 10px rgba(0, 255, 128, 0.6),
                       0 0 20px rgba(0, 255, 128, 0.4);
        }
        50% {
          text-shadow: 0 0 20px rgba(0, 255, 128, 0.8),
                       0 0 30px rgba(0, 128, 255, 0.6),
                       0 0 40px rgba(128, 0, 255, 0.8);
        }
        100% {
          text-shadow: 0 0 10px rgba(0, 255, 128, 0.6),
                       0 0 20px rgba(128, 0, 255, 0.6);
        }
      }

      /* Glow animation for subtexts */
      @keyframes glow-subtext {
        0%, 100% {
          text-shadow: 0 0 8px rgba(0, 255, 255, 0.6);
        }
        50% {
          text-shadow: 0 0 12px rgba(0, 255, 255, 0.8),
                       0 0 18px rgba(128, 0, 255, 0.8);
        }
      }

      .glow-text {
        animation: glow-text 1.5s ease-in-out infinite;
        background: linear-gradient(90deg, #00ff80, #0080ff, #8000ff);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
      }

      .glow-subtext {
        animation: glow-subtext 2s ease-in-out infinite;
      }
    `}
  </style>
</div>


        {/* Rest of your existing content */}

        <div className="absolute bottom-6 pt-5  left-10 w-20 sm:w-28 md:w-40 z-20">
          <img
            className="w-full h-auto object-contain glow-effect transform transition-transform duration-300 hover:scale-110"
            src="pine.png"
            alt="Pine"
          />
        </div>
        {/* ... (rest of your tree images) ... */}
        <div className="absolute top-9 pt-44 sm:pt-64 mt-80 sm:mt-16 right-3 w-20 sm:w-32 md:w-40 z-[9999]">

          <img

            className="w-full h-auto object-contain glow-effect transform transition-transform duration-300 hover:scale-110"

            src="pineTree.png"

            alt="Pine"

          />

        </div>

        <div className="absolute pt-32 sm:pt-64 mt-10 sm:mt-24 right-12 sm:right-24 h-28 w-32 sm:h-56 sm:w-60 z-[9999]">
  <img
    className="w-full h-48 glow-effect transform transition-transform duration-300 hover:scale-110"
    src="trre.png"
    alt="Pine"
  />
  {/* Glowing Light Balls */}
  <div className="absolute top-6 mt-72 left-8 h-4 w-4 bg-yellow-400 rounded-full blur-ball"></div>
  <div className="absolute top-20 mt-72 left-16 h-6 w-6 bg-pink-400 rounded-full blur-ball"></div>
  <div className="absolute top-10 mt-72 right-10 h-5 w-5 bg-blue-400 rounded-full blur-ball"></div>
  <div className="absolute top-6 mt-64 left-9 h-3 w-3 bg-green-400 rounded-full blur-ball"></div>


        </div>

        <div className="absolute pt-32 sm:pt-64 mt-8 sm:mt-24 right-12 sm:right-24 left-24 sm:left-52 h-28 w-32 sm:h-56 sm:w-60 z-50">

          <img

            className="w-full h-48 glow-effect transform transition-transform duration-500 hover:scale-105 filter brightness-90 hover:brightness-110 floating-effect"

            src="deer_v5.svg"

            alt="Deer"

          />

        </div>

        <div className="absolute bottom-0 top-6 w-full h-full z-20">

          <img

            className="w-full h-full object-contain object-bottom glow-effect transform"

            src="deer.webp"

            alt="Deer in Snow"

          />

        </div>
        {/* Content Wrapper */}
        <div
          ref={contentRef}
          className="absolute top-1/4 sm:top-1/3 left-0 w-full h-full z-40 flex flex-col items-center justify-start gap-3 px-4 "
        >
          <h1
            ref={headingRef}
            className="text-2xl sm:text-3xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-400 mb-4 sm:mb-8"
            style={{
              fontFamily: "Jersey, sans-serif", // Apply the Jersey font
              textShadow: "0 0 10px rgba(0, 199, 255, 0.5), 0 0 20px rgba(0, 199, 255, 0.3)",
              opacity: 0.8, // Dim the overall text slightly
            }}
          >
            {/* ᗯEᒪᑕOᗰE TO ᗩ ᗰOᑎTᕼ Oᖴ OᑭEᑎ-ᔕOᑌᖇᑕE */}
            Welcome To A Month Of Open-Source
          </h1>


          <Link
            ref={buttonRef}
            to="/registrationcard"
            className="relative px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold text-sm sm:text-lg rounded-lg shadow-xl transform transition-all duration-300
    hover:scale-110 hover:shadow-lg  hover:text-cyan-200 flex items-center justify-center"
            style={{
              background: "linear-gradient(45deg, #00cc66, #0066cc, #6600cc)", // Dimmed gradient colors
              backgroundSize: "400% 400%",
              animation: "aurora 10s ease infinite",
              boxShadow: "0 0 20px rgba(0, 204, 102, 0.5), 0 0 30px rgba(102, 0, 204, 0.5)",
              filter: "brightness(0.9)", // Dim the brightness
            }}
          >
            <span className="group-hover:text-cyan-300 transition-colors duration-300">
              Register Now
            </span>

            {/* Aurora Gradient Animation */}
            <style jsx>{`
    @keyframes aurora {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

  `}</style>
          </Link>


        </div>
      </div>

      {/* Rest of your components */}
      <div className="z-50 py-4 px-4 sm:mr-4 sm:ml-4">
        <AboutJWoC />
      </div>

      <Particles
        options={{
          particles: {
            color: { value: "#ffffff" },
            number: {
              value: 50,
              density: { enable: true, area: 800 },
            },
            opacity: { value: 1 },
            shape: { type: "circle" },
            size: { value: { min: 2, max: 4 } },
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


      <div className="py-4 px-4 sm:mr-4 sm:ml-4">
        <InfinityCard />
      </div>
      <div className="px-4">
        <TimelineDemo />
      </div>
    </div>
  );
};

export default Starvideo;
