import { BookOpen, Briefcase, Clock, Home, Menu, Trophy, X ,Users2} from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavbarDemo = () => {
  const navigate = useNavigate();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMentorClick = () => {
    navigate("/mentor");
    setIsMobileMenuOpen(false); // Close mobile menu if open
  };

  const NavItem = ({ id, label, Icon, isMobile = false }) => (
    <div
      className={`relative ${!isMobile ? "hidden lg:block" : ""}`}
      onMouseEnter={() => setHoveredItem(id)}
      onMouseLeave={() => setHoveredItem(null)}
    >
      <a
        href={`${id}`}
        className={`flex items-center space-x-3 px-4 py-2 group ${
          isMobile ? "w-full" : ""
        }`}
        onClick={() => isMobile && setIsMobileMenuOpen(false)}
      >
        <Icon
          className={`h-auto w-auto transition-colors duration-200 ${
            hoveredItem === id
              ? "text-cyan-400"
              : "text-gray-400 dark:text-gray-300"
          }`}
        />
        <span
          className={`text-base font-semibold transition-colors duration-200 ${
            hoveredItem === id
              ? "text-cyan-400"
              : "text-gray-400 dark:text-gray-300"
          }`}
        >
          {label}
        </span>
      </a>
      {!isMobile && hoveredItem === id && (
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-cyan-400 transition-transform duration-300"
          style={{
            transform: hoveredItem === id ? "scaleX(1)" : "scaleX(0)",
          }}
        ></div>
      )}
    </div>
  );

  return (
    <div className="fixed top-0 left-0 lg:pb-60 right-0 z-50 px-4 bg-transparent">
      <div className="w-full lg:mb-60 mx-auto max-w-[100rem]">
        <div className="flex lg:py-0 items-center lg:gap-36 justify-between py-4">
          {/* Logo */}
          <div className="flex items-center lg:h-36 lg:w-40 cursor-pointer">
            <img
              src="jwoc-2024.svg"
              alt="Logo"
              className="h-16 lg:h-24 lg:w-28 w-16 object-contain"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="backdrop-blur-lg h-16 bg-gradient-to-br from-white/20 to-white/10 dark:from-black/30 dark:to-black/20 rounded-2xl border border-white/30 shadow-lg shadow-black/10 px-8 py-4 lg:py-2  w-full xl:w-[75rem]  xl:items-center xl:justify-between  hidden lg:flex flex-1 justify-center space-x-8">
            <NavItem id="timeline" label="Timeline" Icon={Clock} />
            <NavItem id="team" label="Team" Icon={Users2} />
            <NavItem id="projects" label="Projects" Icon={BookOpen} />
            <NavItem id="leaderboard" label="Leaderboard" Icon={Trophy} />
          </div>

          {/* Mentor Locker Button (Desktop) */}
          <button
            onClick={handleMentorClick}
            className="flex items-center space-x-2 bg-gradient-to-r from-green-400 via-teal-500 to-cyan-600 hover:from-green-500 hover:via-teal-600 hover:to-cyan-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 opacity-75"
          >
            <Briefcase className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-lg">Mentor Locker</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-300" />
            ) : (
              <Menu className="h-6 w-6 text-gray-300" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 p-4 backdrop-blur-lg bg-gradient-to-br from-white/20 to-white/10 dark:from-black/30 dark:to-black/20 rounded-2xl border border-white/30 shadow-lg shadow-black/10">
            <div className="flex flex-col space-y-4">
              <NavItem id="home" label="Home" Icon={Home} isMobile={true} />
              <NavItem
                id="timeline"
                label="Timeline"
                Icon={Clock}
                isMobile={true}
              />
              <NavItem
                id="leaderboard"
                label="Leaderboard"
                Icon={Trophy}
                isMobile={true}
              />
              <NavItem
                id="projects"
                label="Projects"
                Icon={BookOpen}
                isMobile={true}
              />

              {/* Mentor Locker Button (Mobile) */}
              <button
  onClick={handleMentorClick}
  className="flex items-center space-x-2 bg-gradient-to-r from-green-400 via-teal-500 to-cyan-600 hover:from-green-500 hover:via-teal-600 hover:to-cyan-700 text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
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
