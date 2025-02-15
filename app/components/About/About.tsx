'use client';
import React, { useState, useRef, useEffect } from 'react';
import { FaReact, FaNodeJs, FaJs, FaCss3, FaGit, FaGithub } from 'react-icons/fa';
import { SiThreedotjs, SiTypescript } from 'react-icons/si';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';

const AboutMe: React.FC = () => {
  const [isBulbOn, setIsBulbOn] = useState(false);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const threadRef = useRef<HTMLDivElement>(null);
  const bulbRef = useRef<HTMLDivElement>(null);

  // GSAP Animation for About Section Visibility
  useEffect(() => {
    if (isBulbOn) {
      gsap.fromTo(
        aboutSectionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 0.9, y: 0, duration: 0.5, ease: 'power2.out' } // Faster animation and transparency
      );
    } else {
      gsap.to(aboutSectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 0.3, // Faster fade-out
        ease: 'power2.in',
      });
    }
  }, [isBulbOn]);

  // Intersection Observer for automatic animation
  useEffect(() => {
    const aboutSectionNode = aboutSectionRef.current; // Store the ref value in a variable

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsBulbOn(true);
            gsap.to(blobRef.current, {
              y: 48,
              duration: 1,
              ease: 'power2.out',
            });
            gsap.to(threadRef.current, {
              height: 64,
              duration: 1,
              ease: 'power2.out',
            });
            gsap.to(bulbRef.current, {
              backgroundColor: '#fbbf24',
              boxShadow: '0 0 80px 30px rgba(255,255,0,0.8)',
              duration: 1,
              ease: 'power2.out',
            });
          } else {
            setIsBulbOn(false);
            gsap.to(blobRef.current, {
              y: 0,
              duration: 1,
              ease: 'power2.out',
            });
            gsap.to(threadRef.current, {
              height: 128,
              duration: 1,
              ease: 'power2.out',
            });
            gsap.to(bulbRef.current, {
              backgroundColor: '#374151',
              boxShadow: 'none',
              duration: 1,
              ease: 'power2.out',
            });
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the section is visible
      }
    );

    if (aboutSectionNode) {
      observer.observe(aboutSectionNode);
    }

    return () => {
      if (aboutSectionNode) {
        observer.unobserve(aboutSectionNode);
      }
    };
  }, []); // Empty dependency array ensures this runs only once

  // 3D Scene Component
  const ThreeScene: React.FC = () => {
    return (
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={isBulbOn ? 1 : 0} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={2} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={isBulbOn} />
      </Canvas>
    );
  };

  return (
    <>
      <section
        id="about"
        className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white flex flex-col md:flex-row items-center justify-center relative overflow-hidden"
      >
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <ThreeScene />
        </div>

        {/* Bulb and Thread Section (Left Side) */}
        <div className="flex-1 flex flex-col items-center justify-center h-screen relative z-10">
          {/* Professional Blob with Arrow Indicator */}
          <div
            ref={blobRef}
            className="w-12 h-12 bg-purple-500 rounded-full cursor-pointer flex items-center justify-center shadow-lg"
          >
            <span className="text-2xl font-bold">↓</span>
          </div>

          {/* Realistic Thread */}
          <div
            ref={threadRef}
            className="w-1 bg-gray-600 h-32"
          ></div>

          {/* Realistic Bulb */}
          <div
            ref={bulbRef}
            className="w-28 h-28 rounded-full flex items-center justify-center border-4 border-gray-700 bg-gray-700"
          >
            <div className="w-8 h-8 bg-white rounded-full opacity-0"></div>
          </div>

          {/* Bulb Stand */}
          <div className="w-6 h-20 bg-gray-600 mt-2"></div>
        </div>

        {/* About Section (Right Side, Visible only when Bulb is On) */}
        <div
          ref={aboutSectionRef}
          className="flex-1 flex items-center justify-center h-screen bg-gray-900/30 backdrop-blur-md opacity-0 pointer-events-none z-10"
        >
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-4xl font-bold mb-8">About Me</h2>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg mb-6">
                Hi, I&apos;m <span className="text-purple-500 font-bold">Rahul Dev</span>, a passionate front-end developer with a love for creating stunning, interactive, and user-friendly experiences. I specialize in modern web technologies like React, Three.js, and TypeScript.
              </p>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold mb-4">Skills & Technologies</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
                    <FaReact className="text-blue-500" />
                    <span>React</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
                    <SiThreedotjs className="text-green-500" />
                    <span>Three.js</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
                    <SiTypescript className="text-blue-500" />
                    <span>TypeScript</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
                    <FaNodeJs className="text-green-600" />
                    <span>Node.js</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
                    <FaJs className="text-yellow-400" />
                    <span>JavaScript</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
                    <FaCss3 className="text-blue-400" />
                    <span>CSS3</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
                    <FaGit className="text-orange-500" />
                    <span>Git</span>
                  </div>
                  <div className="flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-lg">
                    <FaGithub className="text-white" />
                    <span>GitHub</span>
                  </div>
                </div>
              </div>
              <a
                href="/resume.pdf"
                download
                className="inline-block px-6 py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition-colors"
              >
                Download Resume
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutMe;