import { motion } from "framer-motion";
import React from "react";

const PrizeCards = () => {
  return (
    <>
      <section id="rewards" className="text-white max-w-6xl mx-auto px-4 py-10">
        {/* Heading */}
        <div className="text-center mb-8">
          <div className="relative inline-block">

            <span className="absolute  inset-0  h-10 mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 blur-lg"></span>
            <h1 className="relative font-extrabold font-rubik text-6xl text-white">Rewards✨</h1>

          </div>
        </div>

        {/* Sub-heading */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl text-glow font-semibold mb-2">
            Why you must register for
            <span className="bg-blue-800 px-2 py-1 rounded ml-2 ">JWoC 2025</span>?
          </h2>
        </motion.div>

        {/* Reward Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              src: "perk-1.png",
              title: "Paid Internship Opportunities",

            },
            {
              src: "perk-2.png",
              title: "Coupons & Free Domains",
            },
            {
              src: "perk-3.png",
              title: "Goodies & Cool Stickers",
            },
            {
              src: "perk-4.png",
              title: "Workshops & Masterclasses",
            },
            {
              src: "perk-5.png",
              title: "Verified Certificates",
            },
            {
              src: "internationalTrip.jpeg",
              title: "International internship",

            }
          ].map((perk, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="reward_card rounded-lg p-6 shadow-md transition-transform duration-300 border border-white border-opacity-30  backdrop-blur-md"
            >

              <div className="relative flex justify-center items-center pt-10 mb-4 z-[10]">

                <img
                  src={perk.src}
                  alt={perk.title}
                  className="w-[10rem] rounded-lg h-[10rem] object-contain z-[20]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur-xl opacity-30"></div>
              </div>
              <span className="bg-indigo-900 px-2 py-1 rounded ml-2 text-center font-semibold lg:text-lg text-sm text-glow ">{perk.title2}</span>
              <span className="bg-indigo-900 px-2 py-1 rounded ml-2 text-center font-semibold lg:text-lg text-sm text-glow ">{perk.title}</span>

            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default PrizeCards;
