import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AboutJWoC from "../AboutJWoc";
import InfinityCard from "../InfintyCard";
import { TimelineDemo } from "../TimelineDemo";
import Card from "../giftComponent";


gsap.registerPlugin(ScrollTrigger);

const Starvideo = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "I am not a Student of JGEC,can i particicpate?",
      answer: "Yes, you can definitely participate"
    },
    {
      question: "I am a beginner,can i participate?",
      answer: "There is no such restriction but with some amount of development knowledge in any domain will be good to go."
    },
    {
      question: "Can i participate as a team?",
      answer: "No, this is an individual event."
    },
    {
      question: "I don't know Open Source,can i participate?",
      answer: "Then you must participate, because the aim of our event is to get more people into open source development."
    },
    {
      question: "Can I participate both as a mentor and a mentee?",
      answer: "No we don't encourage that."
    },
    {
      question: "What perks will I get?",
      answer: "Let's keep that a secret, but we promise you that you won't be dissapointed."
    }
  ];


  const videoContainerRef = useRef(null);
  const initialTextRef = useRef(null);
  const headingRef = useRef(null);
  const buttonRef = useRef(null);
  const contentRef = useRef(null);

  // const init = useCallback(async (engine) => {
  //   await loadFull(engine);
  // }, []);

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

    gsap.set(initialTextRef.current, {
      opacity: 1,
      y: 0,
    });

    tl.to(initialTextRef.current, {
      opacity: 0,
      y: -50,
      duration: 0.5,
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

        <div
  ref={initialTextRef}
  className="absolute md:top-1/3  xl:top-[16rem] pt-10  left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 text-center"
>
  <h1
    className="text-4xl xl:text-9xl mt-5 sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-600 font-rubik glow-text"
  >
    JWoC - 2025
  </h1>
  <p className="text-2xl xl:text-5xl xl:pt-2 font-bold text-cyan-500 glow-subtext mt-2">
    Season 6
  </p>
  <p className="text-[9px] xl:text-[15px] text-white glow-subtext  ">
     In association with
  </p>
<div className="flex justify-center items-center glow-subtext gap-2">
<img className="w-10 h-5 " src="gdsc.png" alt="GDSC Logo" />
<div>
  <h2 className="text-sm xl:text-xl   opacity-70 text-white  font-bold mt-2">
    Google Developer Student Club
  </h2>
 <p className="text-white xl:text-[15px]  text-[9px] opacity-50  gap-2 flex items-center justify-center">

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




        {/* ... (rest of your tree images) ... */}
        {/* <div className=" md:block absolute top-9 pt-44 sm:pt-64 mt-80 sm:mt-16 right-3 w-20 xl:pt-80 xl:mt-80 xl:h-[40rem] xl:w-[40rem] sm:w-32 md:w-40 z-[9999]">
  <img
    className="h-full w-full xl:pl-36 xl:ml-44 object-contain glow-effect transform transition-transform duration-300 hover:scale-110"
    src="pineTree.png"
    alt="Pine"
  />
</div> */}





        {/* <div className="hidden md:block absolute xl:h-[20rem] xl:w-[20rem] xl:pt-[36rem] xl:mt-24 sm:pt-64 mt-8 xl:left-96 sm:mt-24 right-12 sm:right-24 xl:bottom-80 left-24 sm:left-52 h-28 w-32 sm:h-56 sm:w-60 z-50">
  <img
    className="w-full h-48 xl:pb-24 xl:w-full xl:h-[25rem] glow-effect transform transition-transform duration-500 hover:scale-105 filter brightness-90 hover:brightness-110 floating-effect"
    src="deer_v5.svg"
    alt="Deer"
  />
</div> */}



<div className="absolute inset-0 top-32 z-0">
          <div className="relative w-full glow-effect h-full">

            <img
              src="jwoc_v1.svg"
              alt="Winter Scene"
              className="w-full h-[calc(100vh-8rem)] object-cover object-center"
              style={{
                maxHeight: 'calc(100vh - 8rem)',
                marginTop: '2rem'
              }}
            />
          </div>
        </div>
        {/* Content Wrapper */}
        <div
  ref={contentRef}
  className="absolute top-1/4 sm:top-1/3 left-0 w-full h-full z-50 flex flex-col items-center justify-start gap-3 px-4"
>
  <h1
    ref={headingRef}
    className="text-2xl sm:text-3xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-cyan-400 mb-4 sm:mb-8"
    style={{
      fontFamily: "Jersey, sans-serif",
      textShadow: "0 0 10px rgba(0, 199, 255, 0.5), 0 0 20px rgba(0, 199, 255, 0.3)",
      opacity: 0.8,
    }}
  >
    Welcome To A Month Of Open-Source
  </h1>

  <Link
    to="/registrationcard"
    className="relative px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold text-sm sm:text-lg rounded-lg shadow-xl transform transition-all duration-300 hover:scale-110 hover:shadow-lg hover:text-cyan-200 flex items-center justify-center z-50"
    style={{
      background: "linear-gradient(45deg, #00cc66, #0066cc, #6600cc)",
      backgroundSize: "400% 400%",
      animation: "aurora 10s ease infinite",
      boxShadow: "0 0 20px rgba(0, 204, 102, 0.5), 0 0 30px rgba(102, 0, 204, 0.5)",
      filter: "brightness(0.9)",
    }}
  >
    <span className="group-hover:text-cyan-300 transition-colors duration-300">
      Register Now
    </span>
  </Link>
</div>
      </div>

      <div className="z-50 py-4 px-4 sm:mr-4 sm:ml-4">
        <AboutJWoC />
      </div>

      {/* <Particles
        options={{
          particles: {
            color: { value: "#ffffff" },
            number: {
              value: 10,
              density: { enable: true, area: 500 },
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
      /> */}

      <div className="py-4 px-4 sm:mr-4 sm:ml-4">
        <InfinityCard />
      </div>
      <div className="px-4">
        <TimelineDemo />
      </div>
      <div>
        <Card/>
      </div>
      <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>

      {faqs.map((faq, index) => (

        <div
          key={index}
          className="border rounded-lg overflow-hidden"
        >
          <button
            className="w-full p-4 text-left hover:bg-gray-50 flex justify-between items-center"
            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
          >
            <span className="font-medium">{faq.question}</span>
            <span className="ml-6 transform transition-transform duration-200">
              {activeIndex === index ? '−' : '+'}
            </span>
          </button>

          <div
            className={`overflow-hidden transition-all duration-200 ${
              activeIndex === index ? 'max-h-40 p-4' : 'max-h-0'
            }`}
          >
            <p className="text-gray-200">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>

    </div>
  )
}

export default Starvideo;
