'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TextDecoderProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

const GLITCH_CHARS = 'X#@01';

export default function TextDecoder({
  text,
  className = '',
  delay = 0,
  speed = 50,
}: TextDecoderProps) {
  const [displayText, setDisplayText] = useState('');
  const [isDecoding, setIsDecoding] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    let animationFrameId: number;
    let timeoutId: NodeJS.Timeout;

    const decode = () => {
      if (currentIndex <= text.length) {
        const decoded = text.slice(0, currentIndex);
        const remaining = text.slice(currentIndex);
        
        // Generate glitch characters for remaining text
        const glitched = remaining
          .split('')
          .map(() => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)])
          .join('');

        setDisplayText(decoded + glitched);
        currentIndex++;

        timeoutId = setTimeout(() => {
          animationFrameId = requestAnimationFrame(decode);
        }, speed);
      } else {
        setIsDecoding(false);
      }
    };

    const startTimeout = setTimeout(() => {
      decode();
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(timeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [text, delay, speed]);

  return (
    <motion.span
      className={`${className} ${isDecoding ? 'text-cyan-glow' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
    </motion.span>
  );
}
