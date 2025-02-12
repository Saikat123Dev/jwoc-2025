import { ArrowRight, BookOpen, Users } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const RegistrationCards = () => {
  return (
    <div className="w-screen relative min-h-screen mt-28 pt-11 flex items-center justify-center">
      <div className="w-full">
        {/* Aurora Background - Moved inside content wrapper */}
        <div className="relative max-w-6xl mx-auto">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-purple-500 via-indigo-500 to-purple-700 opacity-50 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/3 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500 via-blue-500 to-indigo-700 opacity-40 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-blue-500 via-cyan-500 to-blue-700 opacity-50 rounded-full blur-2xl"></div>
          </div>

          {/* Content Wrapper */}
          <div className="relative z-10">
            {/* Registration Cards Grid */}
            <div className="grid md:grid-cols-2 gap-8">
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
                    className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 px-6 rounded-md flex items-center justify-center group-hover:opacity-90 hover:text-white hover:from-purple-600 hover:to-purple-700 transition-all"
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
                    className="w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-3 px-6 rounded-lg flex items-center justify-center group-hover:opacity-90 hover:text-white hover:from-indigo-600 hover:to-indigo-700 transition-all"
                  >
                    Register Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Join Discord Section - Adjusted positioning and z-index */}
            <div className="relative z-10 mt-10 flex justify-center">
              <div className="group w-full max-w-md backdrop-blur-xl bg-white/10 rounded-2xl shadow-xl p-8 transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="mt-8">
                  <h2 className="text-2xl md:text-4xl font-bold text-gray-100 mb-4 text-center">
                    Join Our Discord
                  </h2>
                  <div className="flex justify-center">
                    <a
                      href="https://discord.gg/FtFwNPpr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-2 px-4 rounded-md flex items-center justify-center hover:from-indigo-600 hover:to-indigo-700 transition-all cursor-pointer"
                    >
                      <svg
                        className="w-6 h-6 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50"
                        fill="currentColor"
                      >
                        <path d="M 30.980469 7
           A 1.0001 1.0001 0 0 0 30.089844 7.5859375
           C 30.089844 7.5859375 29.75543 8.3287993 29.546875 9.3964844
           C 27.583844 9.08239 25.937423 9 25 9
           C 24.062577 9 22.416156 9.08239 20.453125 9.3964844
           C 20.24457 8.3287993 19.910156 7.5859375 19.910156 7.5859375
           A 1.0001 1.0001 0 0 0 18.943359 7.0019531
           A 1.0001 1.0001 0 0 0 18.919922 7.0039062
           C 18.919922 7.0039062 12.553656 7.42053 8.3808594 10.714844
           A 1.0001 1.0001 0 0 0 8.3125 10.773438
           C 7.6051397 11.441499 7.0599467 12.483658 6.390625 13.972656
           C 5.7213033 15.461655 5.0156888 17.355449 4.3671875 19.498047
           C 3.0701848 23.783242 2 29.054167 2 34
           A 1.0001 1.0001 0 0 0 2.1347656 34.5
           C 3.6151076 37.06213 6.2964412 38.611763 8.8007812 39.582031
           C 11.305121 40.552299 13.620576 40.938706 14.748047 40.998047
           A 1.0001 1.0001 0 0 0 15.613281 40.583984
           L 18.025391 37.222656
           C 19.998188 37.682914 22.316458 38 25 38
           C 27.683542 38 30.001812 37.682914 31.974609 37.222656
           L 34.386719 40.583984
           A 1.0001 1.0001 0 0 0 35.251953 40.998047
           C 36.379424 40.938707 38.694879 40.552299 41.199219 39.582031
           C 43.703559 38.611763 46.384892 37.06213 47.865234 34.5
           A 1.0001 1.0001 0 0 0 48 34
           C 48 29.054167 46.929815 23.783242 45.632812 19.498047
           C 44.984311 17.355449 44.278697 15.461655 43.609375 13.972656
           C 42.940053 12.483658 42.39486 11.4415 41.6875 10.773438
           A 1.0001 1.0001 0 0 0 41.619141 10.714844
           C 37.446345 7.4205261 31.080078 7.0039062 31.080078 7.0039062
           A 1.0001 1.0001 0 0 0 30.980469 7
           z
           M 18.263672 9.1445312
           C 18.338023 9.3538231 18.416696 9.5349501 18.482422 9.7851562
           C 16.221549 10.302605 13.725951 11.138257 11.384766 12.542969
           A 1.0001 1.0001 0 1 0 12.414062 14.257812
           C 17.145045 11.419224 23.026984 11 25 11
           C 26.973016 11 32.854955 11.419224 37.585938 14.257812
           A 1.0001 1.0001 0 1 0 38.615234 12.542969
           C 36.274049 11.138257 33.778451 10.302605 31.517578 9.7851562
           C 31.583304 9.5349501 31.661977 9.3538231 31.736328 9.1445312
           C 32.883827 9.2845319 37.303989 9.8986933 40.330078 12.255859
           C 40.530966 12.454191 41.167937 13.419879 41.785156 14.792969
           C 42.409585 16.182095 43.092251 18.008223 43.71875 20.078125
           C 44.94318 24.123544 45.923302 29.105367 45.96875 33.673828
           C 44.812422 35.508607 42.668548 36.867546 40.476562 37.716797
           C 38.412289 38.516568 36.571749 38.793003 35.630859 38.884766
           L 34.033203 36.658203
           C 34.86819 36.390791 35.623526 36.10522 36.287109 35.816406
           C 38.812028 34.717478 40.158203 33.552734 40.158203 33.552734
           A 1.0001 1.0001 0 1 0 38.841797 32.046875
           C 38.841797 32.046875 37.788363 32.98135 35.488281 33.982422
           C 34.575634 34.379637 33.469164 34.775673 32.181641 35.113281
           A 1.0001 1.0001 0 0 0 32.138672 35.125
           C 30.189141 35.632527 27.818222 36 25 36
           C 22.20293 36 19.847555 35.638295 17.90625 35.136719
           A 1.0001 1.0001 0 0 0 17.849609 35.121094
           C 17.836929 35.117786 17.823191 35.114648 17.810547 35.111328
           A 1.0001 1.0001 0 0 0 17.800781 35.109375
           C 16.520565 34.772709 15.420357 34.377891 14.511719 33.982422
           C 12.211637 32.98135 11.158203 32.046875 11.158203 32.046875
           A 1.0001 1.0001 0 0 0 10.521484 31.791016
           A 1.0001 1.0001 0 0 0 9.8417969 33.552734
           C 9.8417969 33.552734 11.187972 34.717478 13.712891 35.816406
           C 14.376474 36.10522 15.13181 36.390791 15.966797 36.658203
           L 14.369141 38.884766
           C 13.428251 38.793006 11.587711 38.516568 9.5234375 37.716797
           C 7.3314524 36.867546 5.1875783 35.508607 4.03125 33.673828
           C 4.076698 29.105367 5.0568205 24.123544 6.28125 20.078125
           C 6.9077487 18.008223 7.5904155 16.182095 8.2148438 14.792969
           C 8.8320633 13.419879 9.4690336 12.454191 9.6699219 12.255859
           C 12.696011 9.8986933 17.116173 9.2845319 18.263672 9.1445312
           z
           M 18.5 21
           C 17.047619 21 15.834562 21.674201 15.085938 22.636719
           C 14.337312 23.599237 14 24.805556 14 26
           C 14 27.194444 14.337313 28.400763 15.085938 29.363281
           C 15.834561 30.325799 17.047619 31 18.5 31
           C 19.952381 31 21.165439 30.325799 21.914062 29.363281
           C 22.662687 28.400763 23 27.194444 23 26
           C 23 24.805556 22.662688 23.599237 21.914062 22.636719
           C 21.165439 21.674201 19.952381 21 18.5 21
           z
           M 31.5 21
           C 28.968421 21 27 23.315152 27 26
           C 27 28.684848 28.968421 31 31.5 31
           C 34.031579 31 36 28.684848 36 26
           C 36 23.315152 34.031579 21 31.5 21
           z
           M 18.5 23
           C 19.380952 23 19.917896 23.325799 20.335938 23.863281
           C 20.753979 24.400763 21 25.194444 21 26
           C 21 26.805556 20.753979 27.599237 20.335938 28.136719
           C 19.917896 28.674201 19.380952 29 18.5 29
           C 17.619048 29 17.082104 28.674201 16.664062 28.136719
           C 16.246021 27.599237 16 26.805556 16 26
           C 16 25.194444 16.246021 24.400763 16.664062 23.863281
           C 17.082104 23.325799 17.619048 23 18.5 23
           z
           M 31.5 23
           C 32.380952 23 32.917896 23.325799 33.335938 23.863281
           C 33.753979 24.400763 34 25.194444 34 26
           C 34 26.805556 33.753979 27.599237 33.335938 28.136719
           C 32.917896 28.674201 32.380952 29 31.5 29
           C 30.619048 29 30.082104 28.674201 29.664062 28.136719
           C 29.246021 27.599237 29 26.805556 29 26
           C 29 25.194444 29.246021 24.400763 29.664062 23.863281
           C 30.082104 23.325799 30.619048 23 31.5 23
           z"/>

                      </svg>
                      Discord
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationCards;
