import React, { useState } from 'react';
import './TopAppBar.css';
import logoImage from '../../assets/logo.jpeg';

const TopAppBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="top-app-bar">
      <div className="logo-container">
        <img src={logoImage} alt="SUNalgorithms" className="logo-image" />
        <h1 className="logo-text">
          <span className="sun">SUN</span>
          <span className="algorithms">algorithms</span>
        </h1>
      </div>
      
      <button className="menu-button" onClick={toggleMenu}>
        <span className="menu-icon">☰</span>
      </button>

      {isMenuOpen && (
        <div className="menu-overlay" onClick={toggleMenu}>
          <div className="menu-content" onClick={e => e.stopPropagation()}>
            <button className="close-menu" onClick={toggleMenu}>×</button>
            <div className="menu-items">
              <button>Settings</button>
              <button>Help</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopAppBar; 