import React, { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AddProject from "./components/AddProject.jsx";
import Footer from "./components/Footer.jsx";
import MenteeRegistration from "./components/MenteeRegistration.jsx";
import MentorRegistration from "./components/MentorRegistration.jsx";
import NavbarDemo from "./components/Navbar.jsx";
import ScrollLineAnimation from "./components/ui/ScrollLineAnimation/scrollLineAnimation.jsx";
import Starvideo from "./components/ui/Starvideo.jsx";
import MentorDashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import StarryNightBackground from "./pages/Projects/Style.jsx";
import RegistrationCards from "./pages/RegistrationCard.jsx";
import LeaderBoard from "./pages/leaderBoard/leaderboard.jsx";

function App() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = false;
      audioRef.current.play().catch((error) => {
        console.error("Audio autoplay blocked:", error);
      });
    }
  }, []);

  // Mute/Unmute Handler
  const handleMuteToggle = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.muted = false;
        audioRef.current.play().catch((error) => {
          console.error("Failed to play audio:", error);
        });
      } else {
        audioRef.current.muted = false;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <StarryNightBackground>
      {/* Global Background Audio */}
      {/* <audio ref={audioRef} src="jingle.mp3" loop /> */}

      {/* Mute/Unmute Button */}


      <div>
        <NavbarDemo />
        <Routes>
          <Route path="/" element={<Starvideo />} />
          <Route path="/mentor" element={<Home />} />
          <Route path="/dashboard" element={<MentorDashboard />} />
          <Route path="/timeline" element={<ScrollLineAnimation />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/Mentor-registration" element={<MentorRegistration />} />
          <Route path="/mentee-registration" element={<MenteeRegistration />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/registrationcard" element={<RegistrationCards />} />
        </Routes>
        <Footer />

      </div>
      {/* <button
        onClick={handleMuteToggle}
        className="fixed top-4 right-4 z-50 bg-gray-800 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-700 transition-all"
      >
        {isMuted ? "Mute" : "Unmute"}
      </button> */}
    </StarryNightBackground>
  );
}

export default App;
