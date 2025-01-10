'use client';
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

const Skills: React.FC = () => {
  const skillsSectionRef = useRef<HTMLDivElement>(null);

  // GSAP Animation for Skills Section Visibility
  useEffect(() => {
    gsap.fromTo(
      skillsSectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', delay: 0.5 }
    );
  }, []);

  // List of Technologies
  const technologies = [
    { name: 'HTML', icon: '🟧' },
    { name: 'CSS', icon: '🟦' },
    { name: 'JavaScript', icon: '🟨' },
    { name: 'ReactJS', icon: '⚛️' },
    { name: 'NodeJS', icon: '🟢' },
    { name: 'ExpressJS', icon: '🚀' },
    { name: 'MongoDB', icon: '🍃' },
    { name: 'NextJS', icon: '⏭️' },
    { name: 'Docker', icon: '🐳' },
    { name: 'GitHub', icon: '🐙' },
  ];

  return (
    <section
      id="skills"
      className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <ThreeScene />
        </Canvas>
      </div>

      {/* Skills Content */}
      <div
        ref={skillsSectionRef}
        className="flex flex-col items-center justify-center text-center z-10 p-4"
      >
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8  text-green-400 neon-text">
          Skills
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-2xl mx-auto text-gray-300">
          Here are the technologies I have experience with:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full max-w-6xl px-4">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="bg-gray-900 p-4 md:p-6 rounded-lg shadow-lg flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 border border-gray-800"
            >
              <span className="text-4xl md:text-5xl mb-4">{tech.icon}</span>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-100">{tech.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 3D Scene Component
const ThreeScene: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01; // Rotate the 3D object
    }
  });

  // Add hover effect
  const handleHover = () => {
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, { x: 1.2, y: 1.2, z: 1.2, duration: 0.3 });
    }
  };

  const handleLeave = () => {
    if (meshRef.current) {
      gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
    }
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={2} />
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}
        onPointerOver={handleHover}
        onPointerOut={handleLeave}
      >
        <torusGeometry args={[1.5, 0.5, 16, 100]} /> {/* 3D Torus Shape */}
        <meshStandardMaterial color="purple" emissive="purple" emissiveIntensity={1} />
      </mesh>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
    </>
  );
};

export default Skills;