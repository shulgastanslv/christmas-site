'use client';

import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
}

export default function Snow() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const initialSnowflakes: Snowflake[] = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: -(Math.random() * 100),
      size: Math.random() * 4 + 2,
      speed: Math.random() * 1 + 0.5,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    setSnowflakes(initialSnowflakes);

    const interval = setInterval(() => {
      setSnowflakes(prev => 
        prev.map(flake => {
          if (flake.y >= 100) {
            return {
              ...flake,
              y: -10,
              x: Math.random() * 100,
              opacity: Math.random() * 0.5 + 0.3,
            };
          }
          
          const newX = flake.x + Math.sin(flake.y / 30) * 0.3;
          
          return {
            ...flake,
            y: flake.y + flake.speed,
            x: newX,
          };
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-20">
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="absolute rounded-full bg-white/80 backdrop-blur-[0.5px]"
          style={{
            left: `${flake.x}%`,
            top: `${flake.y}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            transform: `translateZ(0)`,
          }}
        />
      ))}
    </div>
  );
} 