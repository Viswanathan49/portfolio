import React from 'react';
import './ProjectCard.css';

const techColors = {
  'React': 'var(--neon-blue)',
  'Power BI': '#F2C811', // Power BI yellowish
  'Python': '#3776AB',
  'DAX': '#F2C811',
  'Google Cloud Run': '#4285F4',
};

export default function ProjectCard({ project, onClick }) {
  return (
    <div className="project-card glitch-hover" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="project-card-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.tagline}</p>
        <div className="project-tech-tags">
          {project.tech.slice(0, 3).map(t => (
            <span 
              key={t} 
              className="tech-tag"
              style={{ '--tag-color': techColors[t] || 'var(--neon-purple)' }}
            >
              [{t}]
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="tech-tag" style={{ '--tag-color': 'var(--neon-purple)' }}>
              [+{project.tech.length - 3} more]
            </span>
          )}
        </div>
      </div>
      
      <div className="project-card-footer">
        <button className="card-btn ghost-btn" style={{ width: '100%', justifyContent: 'center' }}>
          [ VIEW_DETAILS ]
        </button>
      </div>
    </div>
  );
}
