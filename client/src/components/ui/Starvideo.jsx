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

    gsap.set([contentRef.current, headingRef.current, buttonRef.current], {
      opacity: 0,
      y: 100,
    });

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
        {/* Pine tree images */}
        <div className="absolute bottom-10 left-10 w-20 sm:w-28 md:w-40 z-20">
          <img
            className="w-full h-auto object-contain glow-effect transform transition-transform duration-300 hover:scale-110"
            src="pine.png"
            alt="Pine"
          />
        </div>
        <div className="absolute pt-32 sm:pt-64 mt-8 sm:mt-16 right-3 w-20 sm:w-32 md:w-40 z-[9999]">
          <img
            className="w-full h-auto object-contain glow-effect transform transition-transform duration-300 hover:scale-110"
            src="pineTree.png"
            alt="Pine"
          />
        </div>
        <div className="absolute pt-32 sm:pt-64 mt-8 sm:mt-24 right-12 sm:right-24 h-28 w-32 sm:h-56 sm:w-60 z-[9999]">
          <img
            className="w-full h-48 glow-effect transform transition-transform duration-300 hover:scale-110"
            src="trre.png"
            alt="Pine"
          />
        </div>
        <div className="absolute pt-32 sm:pt-64 mt-8 sm:mt-24 right-12 sm:right-24 left-24 sm:left-52 h-28 w-32 sm:h-56 sm:w-60 z-50">
          <img
            className="w-full h-48 glow-effect transform transition-transform duration-300 hover:scale-110 filter brightness-75"
            src="deer_v5.png"
            alt="Deer"
          />
        </div>

        {/* Main deer image */}
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
          className="absolute top-1/4 sm:top-1/3 left-0 w-full h-full z-40 flex flex-col items-center justify-start gap-3 px-4"
        >
          <h1
            ref={headingRef}
            className="text-2xl sm:text-3xl md:text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-500 mb-4 sm:mb-8"
            style={{
              textShadow:
                "0 0 15px rgba(0, 199, 255, 0.8), 0 0 30px rgba(0, 199, 255, 0.5)",
            }}
          >
            ᗯEᒪᑕOᗰE TO ᗩ ᗰOᑎTᕼ Oᖴ OᑭEᑎ-ᔕOᑌᖇᑕE
          </h1>

          <Link
            ref={buttonRef}
            to="/registrationcard"
            className="relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold text-sm sm:text-lg rounded-lg shadow-xl transform transition-all duration-300
            hover:scale-110 hover:shadow-purple-500/50 flex items-center justify-center"
            style={{
              boxShadow:
                "0 0 20px rgba(139, 92, 246, 0.8), 0 0 30px rgba(236, 72, 153, 0.8)",
            }}
          >
            Register Now
          </Link>
        </div>
      </div>

      <div className="z-50 py-4 px-4 sm:mr-4 sm:ml-4">
        <AboutJWoC />
      </div>

      <Particles
        options={{
          particles: {
            color: { value: "#ffffff" },
            number: {
              value: 100,
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
