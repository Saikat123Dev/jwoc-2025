import React from "react";

function Footer() {
  return (
    <div>
      <footer className="relative min-w-full bg-gradient-to-b from-transparent to-gray-900/30 backdrop-blur-xl">
        <div className="absolute inset-0 bg-white/0 dark:bg-gray-900/30 backdrop-blur-md"></div>

        <div className="relative mx-auto px-4 pb-8 pt-6 sm:px-6 lg:px-8">
          {/* Logo and Newsletter Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 gap-5 items-center">
            {/* Logo Section */}
            <div className="min-h-screen  p-8">
              <div className="max-w-4xl mx-auto flex flex-col items-center space-y-12 pt-16">
                {/* Logo Section with enhanced glow */}

                {/* Header Section with enhanced animation */}
                <div className="text-center space-y-3 ">
                  <div className="relative group px-4 flex items-center justify-center">
                    {/* Logo Container */}
                    <div className=" w-56 h-56">
                      <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 rounded-full flex items-center justify-center transform transition duration-500 group-hover:scale-105 group-hover:rotate-6">
                        {/* Inner circle with enhanced depth */}
                        <div className="w-52 h-52 rounded-full  flex items-center justify-center p-1 shadow-2xl">
                          <div className="w-full h-full rounded-full bg-black flex items-center justify-center border border-purple-500/20">
                            {/* Logo text with enhanced styling */}
                            <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 tracking-tight animate-gradient">
                              JWoC
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider with gradient */}
                  <div className="w-24 h-1 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>

                  {/* Description with improved typography */}
                  <p className="text-gray-300 text-lg leading-relaxed px-4 font-light">
                    Join Winter of Code (JWoC) is an open-source program
                    organized by JGEC Winter of Code that helps students
                    understand the paradigm of Open Source contribution and
                    become a part of the thriving developer community.
                  </p>
                </div>
              </div>
            </div>

            <div className="min-h-screen  p-6 flex items-center justify-center">
              <div
                className="w-full max-w-md backdrop-blur-xl bg-white/5 p-8 rounded-2xl shadow-2xl border border-white/10 
                      transform hover:scale-[1.02] transition-all duration-300"
              >
                <strong
                  className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 
                          font-extrabold tracking-wide"
                >
                  Archives
                </strong>

                <ul className="mt-8 space-y-4">
                  <li className="relative group">
                    <div
                      className="absolute -inset-2  rounded-lg opacity-0 
                           group-hover:opacity-20 transition-all duration-300 blur"
                    ></div>
                    <a
                      href="#"
                      className="relative flex items-center text-lg text-gray-100 hover:text-white transition duration-300
                                  transform group-hover:translate-x-2"
                    >
                      <span
                        className="absolute left-0 opacity-0 -translate-x-2 text-blue-400 group-hover:opacity-100 
                              group-hover:translate-x-0 transition-all duration-300"
                      >
                        →
                      </span>
                      <span className="ml-6 font-medium">Jwoc Archives</span>
                    </a>
                  </li>

                  <li className="relative group">
                    <div
                      className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0 
                           group-hover:opacity-20 transition-all duration-300 blur"
                    ></div>
                    <a
                      href="#"
                      className="relative flex items-center text-lg text-gray-100 hover:text-white transition duration-300
                                  transform group-hover:translate-x-2"
                    >
                      <span
                        className="absolute left-0 opacity-0 -translate-x-2 text-blue-400 group-hover:opacity-100 
                              group-hover:translate-x-0 transition-all duration-300"
                      >
                        →
                      </span>
                      <span className="ml-6 font-medium">Jwoc 2024</span>
                    </a>
                  </li>

                  <li className="relative group">
                    <div
                      className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0 
                           group-hover:opacity-20 transition-all duration-300 blur"
                    ></div>
                    <a
                      href="#"
                      className="relative flex items-center text-lg text-gray-100 hover:text-white transition duration-300
                                  transform group-hover:translate-x-2"
                    >
                      <span
                        className="absolute left-0 opacity-0 -translate-x-2 text-blue-400 group-hover:opacity-100 
                              group-hover:translate-x-0 transition-all duration-300"
                      >
                        →
                      </span>
                      <span className="ml-6 font-medium">Jwoc 2023</span>
                    </a>
                  </li>

                  <li className="relative group">
                    <div
                      className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0 
                           group-hover:opacity-20 transition-all duration-300 blur"
                    ></div>
                    <a
                      href="#"
                      className="relative flex items-center text-lg text-gray-100 hover:text-white transition duration-300
                                  transform group-hover:translate-x-2"
                    >
                      <span
                        className="absolute left-0 opacity-0 -translate-x-2 text-blue-400 group-hover:opacity-100 
                              group-hover:translate-x-0 transition-all duration-300"
                      >
                        →
                      </span>
                      <span className="ml-6 font-medium">Jwoc 2022</span>
                    </a>
                  </li>

                  <li className="relative group">
                    <div
                      className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0 
                           group-hover:opacity-20 transition-all duration-300 blur"
                    ></div>
                    <a
                      href="#"
                      className="relative flex items-center text-lg text-gray-100 hover:text-white transition duration-300
                                  transform group-hover:translate-x-2"
                    >
                      <span
                        className="absolute left-0 opacity-0 -translate-x-2 text-blue-400 group-hover:opacity-100 
                              group-hover:translate-x-0 transition-all duration-300"
                      >
                        →
                      </span>
                      <span className="ml-6 font-medium">Jwoc 2021</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form Section */}

            <div className="w-full backdrop-blur-xl bg-white/10 p-8 rounded-2xl shadow-2xl border border-white/20">
              <h3 className="text-3xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-white">
                Contact Us
              </h3>

              <form className="space-y-3">
                <div className="space-y-1">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-blue-100"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder-blue-200/60 backdrop-blur-sm 
                         focus:border-blue-300 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none
                         transition-all duration-200 hover:bg-white/10"
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="contact-email"
                    className="block text-sm font-medium text-blue-100"
                  >
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder-blue-200/60 backdrop-blur-sm 
                         focus:border-blue-300 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none
                         transition-all duration-200 hover:bg-white/10"
                    placeholder="john@doe.com"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-blue-100"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full rounded-xl border border-white/10 bg-white/5 p-4 text-white placeholder-blue-200/60 backdrop-blur-sm 
                         focus:border-blue-300 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none
                         transition-all duration-200 hover:bg-white/10 resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-blue-400 to-purple-500 px-6 py-4 text-base font-medium text-white 
                     shadow-lg transition-all duration-200 hover:from-blue-500 hover:to-purple-600 hover:shadow-xl
                     focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50 focus:outline-none
                     transform hover:-translate-y-0.5"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-2 border-t border-gray-100/20 pt-8 dark:border-gray-800/20">
            <ul className="flex justify-center gap-6 sm:justify-end">
              <li className="transition transform hover:scale-125">
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-teal-700 transition transform hover:text-teal-400 hover:scale-90 dark:text-teal-500 dark:hover:text-teal-500/75"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="size-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

              <li className="transition transform hover:scale-125">
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-teal-700 transition hover:text-teal-400 dark:text-teal-500 dark:hover:text-teal-500/75"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="size-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

        

              <li className="transition transform hover:scale-125">
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-teal-700 transition hover:text-teal-400 dark:text-teal-500 dark:hover:text-teal-500/75"
                >
                  <span className="sr-only">GitHub</span>
                  <svg
                    className="size-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>

            
            </ul>
            <p className="text-center text-xs/relaxed text-gray-300 dark:text-gray-400">
              © JWoC 2024. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
