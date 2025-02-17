import React, { useEffect, useRef, useState } from "react";

const App = () => {
  const leaderboardRef = useRef(null);
  const [data, setData] = useState([]);
  const [selectedMentee, setSelectedMentee] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleMouseMove = (e) => {
    if (window.innerWidth >= 1024) {
      const { clientX: x, clientY: y } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const rotateX = (y - centerY) / 50;
      const rotateY = (centerX - x) / 50;
      if (leaderboardRef.current) {
        leaderboardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://jwoc-2025.onrender.com/api/getALl");
        const result = await response.json();
        let fetchedData = result.mentees;
        fetchedData = fetchedData.filter((d) => d.Ranking > 0).sort((a, b) => a.Ranking - b.Ranking);
        setData(fetchedData);
        if (fetchedData.length > 0) {
          setSelectedMentee(fetchedData[0]);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const githubUrl = selectedMentee?.github || "https://github.com/placeholder";
  const githubUsername = githubUrl.split("https://github.com/")[1] || "username";
  const githubAvatar = `https://avatars.githubusercontent.com/${githubUsername}?v=4`;
  const participantName = selectedMentee?.name || "Participant Name";
  const rank = selectedMentee?.Ranking || "-";
  const totalPoints = selectedMentee?.TotalPoints || 0;
  const totalPRs = selectedMentee?.pr_urls ? selectedMentee.pr_urls.length : 0;
  const topThree = data.slice(0, 3);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center px-4 py-20 gap-y-8 relative overflow-x-hidden">
      <h1 className="text-cyan-500 font-rubik text-4xl md:text-5xl lg:text-6xl font-semibold drop-shadow-[0_0_10px_rgba(0,255,255,0.8)] mt-4">
        Leaderboard
      </h1>

      {/* Top-Three Cards - Hidden on smaller screens */}
      <div className="hidden md:grid w-full max-w-5xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4 mb-10">
        {topThree.map((mentee, idx) => {
          const url = mentee.github || "https://github.com/placeholder";
          const username = url.split("https://github.com/")[1] || "username";
          const avatar = `https://avatars.githubusercontent.com/${username}?v=4`;
          return (
            <a
              key={idx}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setSelectedMentee(mentee)}
              className="w-full bg-white/10 backdrop-blur-lg rounded-lg shadow-lg border border-transparent hover:border-cyan-400 transition-all cursor-pointer transform hover:scale-105 hover:rotate-3"
            >
              <div className="p-4 flex flex-col items-center text-center">
                <img
                  src={avatar}
                  alt={`${mentee.name}'s Avatar`}
                  className="w-16 h-16 rounded-full mb-2 border-2 border-cyan-400 shadow-md"
                />
                <h2 className="text-lg font-semibold text-white">{mentee.name}</h2>
                <p className="text-sm text-cyan-300">Rank #{mentee.Ranking}</p>
                <p className="text-sm text-green-400 mt-2">Points: {mentee.TotalPoints}</p>
              </div>
            </a>
          );
        })}
      </div>

      {/* Main Cards Section */}
      {loading ? (
        <div className="mt-10 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <div
          className="w-[95%] flex items-center justify-center relative px-4"
          onMouseMove={handleMouseMove}
          style={{ perspective: '2000px' }}
        >
          <div
            ref={leaderboardRef}
            className="w-full  max-w-[1400px] flex flex-col lg:flex-row gap-8 transition-transform duration-300 ease-out lg:items-stretch lg:mx-16"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Left Card - Selected Mentee Details */}
            <div
              className="w-full mr-14 lg:w-1/4 transform transition-all duration-500"
              style={{
                transform: window.innerWidth >= 1024
                  ? 'perspective(2000px) rotateY(35deg) translateZ(100px)'
                  : 'none',
                transformStyle: 'preserve-3d'
              }}
            >
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full bg-white/10 backdrop-blur-lg rounded-lg flex flex-col items-center justify-center p-4 shadow-lg hover:shadow-cyan-500/20 transition-all duration-500 block hover:scale-105 hover:z-50 lg:hover:transform lg:hover:rotate-y-0"
              >
                <div className="w-full bg-black/20 text-lg font-semibold p-3 text-center rounded-t-lg text-white">
                  {participantName} <span className="text-[#FFD700]">#{rank}</span>
                </div>
                <img
                  src={githubAvatar}
                  alt={`${participantName}'s GitHub Avatar`}
                  className="w-20 h-20 rounded-full mt-4 border-2 border-[#FFD700] shadow-lg"
                />
                <div className="text-white text-lg font-medium mt-3">
                  @{githubUsername}
                </div>
                {/* New section for college name */}
                <div className="text-sm text-white mt-2 text-center">
                  {selectedMentee?.college ? `${selectedMentee.college}` : "N/A"}
                </div>
                <div className="mt-4 w-full text-center text-sm">
                  <p className="text-[#00FF00] font-semibold">Total Points: {totalPoints}</p>
                  <p className="text-[#00BFFF] font-semibold">Total PRs: {totalPRs}</p>
                </div>
              </a>
            </div>
            {/* Middle Card - Leaderboard Table */}
            <div
              className="w-full lg:w-2/4 transform transition-all duration-500"
              style={{
                transform: window.innerWidth >= 1024 ? 'perspective(2000px) translateZ(50px)' : 'none',
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="w-full h-[500px] bg-white/10 backdrop-blur-lg rounded-lg flex flex-col overflow-hidden shadow-lg hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-105 hover:z-50">
                <div className="sticky top-0 z-10">
                  <table className="w-full text-white table-fixed">
                    <thead className="bg-black/20">
                      <tr>
                        <th className="p-3 text-sm md:text-base w-1/4">Sl No.</th>
                        <th className="p-3 text-sm md:text-base w-1/4">Rank</th>
                        <th className="p-3 text-sm md:text-base w-1/4">Name</th>
                        <th className="p-3 text-sm md:text-base w-1/4">Points</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className="overflow-auto">
                  <table className="w-full text-white table-fixed">
                    <tbody>
                      {data.map((d, index) => (
                        <tr
                          key={index}
                          onClick={() => setSelectedMentee(d)}
                          className={`cursor-pointer ${selectedMentee?.github === d.github
                            ? "bg-black/30 border-l-4 border-[#FFD700]"
                            : index % 2 === 0
                              ? "bg-white/5"
                              : "bg-white/10"
                            } hover:bg-white/20 transition duration-300`}
                        >
                          <td className="p-3 text-sm md:text-base border-b border-white/10 w-1/4">
                            {index + 1}
                          </td>
                          <td className="p-3 text-sm md:text-base border-b border-white/10 w-1/4">
                            {d.Ranking}
                          </td>
                          <td className="p-3 text-sm md:text-base border-b border-white/10 w-1/4">
                            {d.name}
                          </td>
                          <td className="p-3 text-sm md:text-base border-b border-white/10 w-1/4">
                            {d.TotalPoints}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>


            {/* Right Card - PR Links */}
            <div className="w-full lg:ml-14 lg:w-1/4 transform transition-all duration-500"
              style={{
                transform: window.innerWidth >= 1024 ? 'perspective(2000px) rotateY(-35deg) translateZ(100px)' : 'none',
                transformStyle: 'preserve-3d'
              }}>
              <div className="w-full h-[500px] bg-white/10 backdrop-blur-lg rounded-lg flex flex-col shadow-lg overflow-hidden hover:shadow-cyan-500/20 transition-all duration-500 hover:scale-105 hover:z-50 lg:hover:transform lg:hover:rotate-y-0">
                <div className="w-full bg-black/20 text-lg font-semibold p-3 text-center text-white rounded-t-lg">
                  PR LINKS
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                  {selectedMentee?.pr_urls?.length > 0 ? (
                    selectedMentee.pr_urls.map((pr, index) => (
                      <div
                        key={index}
                        className="mb-4 bg-white/5 p-3 rounded-lg hover:bg-white/10 transition duration-300"
                      >
                        <a
                          href={pr.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline block text-sm break-words"
                        >
                          {pr.url}
                        </a>
                        <div className="mt-2 text-sm text-white">
                          <p className="text-[#FFD700] font-medium">
                            Difficulty: {pr.difficulty || "N/A"}
                          </p>
                          <p className="text-[#00FF00] font-medium">
                            Phase: {pr.phase || "N/A"}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-white">No PR links available</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
