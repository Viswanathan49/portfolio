import React, { useEffect, useRef } from 'react';
import './ParticleNetwork.css';

export default function ParticleNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = window.innerWidth;
    let height = canvas.parentElement.clientHeight || window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const particles = [];
    const numParticles = 60;
    const mouse = { x: null, y: null, radius: 150 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      constructor(x, y, dx, dy, radius, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      update() {
        if (this.x > width || this.x < 0) this.dx = -this.dx;
        if (this.y > height || this.y < 0) this.dy = -this.dy;

        // Interaction
        if (mouse.x != null && mouse.y != null) {
          let dxMouse = mouse.x - this.x;
          let dyMouse = mouse.y - this.y;
          let distance = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
          
          if (distance < mouse.radius) {
            // Gently repel
            this.x -= dxMouse / 50;
            this.y -= dyMouse / 50;
          }
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
      }
    }

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < numParticles; i++) {
        let radius = Math.random() * 2 + 1;
        let x = Math.random() * (width - radius * 2) + radius;
        let y = Math.random() * (height - radius * 2) + radius;
        let dx = (Math.random() - 0.5) * 1;
        let dy = (Math.random() - 0.5) * 1;
        let color = Math.random() > 0.5 ? 'rgba(0, 243, 255, 0.8)' : 'rgba(188, 19, 254, 0.8)';
        particles.push(new Particle(x, y, dx, dy, radius, color));
      }
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }

      connect();
    };

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x))
            + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
          
          if (distance < 20000) {
            let opacityValue = 1 - (distance / 20000);
            ctx.strokeStyle = `rgba(0, 243, 255, ${opacityValue * 0.25})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    init();
    animate();

    const handleResize = () => {
      width = window.innerWidth;
      height = canvas.parentElement.clientHeight || window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-network" />;
}
