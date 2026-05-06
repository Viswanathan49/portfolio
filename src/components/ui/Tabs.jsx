import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import './Tabs.css';

export default function Tabs({ categories }) {
  const [activeTab, setActiveTab] = useState(categories[0].id);

  const activeCategory = categories.find(c => c.id === activeTab);

  return (
    <div className="tabs-container">
      <div className="tabs-header">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`tab-btn ${activeTab === cat.id ? 'active' : ''}`}
            onClick={() => setActiveTab(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
      
      <div className="tabs-content">
        <div className="projects-grid">
          {activeCategory.projects.map((proj, idx) => (
            <ProjectCard key={idx} project={proj} />
          ))}
        </div>
      </div>
    </div>
  );
}
