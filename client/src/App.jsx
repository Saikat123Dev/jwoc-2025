import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProject from "./components/AddProject.jsx";
import Footer from "./components/Footer.jsx";
import MenteeRegistration from "./components/MenteeRegistration.jsx";
import MentorRegistration from "./components/MentorRegistration.jsx";
import ScrollLineAnimation from "./components/ui/ScrollLineAnimation/scrollLineAnimation.jsx";
import Starvideo from "./components/ui/Starvideo.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import StarryNightBackground from "./pages/Projects/Style.jsx";
import LeaderBoard from "./pages/leaderBoard/leaderboard.jsx";
// import Footer from "./components/Footer.jsx";
// import LeaderBoard from "./pages/leaderboard.jsx";
import NavbarDemo from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import RegistrationCards from "./pages/RegistrationCard.jsx";
function App() {

    return (
          <StarryNightBackground >
        <div >
            <NavbarDemo />
            <Routes>
            <Route path="/" element={<Starvideo/>}/>
            <Route path="/mentee" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/timeline" element={<ScrollLineAnimation/>}/>
                <Route path="/projects" element={<Projects/>}/>
                <Route path="/leaderboard" element={<LeaderBoard/>}/>
                <Route path="/Mentor-registration" element={<MentorRegistration/>}/>
                <Route path="/mentee-registration" element={<MenteeRegistration/>}/>
                <Route path="/add-project" element={<AddProject/>}/>
               <Route path="/registrationcard" element={<RegistrationCards/>}/>
            </Routes>
        <Footer />
        </div>
  </StarryNightBackground >
    );
}

export default App;
