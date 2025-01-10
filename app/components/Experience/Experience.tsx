'use client';
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

const ExperiencePage: React.FC = () => {
  const experienceRef = useRef<HTMLDivElement>(null);
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

  // Experience Data
  const experiences = [
    {
      company: 'AS Technologies',
      role: 'Web Developer',
      duration: '02/2024 - 07/2024',
      location: 'Palampur, Himachal Pradesh',
      achievements: [
        'Increased user engagement of the company website, resulting in higher customer retention rates.',
        'Managed website development and social media handling.',
      ],
      color: '#8A2BE2', // Purple
    },
    {
      company: 'Mitisha Softech Private Limited',
      role: 'Web Developer',
      duration: '10/2023 - 01/2024',
      location: 'Los Angeles, CA',
      achievements: [
        'Designed, developed, and launched online web applications and templates.',
        'Developed fully responsive and platform-independent web applications.',
        'Used HTML, CSS, JavaScript, and other technologies to build and edit websites.',
      ],
      color: '#FF6F61', // Coral
    },
    {
      company: 'Excellence Technologies',
      role: 'MERN Stack Intern',
      duration: '12/2022 - 07/2023',
      location: 'Hamirpur, Himachal Pradesh',
      achievements: [
        'Developed and maintained code for websites using HTML, CSS, JavaScript, and MERN Stack.',
        'Collaborated with a team of senior developers, gaining valuable teamwork experience.',
      ],
      color: '#00CED1', // Dark Turquoise
    },
  ];

  return (
    <section
      ref={experienceRef}
      className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden"
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas>
          <ParticleTunnel />
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
        </Canvas>
      </div>

      {/* Experience Content */}
      <div className="flex flex-col items-center justify-center text-center z-10 p-4 w-full max-w-6xl">
        <h2
          ref={headingRef}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Experience
        </h2>
        <div className="w-full space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              ref={(el) => (cardsRef.current[index] = el!)}
              className="relative p-6 rounded-lg shadow-lg border border-gray-800 hover:scale-105 transition-transform duration-300"
              style={{ backgroundColor: exp.color }}
            >
              <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {exp.role} @ {exp.company}
                </h3>
                <p className="text-lg text-gray-200 mb-4">
                  {exp.duration} | {exp.location}
                </p>
                <ul className="text-left list-disc list-inside text-gray-200">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i} className="mb-2">
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Particle Tunnel Background Component
const ParticleTunnel: React.FC = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.02,
  });

  // Create particle system
  const vertices = [];
  const numParticles = 2000;
  const radius = 10;
  const height = 50;

  for (let i = 0; i < numParticles; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.sqrt(Math.random()) * radius;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const y = (Math.random() - 0.5) * height;

    vertices.push(x, y, z);
  }

  particlesGeometry.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(vertices, 3)
  );

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      const positions = particlesGeometry.attributes.position.array;
      const time = clock.getElapsedTime();

      for (let i = 0; i < positions.length; i += 3) {
        // Move particles in a spiral pattern
        const angle = (i / positions.length) * Math.PI * 2 + time * 0.1;
        const radius = 10 + Math.sin(angle) * 2;
        positions[i] = Math.cos(angle) * radius;
        positions[i + 2] = Math.sin(angle) * radius;
      }
      particlesGeometry.attributes.position.needsUpdate = true;
    }
  });

  return <points ref={particlesRef} geometry={particlesGeometry} material={particlesMaterial} />;
};

export default ExperiencePage;