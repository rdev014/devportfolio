'use client'; // Mark as Client Component

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { Font } from 'three/examples/jsm/loaders/FontLoader.js'; // Import Font type
import gsap from 'gsap';
import Typewriter from './Typewriter';

const HeroSection: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mount = mountRef.current; // Store mountRef.current in a variable
    if (!mount) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Dark background

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Improve rendering on high-DPI screens
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft ambient light
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Interactive Particle System
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1000;
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x00ffff, // Cyan color
      size: 0.1,
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Load Font and Create 3D Text
    const fontLoader = new FontLoader();
    fontLoader.load('/fonts/helvetiker_regular.typeface.json', (font: Font) => {
      const textGeometry = new TextGeometry('Rahul Dev', {
        font: font,
        size: 1,
        height: 0.2,
      });
      const textMaterial = new THREE.MeshPhongMaterial({ color: 0xffd700 }); // Gold color
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(-4, 0, 0); // Center the text
      scene.add(textMesh);

      // GSAP Animation: Rotate text
      gsap.to(textMesh.rotation, {
        y: Math.PI * 2,
        duration: 10,
        repeat: -1,
        ease: 'none',
      });

      // GSAP Animation: Float text up and down
      gsap.to(textMesh.position, {
        y: '+1',
        duration: 3,
        yoyo: true,
        repeat: -1,
        ease: 'power1.inOut',
      });
    });

    // Mouse Interaction for Particles
    const mouse = new THREE.Vector2();
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Touch Interaction for Particles (Mobile-Friendly)
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('touchmove', onTouchMove);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate particles
      particles.rotation.x += 0.001;
      particles.rotation.y += 0.001;

      // Move particles based on mouse/touch position
      const positions = particles.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += mouse.x * 0.01; // Move particles on X-axis
        positions[i + 1] += mouse.y * 0.01; // Move particles on Y-axis
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Handle Window Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      if (mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Add hover animation to the button
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const onMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const onMouseLeave = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    button.addEventListener('mouseenter', onMouseEnter);
    button.addEventListener('mouseleave', onMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', onMouseEnter);
      button.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Scene */}
      <div ref={mountRef} className="absolute inset-0 z-0" />

      {/* Content */}
      <div className="relative z-10 text-center">
        <Typewriter />
        <p className="mt-4 text-lg text-gray-300 font-light p-2">
          I create stunning, interactive, and user-friendly experiences.
        </p>
        <button
          ref={buttonRef}
          className="mt-8 px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-all transform shadow-lg hover:shadow-xl neon-button"
        >
          View My Work
        </button>
      </div>
    </section>
  );
};

export default HeroSection;