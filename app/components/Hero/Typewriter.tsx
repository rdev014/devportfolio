'use client'; // Mark as Client Component

import React, { useEffect, useState } from 'react';

const Typewriter: React.FC = () => {
  const [text, setText] = useState<string>('');
  const phrases: string[] = ['Developer', 'Designer', 'Creative Thinker'];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      // Typing logic
      if (text.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length + 1));
        }, 150); // Typing speed
      } else {
        // Start deleting after a delay
        timeout = setTimeout(() => setIsDeleting(true), 1000); // Pause before deleting
      }
    } else {
      // Deleting logic
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText(currentPhrase.slice(0, text.length - 1));
        }, 50); // Deleting speed
      } else {
        // Move to the next phrase after deleting
        setIsDeleting(false);
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    // Cleanup timeout on unmount or dependency change
    return () => clearTimeout(timeout);
  }, [text, isDeleting, currentPhraseIndex, phrases]);

  return (
    <h1 className="text-5xl md:text-7xl font-bold text-white">
      Hi, I am: <span className="text-green-400 neon-text">{text}</span>
    </h1>
  );
};

export default Typewriter;