'use client'; // Mark as Client Component

import React from 'react';

const SocialIcons = () => {
  return (
    <div className="flex space-x-6">
      {/* GitHub Icon */}
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-12 h-12 flex items-center justify-center bg-gray-800 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-6"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 rounded-full text-white relative z-10 transform group-hover:rotate-12 transition-transform duration-300"
        >
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </a>

      {/* LinkedIn Icon */}
      <a
        href="https://linkedin.com/in/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative w-12 h-12 flex items-center justify-center bg-blue-600 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:-rotate-6"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-700 to-blue-900 rounded-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 rounded-full text-white relative z-10 transform group-hover:-rotate-12 transition-transform duration-300"
        >
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </a>

      {/* Gmail Icon */}
      <a
        href="mailto:youremail@gmail.com"
        className="group relative w-12 h-12 flex items-center justify-center bg-red-600 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-6"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-red-700 to-red-900 rounded-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-8 h-8 rounded-full text-white relative z-10 transform group-hover:rotate-12 transition-transform duration-300"
        >
          <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.387l-9 6.463-9-6.463V21H1.5C.649 21 0 20.35 0 19.5v-15c0-.425.162-.8.431-1.068C.7 3.16 1.076 3 1.5 3H2l10 7.25L22 3h.5c.425 0 .8.162 1.069.432.27.268.431.643.431 1.068z" />
        </svg>
      </a>
    </div>
  );
};

export default SocialIcons;