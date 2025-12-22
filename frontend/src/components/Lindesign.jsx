import React, { useState, useEffect } from 'react';
import './Home.css';

export default function Linedesign() {
  const [isPaused, setIsPaused] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(45);
  
  const handleSpeedChange = (speed) => {
    setScrollSpeed(speed);
  };
  
  return (
    <div className="linedesign-container">
      <div className="left-div">
        <div className="logo-wrapper">
          <i className="fas fa-code"></i>
          <span>Hi Coders</span>
        </div>
        <div className="speed-controls">
          <button 
            className={`speed-btn ${scrollSpeed === 60 ? 'active' : ''}`}
            onClick={() => handleSpeedChange(60)}
            title="Slow"
          >
            <i className="fas fa-snail"></i>
          </button>
          <button 
            className={`speed-btn ${scrollSpeed === 45 ? 'active' : ''}`}
            onClick={() => handleSpeedChange(45)}
            title="Normal"
          >
            <i className="fas fa-walking"></i>
          </button>
          <button 
            className={`speed-btn ${scrollSpeed === 25 ? 'active' : ''}`}
            onClick={() => handleSpeedChange(25)}
            title="Fast"
          >
            <i className="fas fa-running"></i>
          </button>
        </div>
      </div>

      <div className="right-div">
        <div 
          className="scroll-wrapper"
          style={{ 
            animation: `scroll-left ${scrollSpeed}s linear infinite`,
            animationPlayState: isPaused ? 'paused' : 'running'
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <span className="scroll-text">
            <span className="highlight">Hi</span>, on our website you will find blogs about 
            <span className="tech-tag"> MERN</span>, 
            <span className="tech-tag"> MEAN</span>, 
            <span className="tech-tag"> Python</span>, 
            <span className="tech-tag"> AI</span>, and many other modern technologies. 
            These resources are designed to help you learn effectively and grow your technical skills. 
            By using our content, you can gain practical knowledge that will support you in building real-world projects. 
            Our goal is to guide you step by step so you can move forward confidently in your career. 
            We focus on clear explanations, updated information, and beginner-friendly tutorials. 
            Through continuous learning and practice, we aim to help you achieve success in the tech industry.
          </span>
          
         
          <span className="scroll-text">
            <span className="highlight">Hi</span>, on our website you will find blogs about 
            <span className="tech-tag"> MERN</span>, 
            <span className="tech-tag"> MEAN</span>, 
            <span className="tech-tag"> Python</span>, 
            <span className="tech-tag"> AI</span>, and many other modern technologies. 
            These resources are designed to help you learn effectively and grow your technical skills. 
            By using our content, you can gain practical knowledge that will support you in building real-world projects. 
            Our goal is to guide you step by step so you can move forward confidently in your career. 
            We focus on clear explanations, updated information, and beginner-friendly tutorials. 
            Through continuous learning and practice, we aim to help you achieve success in the tech industry.
          </span>
        </div>
        
        
      </div>
    </div>
  );
}