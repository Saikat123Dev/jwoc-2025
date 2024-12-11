import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NavbarDemo from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import LeaderBoard from "./pages/leaderboard.jsx";
import MentorRegistration from "./components/MentorRegistration.jsx";
import MenteeRegistration from "./components/MenteeRegistration.jsx";
import AddProject from "./components/AddProject.jsx";

import Starvideo from "./components/ui/Starvideo.jsx";

function App() {
    return (
        <div >
            <NavbarDemo />
            <Routes>
                <Route path="/projects" element={<Projects/>}/>          
                <Route path="/leaderboard" element={<LeaderBoard/>}/>
                <Route path="/Mentor-registration" element={<MentorRegistration/>}/>
                <Route path="/mentee-registration" element={<MenteeRegistration/>}/>
                <Route path="/add-project" element={<AddProject/>}/>
                <Route path="/stars" element={<Starvideo/>}/>
            </Routes>  
        <Footer />
        </div>

    );
}

export default App;
