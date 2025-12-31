'use client';

import { useEffect, useState } from 'react';

interface MouseGlowProps {
  color?: string;
  size?: number;
  opacity?: number;
}

export default function MouseGlow({
  color = 'rgba(220, 38, 38, 0.12)',
  size = 400,
  opacity = 1,
}: MouseGlowProps) {
  const [position, setPosition] = useState({ x: -1000, y: -1000 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
      style={{ opacity: isVisible ? opacity : 0 }}
    >
      <div
        className="absolute rounded-full transition-all duration-150 ease-out"
        style={{
          left: position.x,
          top: position.y,
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  );
}
