import React from 'react';
import './ExperienceSection.css';
import expData from '../../data/experience.json';

const IconMicrosoft = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
  </svg>
);

const IconTerminal = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

const IconCode = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6"></polyline>
    <polyline points="8 6 2 12 8 18"></polyline>
  </svg>
);

const IconFlag = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
    <line x1="4" y1="22" x2="4" y2="15"></line>
  </svg>
);

const getIcon = (name) => {
  switch(name) {
    case 'terminal': return <IconTerminal />;
    case 'code': return <IconCode />;
    case 'flag': return <IconFlag />;
    default: return <IconTerminal />;
  }
};

export default function ExperienceSection() {
  return (
    <section className="experience-section">
      <h2><span className="neon-text">//</span> Experience_&_Community_</h2>
      
      <div className="bento-grid">
        
        {/* Block 1: Professional */}
        <div className="glass-panel pro-block">
          <div className="pro-header">
            <div className="icon-wrapper">
              <IconMicrosoft />
            </div>
            <h3 className="pro-title">{expData.professional.title}</h3>
          </div>
          <div className="pro-timeline">{expData.professional.timeline}</div>
          <p className="pro-desc">{expData.professional.description}</p>
          
          <a href="#projects" className="capstone-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 16 16 12 12 8"></polyline>
              <line x1="8" y1="12" x2="16" y2="12"></line>
            </svg>
            Capstone Project: India Crude Oil Intelligence Dashboard
          </a>
        </div>

        {/* Block 2: Community */}
        {expData.community.map((item, index) => (
          <div key={index} className="glass-panel community-block">
            <div className="comm-header">
              <div className="icon-wrapper purple">
                {getIcon(item.icon)}
              </div>
              <h3 className="comm-title">{item.name}</h3>
            </div>
            <p className="comm-desc">{item.description}</p>
            {item.projectLink && (
              <a href={item.projectLink.url} className="capstone-btn" style={{marginTop: '1rem', alignSelf: 'flex-start'}}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                {item.projectLink.text}
              </a>
            )}
          </div>
        ))}

      </div>
    </section>
  );
}
