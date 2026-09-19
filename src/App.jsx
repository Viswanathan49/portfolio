import React, { useState, useEffect } from 'react';
import './App.css';
import Tabs from './components/ui/Tabs';
import ExperienceSection from './components/ui/ExperienceSection';
import ContactSection from './components/ui/ContactSection';
import PixelHero from './components/ui/PixelHero';
import projectsData from './data/projects.json';

const IconGitHub = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const IconLinkedIn = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);



function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app-wrapper">
      <header className="header-wrapper">
        <div className="header container">
          <div className="logo">Viswanathan S</div>
          <nav className="nav-links" style={{ alignItems: 'center' }}>
            <a href="https://github.com/Viswanathan49" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="https://www.linkedin.com/in/viswanathan-sivakumar" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </nav>
        </div>
      </header>

      <PixelHero />

      <main className="main-content container">
        <section id="projects" className="projects-section">
          <h2><span className="neon-text">//</span> Projects_</h2>
          <Tabs categories={projectsData.categories} />
        </section>

        <ExperienceSection />

        <section className="cloud-section">
          <h2><span className="neon-text">//</span> Cloud_Architecture_</h2>
          <div className="terminal-window">
            <div className="terminal-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="terminal-title">bash -- ~/architecture</span>
            </div>
            <div className="terminal-body">
              <div className="terminal-line">
                <span className="prompt">viswa@system:~$</span> cat gcp_experience.txt
              </div>
              <div className="terminal-output">
                <strong>Google Cloud Platform (GCP):</strong> Experience deploying full-stack applications (like React frontends) via CI/CD pipelines on Cloud Run. Built Location Intelligence ADK Agents utilizing MCP servers for BigQuery and Google Maps integration.
              </div>
              <div className="terminal-line">
                <span className="prompt">viswa@system:~$</span> cat azure_experience.txt
              </div>
              <div className="terminal-output">
                <strong>Microsoft Azure:</strong> Architected scalable backend services utilizing Azure Functions, managed NoSQL data layers with Cosmos DB, and handled containerization via Azure Container Registry.
              </div>
              <div className="terminal-line">
                <span className="prompt">viswa@system:~$</span> <span className="cursor">_</span>
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>

      <footer className="footer container">
        <div className="footer-content">
          <p>&copy; 2026 Viswanathan S. All rights reserved.</p>
          <div className="footer-links">
            <a href="https://github.com/Viswanathan49" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><IconGitHub /></a>
            <a href="https://www.linkedin.com/in/viswanathan-sivakumar" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><IconLinkedIn /></a>
          </div>
        </div>
        <div className="system-status">
          <span className="dot green blink-fast"></span> System Status: Online
        </div>
      </footer>
    </div>
  );
}

export default App;
