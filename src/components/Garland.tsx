"use client";

import { useEffect, useState } from "react";

export default function Garland() {
  const [lights, setLights] = useState<number[]>([]);
  const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"];

  useEffect(() => {
    const windowWidth = window.innerWidth;
    const spacing = 80;
    const numberOfLights = Math.floor(windowWidth / spacing);
    setLights(Array.from({ length: numberOfLights }, (_, i) => i));
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-16 flex items-start justify-around z-50">
      {lights.map((_, index) => (
        <div
          key={index}
          className="w-4 h-4 rounded-full animate-pulse absolute"
          style={{
            backgroundColor: colors[index % colors.length],
            animation: `pulse 1s ease-in-out ${index * 0.1}s infinite alternate`,
            left: `${(index / lights.length) * 100}%`,
            top: `${Math.sin((index / lights.length) * Math.PI * 2) * 5 + 20}px`
          }}
        />
      ))}
    </div>
  );
} 