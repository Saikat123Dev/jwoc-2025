import React, { useRef, useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const App = () => {
  const init = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const leaderboardRef = useRef(null);

  const handleMouseMove = (e) => {
    const { clientX: x, clientY: y } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const rotateX = (y - centerY) / 50;
    const rotateY = (centerX - x) / 50;

    if (leaderboardRef.current) {
      leaderboardRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  // #Random Data
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const githubUsername = "Surajit0573";
  const rank = 10;
  const githubAvatar = "https://avatars.githubusercontent.com/u/111490250?v=4";
  const participantName = "Surajit Maity";

  return (
    // <div
    //   className=" w-screen flex items-center justify-center bg-gradient-to-br from-black via-[#1a0540] to-[#0b0035] overflow-hidden relative"
    //   onMouseMove={handleMouseMove}
    // >
    //   <Particles
    //     options={{
    //       particles: {
    //         color: {
    //           value: "#fff",
    //         },
    //         number: {
    //           value: 200,
    //           density: {
    //             enable: true,
    //             area: 800,
    //           },
    //         },
    //         opacity: {
    //           value: { min: 0.3, max: 1 },
    //         },
    //         shape: {
    //           type: "star",
    //         },
    //         size: {
    //           value: { min: 1, max: 3 },
    //         },
    //         move: {
    //           direction: "bottom-right",
    //           enable: true,
    //           speed: { min: 3, max: 5 },
    //           straight: true,
    //         },
    //       },
    //     }}
    //     init={init}
    //   />

    //   {/* Aurora Effect */}
    //   <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-800 via-purple-500 to-transparent opacity-30 blur-3xl animate-[move_10s_linear_infinite]"></div>
    //   <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-r from-teal-800 via-blue-500 to-transparent opacity-30 blur-3xl animate-[move_10s_linear_infinite_reverse]"></div>

    //   <div
    //     ref={leaderboardRef}
    //     className="my-[200px] relative w-[90%] h-[500px] flex items-center justify-center [transform-style:preserve-3d] [perspective:1000px] transition-transform duration-500 ease-out hover:scale-105"
    //   >
    //     {/* Left Card */}
    //     <a
    //       href={`https://github.com/${githubUsername}`}
    //       target="_blank"
    //       rel="noopener noreferrer"
    //       className="w-[20%] h-full inset-y-0 bg-white bg-opacity-10 rounded-lg shadow-[5px_5px_15px_rgba(0,0,0,0.6),_10px_10px_20px_rgba(0,0,0,0.2),_inset_-5px_-5px_10px_rgba(255,255,255,0.1)] backdrop-blur-lg flex flex-col items-center justify-center font-bold text-white text-3xl transform origin-top-right skew-y-[-15deg] scale-y-[1] translate-x-[-100px] translate-z-[100px] [rotate-y:35deg] transition-transform duration-500 ease-out hover:translate-z-[150px] hover:skew-y-[-5deg] hover:scale-[1.05] hover:bg-opacity-20"
    //     >
    //       {/* Participant Name and Rank */}
    //       <div className="w-full bg-opacity-20 bg-black text-lg font-semibold p-3 text-center rounded-t-lg">
    //         {participantName} <span className="text-[#FFD700]">#{rank}</span>
    //       </div>

    //       {/* GitHub Profile Picture */}
    //       <img
    //         src={githubAvatar}
    //         alt={`${participantName}'s GitHub Avatar`}
    //         className="w-20 h-20 rounded-full mt-4 border-2 border-[#FFD700] shadow-lg"
    //       />

    //       {/* GitHub Username */}
    //       <div className="text-white text-lg font-medium mt-3">@{githubUsername}</div>

    //       {/* Total Points and PRs */}
    //       <div className="mt-4 w-full text-center text-sm">
    //         <p className="text-[#00FF00] font-semibold">Total Points: 100</p>
    //         <p className="text-[#00BFFF] font-semibold">Total PRs: 10</p>
    //       </div>
    //     </a>


    //     {/* Back Card */}
    //     <div className="w-[35%] h-full inset-0 bg-white bg-opacity-10 rounded-lg shadow-[5px_5px_50px_rgba(0,0,0,0.7),_10px_10px_25px_rgba(0,0,0,0.3)] backdrop-blur-lg flex items-center justify-center font-bold text-white text-3xl transform scale-[0.9] -translate-z-[300px] transition-transform duration-500 ease-out hover:translate-z-[0] hover:rotate-y-[10deg] hover:scale-[1.1]">
    //       <div className="w-full h-full overflow-hidden rounded-lg">
    //         <table className="w-full h-full bg-transparent text-white text-center">
    //           <thead>
    //             <tr className="bg-opacity-20 bg-black text-lg font-semibold">
    //               <th className="p-3">Sl No.</th>
    //               <th className="p-3">Rank</th>
    //               <th className="p-3">Participant Name</th>
    //               <th className="p-3">Points</th>
    //             </tr>
    //           </thead>
    //           <tbody className="text-base max-h-[400px] overflow-y-auto scroll-smooth">
    //             {data.map((d, index) => (
    //               <tr
    //                 key={index}
    //                 className={`${index % 2 === 0 ? "bg-opacity-20" : "bg-opacity-10"
    //                   } bg-[#1e0649] hover:bg-opacity-40 transition duration-300`}
    //               >
    //                 <td className="p-3 border-b border-[#2c096c]">{index + 1}</td>
    //                 <td className="p-3 border-b border-[#2c096c]">#{d}</td>
    //                 <td className="p-3 border-b border-[#2c096c]">John Doe</td>
    //                 <td className="p-3 border-b border-[#2c096c]">1200</td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>
    //       </div>
    //     </div>


    //     {/* Right Card */}
    //     <div className="w-[20%] h-full inset-y-0 bg-white bg-opacity-10 rounded-lg shadow-[5px_5px_15px_rgba(0,0,0,0.6),_10px_10px_20px_rgba(0,0,0,0.2),_inset_-5px_-5px_10px_rgba(255,255,255,0.1)] backdrop-blur-lg flex flex-col items-center font-bold text-white text-3xl transform origin-top-left skew-y-[15deg] scale-y-[1] translate-x-[100px] translate-z-[100px] [rotate-y:-35deg] transition-transform duration-500 ease-out hover:translate-z-[150px] hover:skew-y-[5deg] hover:scale-[1.05] overflow-hidden">
    //       {/* Table Header */}
    //       <div className="w-full bg-opacity-20 bg-black text-lg font-semibold p-3 text-center rounded-t-lg">
    //         PR LINKS
    //       </div>

    //       {/* Table Content */}
    //       <div className="w-full h-full p-4 overflow-y-auto text-sm text-left">
    //         {data.map((d) => (
    //           <div
    //             key={d}
    //             className="mb-4 bg-[#1e0649] bg-opacity-20 p-3 rounded-lg hover:bg-opacity-40 transition duration-300"
    //           >
    //             <a
    //               href="https://github.com/Surajit0573/jwoc-leaderboard"
    //               target="_blank"
    //               rel="noopener noreferrer"
    //               className="text-blue-400 underline block truncate"
    //             >
    //               https://github.com/Surajit0573/jwoc-leaderboard
    //             </a>
    //             <div className="mt-2">
    //               <p className="text-[#FFD700] font-medium">Difficulty: Medium</p>
    //               <p className="text-[#00FF00] font-medium">Phase: 2</p>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>

    //   </div>
    // </div>
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-black via-[#1a0540] to-[#0b0035] overflow-hidden relative">
      <Particles
        options={{
          particles: {
            color: {
              value: "#fff",
            },
            number: {
              value: 200,
              density: {
                enable: true,
                area: 800,
              },
            },
            opacity: {
              value: { min: 0.3, max: 1 },
            },
            shape: {
              type: "star",
            },
            size: {
              value: { min: 1, max: 3 },
            },
            move: {
              direction: "bottom-right",
              enable: true,
              speed: { min: 3, max: 5 },
              straight: true,
            },
          },
        }}
        init={init}
      />

      {/* Aurora Effect */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-indigo-800 via-purple-500 to-transparent opacity-30 blur-3xl animate-[move_10s_linear_infinite]"></div>
      <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-r from-teal-800 via-blue-500 to-transparent opacity-30 blur-3xl animate-[move_10s_linear_infinite_reverse]"></div>

      {/* Coming Soon Content */}
      <div className="relative z-10 text-center">
        <div className="text-6xl md:text-8xl font-bold text-white mb-8 animate-pulse">
          Coming Soon
        </div>
        <div className="text-xl md:text-2xl text-cyan-300 font-light max-w-2xl mx-auto backdrop-blur-sm bg-white/5 p-6 rounded-lg shadow-lg">
          We're working on something awesome!
          <div className="mt-4 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;