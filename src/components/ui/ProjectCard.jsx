import React from 'react';
import './ProjectCard.css';

const techColors = {
  'React': 'var(--neon-blue)',
  'Power BI': '#F2C811', // Power BI yellowish
  'Python': '#3776AB',
  'DAX': '#F2C811',
  'Google Cloud Run': '#4285F4',
};

const IconGitHub = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const IconExternal = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);

export default function ProjectCard({ project }) {
  return (
    <div className="project-card glitch-hover">
      <div className="project-card-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        <div className="project-tech-tags">
          {project.tech.map(t => (
            <span 
              key={t} 
              className="tech-tag"
              style={{ '--tag-color': techColors[t] || 'var(--neon-purple)' }}
            >
              [{t}]
            </span>
          ))}
        </div>
      </div>
      
      <div className="project-card-footer">
        {project.githubUrl && (
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="card-btn ghost-btn">
            <IconGitHub />
            Code
          </a>
        )}
        {project.liveDemoUrl && (
          <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="card-btn neon-btn">
            <IconExternal />
            Demo
          </a>
        )}
      </div>
    </div>
  );
}
