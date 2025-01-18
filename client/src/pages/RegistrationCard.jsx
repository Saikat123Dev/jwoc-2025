import { ArrowRight, BookOpen, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationCards = () => {
  return (
    <div className="relative min-h-screen mt-28 pt-11 p-6 flex items-center justify-center overflow-hidden ">
      {/* Synak Aurora Background */}
      

      <div className="relative grid md:grid-cols-2 gap-8 max-w-6xl w-full z-10">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-500 via-indigo-500 to-purple-700 opacity-50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500 via-blue-500 to-indigo-700 opacity-40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-700 opacity-50 rounded-full blur-2xl"></div>
      </div>
        {/* Mentee Card */}
        <div className="group relative backdrop-blur-xl bg-white/10 rounded-2xl shadow-xl p-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="absolute -top-6 left-8">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl shadow-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-100 mb-4">Register as a Mentee</h2>
            <p className="text-gray-300 mb-6">
              Are you new to the open-source world or looking to enhance your skills by contributing to impactful projects? Join as a mentee and kickstart your journey in open source.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                
                'Hands-on Project Guidance',
                'Supportive Community',
                'Career Growth Opportunities',
                'Access to Expert Resources',
              ].map((benefit) => (
                <li key={benefit} className="flex items-center text-gray-300">
                  <span className="h-2 w-2 bg-purple-500 rounded-full mr-2"></span>
                  {benefit}
                </li>
              ))}
            </ul>

            <Link
              to="/mentee-registration"
              className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-6 rounded-md flex items-center justify-center group-hover:opacity-90 hover:text-white  hover:from-purple-600 hover:to-purple-700 transition-all"
            >
              Register Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Mentor Card */}
        <div className="group relative backdrop-blur-xl bg-white/10 rounded-2xl shadow-xl p-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="absolute -top-6 left-8">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 rounded-xl shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-100 mb-4">Register as a Mentor</h2>
            <p className="text-gray-300 mb-6">
              Do you have unique projects or ideas that could benefit from open-source collaboration? Become a mentor and guide passionate contributors to bring your vision to life.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                
                'Collaborate with Talented Individuals',
                'Expand Your Professional Network',
                'Contribute to Community Growth',
                'Showcase Your Leadership Skills',
              ].map((benefit) => (
                <li key={benefit} className="flex items-center text-gray-300">
                  <span className="h-2 w-2 bg-cyan-500 rounded-full mr-2"></span>
                  {benefit}
                </li>
              ))}
            </ul>

            <Link
              to="/mentor"
              className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-3 px-6 rounded-lg flex items-center justify-center group-hover:opacity-90  hover:text-white hover:from-indigo-600 hover:to-indigo-700 transition-all"
            >
              Register Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationCards;
