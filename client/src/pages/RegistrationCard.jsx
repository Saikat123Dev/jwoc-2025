import { ArrowRight, BookOpen, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationCards = () => {
  return (
    <div className="min-h-screen mt-28 pt-11 p-6 flex items-center justify-center">
      <div className="grid md:grid-cols-2 gap-8 max-w-6xl w-full">
        {/* Mentee Card */}
        <div className="group relative bg-white rounded-2xl shadow-xl p-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="absolute -top-6 left-8">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 rounded-xl shadow-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Register as a Mentee</h2>
            <p className="text-gray-600 mb-6">
              Are you new to the open-source world or looking to enhance your skills by contributing to impactful projects? Join as a mentee and kickstart your journey in open source.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Personalized Learning Paths',
                'Hands-on Project Guidance',
                'Supportive Community',
                'Career Growth Opportunities',
                'Access to Expert Resources'
              ].map((benefit) => (
                <li key={benefit} className="flex items-center text-gray-700">
                  <span className="h-2 w-2 bg-purple-500 rounded-full mr-2"></span>
                  {benefit}
                </li>
              ))}
            </ul>

            <Link to="/mentee-registration" className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-6 rounded-lg flex items-center justify-center group-hover:opacity-90 transition-opacity">
              Register Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Mentor Card */}
        <div className="group relative bg-white rounded-2xl shadow-xl p-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <div className="absolute -top-6 left-8">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4 rounded-xl shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Register as a Mentor</h2>
            <p className="text-gray-600 mb-6">
              Do you have unique projects or ideas that could benefit from open-source collaboration? Become a mentor and guide passionate contributors to bring your vision to life.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                'Shape the Future of Open Source',
                'Collaborate with Talented Individuals',
                'Expand Your Professional Network',
                'Contribute to Community Growth',
                'Showcase Your Leadership Skills'
              ].map((benefit) => (
                <li key={benefit} className="flex items-center text-gray-700">
                  <span className="h-2 w-2 bg-indigo-500 rounded-full mr-2"></span>
                  {benefit}
                </li>
              ))}
            </ul>

            <Link to="/mentee" className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-3 px-6 rounded-lg flex items-center justify-center group-hover:opacity-90 transition-opacity">
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
