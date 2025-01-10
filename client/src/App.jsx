import { Volume2, VolumeX } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import MouseParticles from "react-mouse-particles";
import { Route, Routes } from "react-router-dom";
import Team from "./pages/Team.jsx";
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
        audioRef.current.muted = true;
      }
      setIsMuted(!isMuted);
    }
  };

  return (
    <StarryNightBackground>
      <MouseParticles
        g={1}
        color={["#32CD32", "#00FFFF", "#8A2BE2", "#FF00FF", "#00FA9A", "#1E90FF", "#7FFF00", "#DDA0DD"]}
        cull="MuiSvgIcon-root,MuiButton-root"
        level={6}
      />

      <div>

        <audio ref={audioRef} src="/jingle.mp3" loop />


        <NavbarDemo />

        {/* Mute/Unmute Button */}
        <div style={{ position: "fixed", top: "10px", right: "10px", zIndex: 1000 }}>
          <button
            onClick={handleMuteToggle}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "white",
              fontSize: "16px",

            }}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </button>
        </div>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Starvideo />} />
          <Route path="/mentor" element={<Home />} />
          <Route path="/dashboard" element={<MentorDashboard />} />
          <Route path="/timeline" element={<ScrollLineAnimation />} />
          <Route path="/team" element={<Team/>}/>
          <Route path="/projects" element={<Projects />} />
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/Mentor-registration" element={<MentorRegistration />} />
          <Route path="/mentee-registration" element={<MenteeRegistration />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/registrationcard" element={<RegistrationCards />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </div>
    </StarryNightBackground>
  );
}

export default App;
