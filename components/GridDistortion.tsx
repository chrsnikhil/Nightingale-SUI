"use client"
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface GridDistortionProps {
  className?: string;
}

const GridDistortion: React.FC<GridDistortionProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const points = useRef<Array<{ x: number; y: number; ox: number; oy: number; vx: number; vy: number }>>([]);
  const animationFrame = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize points
    const gridSize = 20;
    const cols = Math.ceil(canvas.width / gridSize);
    const rows = Math.ceil(canvas.height / gridSize);

    points.current = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        points.current.push({
          x: x * gridSize,
          y: y * gridSize,
          ox: x * gridSize,
          oy: y * gridSize,
          vx: 0,
          vy: 0,
        });
      }
    }

    // Animation loop
    const animate = () => {
      if (!ctx) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;

      // Update points
      points.current.forEach((point) => {
        const dx = mouse.current.x - point.x;
        const dy = mouse.current.y - point.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          point.vx += Math.cos(angle) * force * 0.5;
          point.vy += Math.sin(angle) * force * 0.5;
        }

        // Apply spring force
        point.vx += (point.ox - point.x) * 0.1;
        point.vy += (point.oy - point.y) * 0.1;

        // Apply friction
        point.vx *= 0.95;
        point.vy *= 0.95;

        // Update position
        point.x += point.vx;
        point.y += point.vy;
      });

      // Draw lines
      for (let y = 0; y < rows - 1; y++) {
        for (let x = 0; x < cols - 1; x++) {
          const i = y * cols + x;
          const p1 = points.current[i];
          const p2 = points.current[i + 1];
          const p3 = points.current[i + cols];
          const p4 = points.current[i + cols + 1];

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.lineTo(p3.x, p3.y);
          ctx.closePath();
          ctx.stroke();
        }
      }

      animationFrame.current = requestAnimationFrame(animate);
    };

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};

export default GridDistortion;
