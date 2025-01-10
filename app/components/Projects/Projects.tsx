'use client';
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

const ProjectsPage: React.FC = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  // GSAP Animations on Load
  useEffect(() => {
    // Animate the heading
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.5 }
    );

    // Animate the cards
    gsap.fromTo(
      cardsRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 1,
      }
    );
  }, []);

  // Project Data
  const projects = [
    {
      title: '3D Portfolio',
      description: 'A fully interactive 3D portfolio built with Three.js and React.',
      image: '/images/project1.jpg',
      link: '#',
    },
    {
      title: 'AI Animation Tool',
      description: 'An AI-powered tool for creating dynamic animations and visuals.',
      image: '/images/project2.jpg',
      link: '#',
    },
    {
      title: 'E-Commerce Platform',
      description: 'A modern e-commerce platform with a responsive design and seamless user experience.',
      image: '/images/project3.jpg',
      link: '#',
    },
    {
      title: 'Interactive Dashboard',
      description: 'A data visualization dashboard with real-time analytics and interactive charts.',
      image: '/images/project4.jpg',
      link: '#',
    },
  ];

  return (
    <section
      ref={projectsRef}
      className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <ThreeScene />
        </Canvas>
      </div>

      {/* Projects Content */}
      <div className="flex flex-col items-center justify-center text-center z-10 p-4 w-full max-w-6xl">
        <h2
          ref={headingRef}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el!)}
              className="relative p-6 rounded-lg shadow-lg border border-gray-800 hover:scale-105 transition-transform duration-300"
            >
              <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
              <div className="relative z-10">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-lg text-gray-300 mb-4">{project.description}</p>
                <a
                  href={project.link}
                  className="inline-block px-6 py-3 bg-purple-500 text-white font-bold rounded-lg hover:bg-purple-600 transition-colors"
                >
                  View Project
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// 3D Scene Component
const ThreeScene: React.FC = () => {
  const tetrahedronRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (tetrahedronRef.current) {
      // Rotate the tetrahedron
      tetrahedronRef.current.rotation.x += 0.005;
      tetrahedronRef.current.rotation.y += 0.005;
    }
    if (particlesRef.current) {
      // Move particles in a wave pattern
      const positions = particlesRef.current.geometry.attributes.position.array;
      const time = clock.getElapsedTime();

      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] = Math.sin(time + positions[i] * 0.5) * 2;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      {/* Tetrahedron (3D Triangle) */}
      <mesh ref={tetrahedronRef} position={[0, 0, 0]}>
        <tetrahedronGeometry args={[2, 0]} />
        <meshStandardMaterial color={0x00ff00} emissive={0x00ff00} emissiveIntensity={0.5} wireframe />
      </mesh>
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
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
    </>
  );
};

export default ProjectsPage;