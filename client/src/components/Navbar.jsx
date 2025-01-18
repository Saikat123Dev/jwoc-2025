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

  const NavItem = ({ id, label, Icon, isMobile = false, isRegister = false }) => (
    <div
      className={`relative flex items-center ${!isMobile ? "hidden lg:block" : ""}`}
      onMouseEnter={() => setHoveredItem(id)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <a
        href={`/${id}`}
        className={`flex items-center space-x-2 px-3 py-1 group ${
          isMobile ? "w-full" : ""
        } ${isRegister ? "text-cyan-400 font-semibold" : ""}`}
        onClick={() => isMobile && setIsMobileMenuOpen(false)}
      >
        <Icon
          className={`h-4 w-4 transition-colors duration-200 ${
            hoveredItem === id || isRegister
              ? "text-cyan-400"
              : "text-gray-400 dark:text-gray-300"
          }`}
        />
        <span
          className={`text-md font-semibold transition-colors duration-200 ${
            hoveredItem === id || isRegister
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

  const Divider = () => (
    <div className="h-6 w-px bg-gray-400/30 dark:bg-gray-600/30 mx-4" />
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-14 px-4 lg:bg-transparent lg:backdrop-blur-2xl lg:bg-opacity-40
    xl:bg-transparent xl:backdrop-blur-2xl xl:bg-opacity-40
    ">
      <div className="w-full mx-auto lg:max-w-[85rem]">
        <div className="flex items-center justify-between py-2">
          <div className="z-50">
            <Link to="/" className="flex items-center h-12 w-24 cursor-pointer">
              <img
                src="jwoc_icon.svg"
                alt="Logo"
                className="h-10 w-auto object-contain navbar-logo"
              />
            </Link>
          </div>
          <div className="backdrop-blur-lg h-12 md:max-w-[55rem] bg-gradient-to-br from-white/20 to-white/10 dark:from-black/30 dark:to-black/20 rounded-xl border border-white/30 shadow-lg shadow-black/10 px-6 py-2 w-full xl:w-[70rem] hidden lg:flex flex-1 justify-center items-center">
            <div className="flex items-center space-x-2">
              <NavItem id="" label="Home" Icon={Home} />
              <Divider />
              <NavItem id="timeline" label="Timeline" Icon={Clock} />
              <Divider />
              <NavItem id="team" label="Team" Icon={Users2} />
              <Divider />
              <NavItem id="projects" label="Projects" Icon={BookOpen} />
              <Divider />
              <NavItem id="leaderboard" label="Leaderboard" Icon={Trophy} />
              <Divider />
              <NavItem
                id="registrationcard"
                label="Register"
                Icon={Briefcase}
                isRegister={true}
              />
            </div>
          </div>
          <button
            onClick={handleMentorClick}
            className="hidden lg:flex items-center space-x-2 bg-gradient-to-r from-green-600 via-teal-800 hover:to-cyan-900
            hover:from-green-700 hover:via-teal-700 to-cyan-800
            text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-xl transition-all duration-300"
          >
            <Briefcase className="h-4 w-4" />
            <span>Mentor Locker</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
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
              <NavItem id="" label="Home" Icon={Home} isMobile={true} />
              <NavItem id="timeline" label="Timeline" Icon={Clock} isMobile={true} />
              <NavItem id="team" label="Team" Icon={Users2} isMobile={true} />
              <NavItem id="projects" label="Projects" Icon={BookOpen} isMobile={true} />
              <NavItem id="leaderboard" label="Leaderboard" Icon={Trophy} isMobile={true} />
              <div className="h-px w-full bg-gray-400/30 dark:bg-gray-600/30 my-2" />
              <NavItem
                id="registrationcard"
                label="Register"
                Icon={Briefcase}
                isMobile={true}
                isRegister={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarDemo;
