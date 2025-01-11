'use client';
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';
import * as THREE from 'three';

const Contact: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate heading and logos
    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.5 }
    );

    gsap.to(logosRef.current, { opacity: 1, duration: 1.5, ease: 'power3.out', delay: 1.5 });
  }, []);

  return (
    <section className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* Heading */}
      <h2
        ref={headingRef}
        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-green-400 neon-text"
      >
        Contact Me
      </h2>

      {/* 3D Canvas */}
      <Canvas className="absolute top-0 left-0 w-full h-full" camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <FloatingShapes />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>

      {/* Logos */}
      <div
        ref={logosRef}
        className="flex space-x-8 md:space-x-16 mt-16 opacity-0"
      >
        <SvgLogo icon="github" />
        <SvgLogo icon="linkedin" />
        <SvgLogo icon="gmail" />
      </div>
    </section>
  );
};

// Floating Shapes Component
const FloatingShapes = () => {
  const shapesRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (shapesRef.current) {
      const time = clock.getElapsedTime();
      shapesRef.current.rotation.y = time * 0.2; // Slow rotation
    }
  });

  return (
    <group ref={shapesRef}>
      {/* Floating Sphere */}
      <mesh position={[-3, 2, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#00ccff" emissive="#00ccff" emissiveIntensity={0.5} />
      </mesh>

      {/* Floating Cube */}
      <mesh position={[3, -2, 0]}>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <meshStandardMaterial color="#ff0088" emissive="#ff0088" emissiveIntensity={0.5} />
      </mesh>

      {/* Floating Torus */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.5, 16, 100]} />
        <meshStandardMaterial color="#00ff88" emissive="#00ff88" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
};

// SvgLogo Component (Unchanged)
const SvgLogo: React.FC<{ icon: string }> = ({ icon }) => {
  let svgContent;

  switch (icon) {
    case 'github':
      svgContent = (
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="#333">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.652.242 2.873.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      );
      break;
    case 'linkedin':
      svgContent = (
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="#0077b5">
          <path d="M19 0H5a5 5 0 00-5 5v14a5 5 0 005 5h14a5 5 0 005-5V5a5 5 0 00-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"/>
        </svg>
      );
      break;
    case 'gmail':
      svgContent = (
        <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="#ea4335">
          <path d="M24 4.5v15c0 .85-.65 1.5-1.5 1.5H21V7.387l-9 6.463-9-6.463V21H1.5C.65 21 0 20.35 0 19.5v-15c0-.425.162-.8.431-1.068C.7 3.16 1.076 3 1.5 3H2l10 7.25L22 3h.5c.425 0 .8.162 1.069.432.27.268.431.643.431 1.068z"/>
        </svg>
      );
      break;
    default:
      svgContent = null;
  }

  return (
    <div className="w-12 h-12 md:w-16 md:h-16 hover:scale-110 transition-transform duration-300">
      {svgContent}
    </div>
  );
};

export default Contact;