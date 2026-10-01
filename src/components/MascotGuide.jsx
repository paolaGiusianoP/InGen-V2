import React, { useState, useEffect } from "react";

export function MascotGuide() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = window.scrollY / totalHeight;
        setScrollProgress(currentProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const topPos = 10 + scrollProgress * 78; 
  const leftPos = 10 + Math.sin(scrollProgress * Math.PI * 2) * 35 + 35; // Movimiento en S
  const rotation = Math.sin(scrollProgress * Math.PI * 4) * 12; 

  return (
    <div
      className="fixed z-40 pointer-events-none w-20 h-20 md:w-28 md:h-28 transition-transform duration-75 ease-out filter drop-shadow-xl"
      style={{
        top: `${topPos}vh`,
        left: `${leftPos}vw`,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <img
        src="/assets/mascot.svg"
        alt="Mascota interactiva"
        className="w-full h-full object-contain"
      />
    </div>
  );
}