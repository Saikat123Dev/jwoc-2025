import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProject from "./components/AddProject.jsx";
import Footer from "./components/Footer.jsx";
import MenteeRegistration from "./components/MenteeRegistration.jsx";
import MentorRegistration from "./components/MentorRegistration.jsx";
import Starvideo from "./components/ui/Starvideo.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import LeaderBoard from "./pages/leaderboard.jsx";
import NavbarDemo from "./components/Navbar.jsx";


function App() {
    return (
        <div >
            <NavbarDemo />
            <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
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
