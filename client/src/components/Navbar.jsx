import { BookOpen, Briefcase, Clock, Home, Menu, Trophy, X } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const NavbarDemo = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMentorClick = () => {
    navigate('/mentor');
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  const NavItem = ({ id, label, Icon, isMobile = false }) => (
    <div
      className={`relative ${!isMobile ? 'hidden lg:block' : ''}`}
      onMouseEnter={() => setHoveredItem(id)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <a
        href={`${id}`}
        className={`flex items-center space-x-3 px-4 py-2 group ${
          isMobile ? 'w-full' : ''
        }`}
        onClick={() => isMobile && setIsMobileMenuOpen(false)}
      >
        <Icon className={`h-auto w-auto transition-colors duration-200 ${
          hoveredItem === id ? 'text-purple-500' : 'text-gray-400 dark:text-gray-300'
        }`} />
        <span className={`text-base font-semibold transition-colors duration-200 ${
          hoveredItem === id ? 'text-purple-500' : 'text-gray-400 dark:text-gray-300'
        }`}>
          {label}
        </span>
      </a>
      {hoveredItem === id && !isMobile && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500" />
      )}
    </div>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 py-2">
      <div className="min-w-full mx-auto">
        <div className="mt-2 p-4 flex items-center justify-between rounded-2xl relative">
          {/* Logo Section */}
          <div className="flex items-center group cursor-pointer">
            <a href="/" className="flex items-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-xl text-xl shadow-lg group-hover:shadow-2xl transition-all duration-300">
                JWoC
              </div>
            </a>
          </div>

          {/* Desktop Navigation Menu */}
          <div className="hidden md:flex flex-1 mx-8">
            <div className="backdrop-blur-lg bg-gradient-to-br from-white/20 to-white/10 dark:from-black/30 dark:to-black/20 rounded-2xl border border-white/30 shadow-lg shadow-black/10 px-8 py-4 min-w-full">
              <div className="flex justify-center items-center space-x-12">
                <NavItem id="home" label="Home" Icon={Home} />
                <NavItem id="timeline" label="Timeline" Icon={Clock} />
                <NavItem id="leaderboard" label="Leaderboard" Icon={Trophy} />
                <NavItem id="projects" label="Projects" Icon={BookOpen} />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-300" />
            )}
          </button>

          {/* Mentor Locker Button - Desktop */}
          <button
            onClick={handleMentorClick}
            className="hidden md:flex group items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Briefcase className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="group-hover:translate-x-0.5 transition-transform duration-300">
              Mentor Locker
            </span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 p-4 backdrop-blur-lg bg-gradient-to-br from-white/20 to-white/10 dark:from-black/30 dark:to-black/20 rounded-2xl border border-white/30 shadow-lg shadow-black/10">
            <div className="flex flex-col space-y-4">
              <NavItem id="home" label="Home" Icon={Home} isMobile={true} />
              <NavItem id="timeline" label="Timeline" Icon={Clock} isMobile={true} />
              <NavItem id="leaderboard" label="Leaderboard" Icon={Trophy} isMobile={true} />
              <NavItem id="projects" label="Projects" Icon={BookOpen} isMobile={true} />

              {/* Mentor Locker Button - Mobile */}
              <button
                onClick={handleMentorClick}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Briefcase className="h-5 w-5" />
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
