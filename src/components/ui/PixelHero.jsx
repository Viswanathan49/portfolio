import React, { useEffect, useState } from 'react';
import './PixelHero.css';

const PixelHero = () => {
  const [glitching, setGlitching] = useState(false);

  // Trigger occasional severe glitches
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setGlitching(true);
        setTimeout(() => setGlitching(false), 200 + Math.random() * 300);
      }
    }, 4000);
    return () => clearInterval(glitchInterval);
  }, []);

  // Generate rain drops
  const drops = Array.from({ length: 40 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${0.5 + Math.random() * 1.5}s`,
    animationDelay: `${Math.random() * 2}s`
  }));

  return (
    <div className={`pixel-hero-wrapper ${glitching ? 'severe-glitch' : ''}`}>
      {/* Background Image */}
      <div className="pixel-hero-bg"></div>
      
      {/* Rain Effect */}
      <div className="rain-container">
        {drops.map(drop => (
          <div 
            key={drop.id} 
            className="rain-drop" 
            style={{ left: drop.left, animationDuration: drop.animationDuration, animationDelay: drop.animationDelay }}
          ></div>
        ))}
      </div>

      {/* Flicker overlay for monitors */}
      <div className="monitor-flicker"></div>
      
      {/* CRT Scanlines Overlay */}
      <div className="scanlines"></div>

      {/* Content */}
      <div className="pixel-hero-content container">
        <div className="rpg-menu-box main-title-box">
          <h1 className="glitch-text" data-text="VISWANATHAN S">VISWANATHAN S</h1>
          <h2 className="subtitle typing-effect">Lv 99 DATA SCIENTIST & AI DEV</h2>
          
          <div className="rpg-menu-options">
            <a href="#projects" className="rpg-menu-btn">
              <span className="cursor-arrow">▶</span> START GAME
            </a>
            <a href="#contact" className="rpg-menu-btn">
              <span className="cursor-arrow">▶</span> MULTIPLAYER (CONNECT)
            </a>
            <a href="/Viswanathan_Resume.pdf" download className="rpg-menu-btn">
              <span className="cursor-arrow">▶</span> LOAD SAVE (RESUME)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixelHero;
