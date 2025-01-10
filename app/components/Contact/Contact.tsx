'use client';
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Stars } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

const ContactPage: React.FC = () => {
  const contactRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // GSAP Animations on Load
  useEffect(() => {
    // Animate the heading
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.5 }
    );

    // Animate the form
    gsap.fromTo(
      formRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 1 }
    );
  }, []);

  return (
    <section
      ref={contactRef}
      className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <FloatingGlobe />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
        </Canvas>
      </div>

      {/* Contact Content */}
      <div className="flex flex-col items-center justify-center text-center z-10 p-4 w-full max-w-4xl">
        <h2
          ref={headingRef}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Contact Me
        </h2>
        <form
          ref={formRef}
          className="w-full bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-800"
        >
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <label htmlFor="name" className="text-lg text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="text-lg text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="message" className="text-lg text-gray-300">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="p-3 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your message"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-lg hover:opacity-90 transition-opacity duration-300"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

// Floating Globe Component
const FloatingGlobe: React.FC = () => {
  const globeRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (globeRef.current) {
      // Rotate the globe
      globeRef.current.rotation.y += 0.005;
    }
    if (particlesRef.current) {
      // Move particles in a circular pattern
      const time = clock.getElapsedTime();
      const positions = particlesRef.current.geometry.attributes.position.array;

      for (let i = 0; i < positions.length; i += 3) {
        const angle = (i / positions.length) * Math.PI * 2 + time * 0.1;
        const radius = 5 + Math.sin(angle) * 2;
        positions[i] = Math.cos(angle) * radius;
        positions[i + 2] = Math.sin(angle) * radius;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      {/* Globe */}
      <Sphere ref={globeRef} args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color={0x00ff00}
          emissive={0x00ff00}
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </Sphere>

      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={1000}
            array={new Float32Array(3000)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial color={0xffffff} size={0.02} />
      </points>
    </>
  );
};

export default ContactPage;