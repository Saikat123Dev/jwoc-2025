import React, { useState } from "react";

function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send
    const emailData = {
      from: formData.email, // Sender's email
      subject: `${formData.name} (JWoC Query)`, // Name concatenated with "JWoC Query"
      text: formData.message, // User's message
    };

    try {
      const response = await fetch("https://jwoc-2025.onrender.com/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send the message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setStatus("An error occurred. Please try again later.");
    }
  };
  return (
    <footer className="relative max-w-full backdrop-blur-xl">

      <div className="absolute inset-0 bg-white/0 dark:bg-gray-900/30 backdrop-blur-md"></div>
      <div className="relative mx-auto px-4 pb-2 pt-2 sm:px-9 lg:px-8">
        {/* Logo, Archives, and Contact Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-3 items-center">
          {/* Logo Section */}
          <div class="p-6  text-white">
  <div class="flex flex-col items-center space-y-6 ">
    {/* <!-- Logo Container --> */}
    <div class="flex flex-col items-center">
  {/* <!-- Logo Container --> */}
  <div class="w-40">
    <img
      class="w-full h-full object-contain"
      src="jwoc_icon.svg"
      alt="JWoC Logo"
    />
  </div>

  {/* <!-- Divider with gradient --> */}
  <div class="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
</div>


    {/* <!-- Description with improved typography --> */}
    <div class="text-center space-y-4">
      <p class="text-sm text-gray-400">
        Empowering developers with opportunities. Join the journey of innovation and learning.
      </p>
      <p class="text-xs text-gray-500">
        &copy; JWoC {new Date().getFullYear()}. All rights reserved.
      </p>
    </div>

    {/* <!-- Social Media Links --> */}
    <div class="flex space-x-6">
      {/* <!-- GitHub --> */}
      <a
        href="https://github.com/jwoc-jgec"
        target="_blank"
        rel="noreferrer"
        class="text-gray-400 hover:text-teal-400 transition transform hover:scale-110"
        aria-label="GitHub"
      >
        <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.111.793-.261.793-.577v-2.234c-3.338.726-4.043-1.416-4.043-1.416-.546-1.385-1.333-1.753-1.333-1.753-1.09-.745.082-.729.082-.729 1.205.084 1.838 1.237 1.838 1.237 1.07 1.834 2.809 1.304 3.495.997.108-.774.418-1.304.762-1.605-2.665-.305-5.467-1.332-5.467-5.93 0-1.31.467-2.382 1.235-3.222-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.044.137 3.003.404 2.292-1.553 3.3-1.23 3.3-1.23.653 1.653.241 2.874.118 3.176.77.84 1.233 1.912 1.233 3.222 0 4.61-2.805 5.623-5.478 5.92.43.37.823 1.096.823 2.21v3.287c0 .32.19.694.8.577C20.565 21.797 24 17.302 24 12c0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
      {/* discord */}
      <a
        href="https://discord.gg/VW83TAydPx"
        target="_blank"
        rel="noreferrer"
        class="text-gray-400 hover:text-teal-400 transition transform hover:scale-110"
        aria-label="Discord"
      >
         <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="currentColor">
  <path d="M41.625 10.77C37.645 7.566 31.348 7.023 31.078 7.004c-.418-.036-.817.199-.988.586-.016.024-.152.34-.304.832 2.633.446 5.867 1.34 8.793 3.156.469.29.613.906.324 1.375a1.06 1.06 0 0 1-1.53.153C37.492 10.156 31.211 10 25 10c-6.21 0-12.496.156-17.523 3.277-.469.293-1.086.148-1.375-.32-.293-.472-.148-1.086.32-1.375C14.348 9.766 17.582 8.868 20.215 8.426 20.062 7.93 19.926 7.617 19.914 7.59c-.176-.387-.57-.63-.992-.586-.27.02-6.566.563-10.601 3.809C6.215 12.762 2 24.152 2 34c0 .176.047.344.133.496 2.906 5.11 10.84 6.445 12.648 6.504h.03c.32 0 .621-.152.808-.41l1.828-2.516C12.516 36.8 9.996 34.637 9.852 34.508c-.414-.364-.453-.996-.086-1.41.363-.414.996-.453 1.41-.086.059.055 4.7 3.993 13.824 3.993 9.14 0 13.78-3.954 13.828-3.993.414-.36 1.043-.324 1.41.094.364.414.324 1.043-.086 1.41-.144.129-2.664 2.293-7.598 3.566l1.828 2.516c.188.258.488.41.808.41h.031c1.808-.059 9.742-1.395 12.648-6.504.086-.152.133-.32.133-.496 0-9.848-4.215-21.238-6.375-23.23zM18.5 30c-1.934 0-3.5-1.79-3.5-4s1.566-4 3.5-4 3.5 1.79 3.5 4-1.566 4-3.5 4zm13 0c-1.934 0-3.5-1.79-3.5-4s1.566-4 3.5-4 3.5 1.79 3.5 4-1.566 4-3.5 4z"></path>
</svg>
      </a>


      {/* { x handle} */}
      <a
        href="https://x.com/TeamJWOC?t=msjFL2XnU0tCeaqGZbTSAQ&s=08"
        target="_blank"
        rel="noreferrer"
        class="text-gray-400 hover:text-teal-400 transition transform hover:scale-110"
        aria-label="X-handle"
      >
     <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" fill="currentColor">
  <path d="M11 4C7.146 4 4 7.146 4 11v28c0 3.854 3.146 7 7 7h28c3.854 0 7-3.146 7-7V11c0-3.854-3.146-7-7-7H11zm0 2h28c2.774 0 5 2.226 5 5v28c0 2.774-2.226 5-5 5H11c-2.774 0-5-2.226-5-5V11c0-2.774 2.226-5 5-5zm2.086 9h9.222L22.31 26.104 13 37h2.5l7.938-9.293L29.977 37h7.938l-10.125-14.387L36 13h-2.5l-6.84 8.01L21.023 13h-7.937zM16.914 15h3.064L34.086 35h-3.064L16.914 15z"></path>
</svg>

      </a>
      {/* <!-- Twitter -->
      <a
        href="#"
        target="_blank"
        rel="noreferrer"
        class="text-gray-400 hover:text-blue-400 transition transform hover:scale-110"
        aria-label="Twitter"
      >
        <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23.953 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.949.555-2.005.959-3.127 1.184-.897-.956-2.178-1.555-3.594-1.555-2.723 0-4.932 2.209-4.932 4.932 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.708.87 3.215 2.188 4.099-.807-.026-1.566-.247-2.228-.616v.061c0 2.385 1.697 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.623-.03-.924-.086.631 1.953 2.445 3.376 4.6 3.415-1.685 1.319-3.809 2.105-6.102 2.105-.396 0-.788-.023-1.175-.067 2.179 1.396 4.768 2.212 7.557 2.212 9.054 0 14.004-7.496 14.004-13.986 0-.213-.005-.425-.014-.637.961-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      </a> */}

      {/* <!-- LinkedIn --> */}
      <a
        href="https://www.linkedin.com/company/jwoc/posts/?feedView=all"
        target="_blank"
        rel="noreferrer"
        class="text-gray-400 hover:text-teal-400 transition transform hover:scale-110"
        aria-label="LinkedIn"
      >
        <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.27c-.97 0-1.75-.78-1.75-1.73s.78-1.73 1.75-1.73 1.75.78 1.75 1.73-.78 1.73-1.75 1.73zm13.5 10.27h-3v-4.5c0-1.08-.92-1.5-1.5-1.5-.84 0-1.5.67-1.5 1.5v4.5h-3v-9h3v1.08c.83-.74 2.03-1.08 3.14-1.08 2.48 0 3.36 1.73 3.36 4v5z" />
        </svg>
      </a>
    </div>
  </div>
</div>


          {/* Archives Section */}
          <div className="  p-6 flex items-center justify-center">
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
                           group-hover:opacity-20 transition-all duration-100 blur"
                    ></div>
                    <a
                      href="https://jwoc-5.vercel.app/"
                      className="relative flex items-center text-lg text-gray-100 hover:text-white transition duration-300
                                  transform group-hover:translate-x-2"
                    >
                      <span
                        className="absolute left-0 opacity-0 -translate-x-2 text-blue-400 group-hover:opacity-100
                              group-hover:translate-x-0 transition-all duration-100"
                      >
                        →
                      </span>
                      <span className="ml-6 font-medium">Jwoc 2024</span>
                    </a>
                  </li>

                  <li className="relative group">
                    <div
                      className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0
                           group-hover:opacity-20 transition-all duration-100 blur"
                    ></div>
                    <a
                      href="https://jwoc-2k23.vercel.app/"
                      className="relative flex items-center text-lg text-gray-100 hover:text-white transition duration-100
                                  transform group-hover:translate-x-2"
                    >
                      <span
                        className="absolute left-0 opacity-0 -translate-x-2 text-blue-400 group-hover:opacity-100
                              group-hover:translate-x-0 transition-all duration-100"
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
                      href="https://jwoc-2k22.vercel.app/"
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
                      href="https://jwoc-2k21.vercel.app/"
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
                  <li className="relative group">
                    <div
                      className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg opacity-0
                           group-hover:opacity-20 transition-all duration-300 blur"
                    ></div>
                    <a
                      href="https://jwoc-2k20.vercel.app/"
                      className="relative flex items-center text-lg text-gray-100 hover:text-white transition duration-300
                                  transform group-hover:translate-x-2"
                    >
                      <span
                        className="absolute left-0 opacity-0 -translate-x-2 text-blue-400 group-hover:opacity-100
                              group-hover:translate-x-0 transition-all duration-300"
                      >
                        →
                      </span>
                      <span className="ml-6 font-medium">Jwoc 2020</span>
                    </a>
                  </li>

                </ul>
              </div>
            </div>



          {/* Contact Form Section */}
          <div className=" p-8">
            <div className="backdrop-blur-xl bg-white/10 p-6 rounded-2xl shadow-2xl border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-white text-center">
                Contact Us
              </h3>

              <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-blue-100"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border h-10 border-white/10 bg-white/5 p-3 text-white placeholder-blue-200/60 backdrop-blur-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition-all duration-200 hover:bg-white/10"
                  placeholder="Bhupendra Jogi"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-blue-100"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-10 rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder-blue-200/60 backdrop-blur-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition-all duration-200 hover:bg-white/10"
                  placeholder="Bhupendra@doe.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-blue-100"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={2}
                  className="w-full rounded-lg border border-white/10 bg-white/5 p-3 text-white placeholder-blue-200/60 backdrop-blur-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 focus:outline-none transition-all duration-200 hover:bg-white/10 resize-none"
                  placeholder="Your message here..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 px-4 py-3 text-base font-medium text-white shadow-lg transition-all duration-200 hover:from-blue-500 hover:to-purple-600 hover:shadow-xl focus:ring-2 focus:ring-purple-300 focus:ring-opacity-50 focus:outline-none transform hover:-translate-y-0.5"
              >
                Send Message
              </button>
            </form>
            {status && (
              <p className="text-center text-sm mt-4 text-blue-200">{status}</p>
            )}
            </div>
          </div>
        </div>


      </div>
    </footer>
  );
}

export default Footer;
