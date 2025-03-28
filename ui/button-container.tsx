'use client';

import React from 'react';
import Link from 'next/link';

const ButtonContainer: React.FC = () => {
  return (
    <div
      className="button-container"
      style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '20px',
        zIndex: 10,
        fontFamily: '"Inter", "Roboto", sans-serif',
      }}
    >
      <Link href="/get-started">
        <button
          className="sleek-button primary"
          style={{
            background: 'linear-gradient(135deg, #2E3192 0%, #1BFFFF 100%)',
            color: 'white',
            border: 'none',
            padding: '12px 28px',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: '500',
            letterSpacing: '0.5px',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 14px rgba(0, 0, 0, 0.4)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';
          }}
        >
          Get Started
        </button>
      </Link>

      <Link href="/login">
        <button
          className="sleek-button secondary"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '12px 28px',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: '500',
            letterSpacing: '0.5px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(5px)',
            fontFamily: 'inherit',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
          }}
        >
          Log In
        </button>
      </Link>
    </div>
  );
};

export default ButtonContainer;
