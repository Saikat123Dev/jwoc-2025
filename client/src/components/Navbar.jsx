import { BookOpen, Briefcase, Clock, Home, Menu, Trophy, Users2, X } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavbarDemo = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMentorClick = () => {
    navigate("/mentor");
    setIsMobileMenuOpen(false);
  };

  const NavItem = ({ id, label, Icon, isMobile = false }) => (
    <div
      className={`relative ${!isMobile ? "hidden lg:block" : ""}`}
      onMouseEnter={() => setHoveredItem(id)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <a
        href={`/${id}`}
        className={`flex items-center space-x-2 px-3 py-1 group ${
          isMobile ? "w-full" : ""
        }`}
        onClick={() => isMobile && setIsMobileMenuOpen(false)}
      >
        <Icon
          className={`h-5 w-5 transition-colors duration-200 ${
            hoveredItem === id
              ? "text-cyan-400"
              : "text-gray-400 dark:text-gray-300"
          }`}
        />
        <span
          className={`text-sm font-semibold transition-colors duration-200 ${
            hoveredItem === id
              ? "text-cyan-400"
              : "text-gray-400 dark:text-gray-300"
          }`}
        >
          {label}
        </span>
      </a>
      {!isMobile && hoveredItem === id && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 transition-transform duration-300" />
      )}
    </div>
  );

  return (
    <div className="fixed top-3 left-0 right-0 z-50 px-4 bg-transparent">
      <div className="w-full mx-auto max-w-[70rem]">
        <div className="flex items-center justify-between py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center h-12 w-24 cursor-pointer">
            <img
              src="jwoc-2024.svg"
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="backdrop-blur-lg h-12  md:max-w-[45rem]  bg-gradient-to-br from-white/20 to-white/10 dark:from-black/30 dark:to-black/20 rounded-xl border border-white/30 shadow-lg shadow-black/10 px-6 py-2 w-full xl:w-[70rem] hidden lg:flex flex-1 justify-center space-x-6">

            <NavItem id="timeline" label="Timeline" Icon={Clock} />
            <NavItem id="team" label="Team" Icon={Users2} />
            <NavItem id="projects" label="Projects" Icon={BookOpen} />
            <NavItem id="leaderboard" label="Leaderboard" Icon={Trophy} />
          </div>

          {/* Mentor Locker Button (Desktop) */}
          <button
            onClick={handleMentorClick}
            className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-green-400 via-teal-500 to-cyan-600 hover:from-green-500 hover:via-teal-600 hover:to-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Briefcase className="h-4 w-4" />
            <span>Mentor Locker</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-gray-300" />
            ) : (
              <Menu className="h-5 w-5 text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 p-4 backdrop-blur-lg bg-gradient-to-br from-white/20 to-white/10 dark:from-black/30 dark:to-black/20 rounded-lg border border-white/30 shadow-lg shadow-black/10">
            <div className="flex flex-col space-y-3">
              <NavItem id="home" label="Home" Icon={Home} isMobile={true} />
              <NavItem id="timeline" label="Timeline" Icon={Clock} isMobile={true} />
              <NavItem id="leaderboard" label="Leaderboard" Icon={Trophy} isMobile={true} />
              <NavItem id="team" label="Team" Icon={BookOpen} isMobile={true} />
              <NavItem id="projects" label="Projects" Icon={BookOpen} isMobile={true} />

              {/* Mentor Locker Button (Mobile) */}
              <button
                onClick={handleMentorClick}
                className="flex items-center space-x-2 bg-gradient-to-r from-green-400 via-teal-500 to-cyan-600 hover:from-green-500 hover:via-teal-600 hover:to-cyan-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Briefcase className="h-4 w-4" />
                <span>Mentor Locker</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarDemo;
