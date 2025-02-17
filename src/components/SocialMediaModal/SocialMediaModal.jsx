import React from 'react';
import './SocialMediaModal.css';
import logoImage from '../../assets/logo.jpeg';

const SocialMediaModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const socialLinks = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/SunAlgorithms',
      icon: '📘',
      username: 'Sun Algorithms'
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/SunAlgorithms',
      icon: '📸',
      username: 'Sun Algorithms'
    }
  ];

  return (
    <div className="social-modal-overlay">
      <div className="social-modal">
        <div className="social-modal-header">
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
          <img src={logoImage} alt="SUNalgorithms" className="modal-logo" />
        </div>

        <div className="social-modal-content">
          <h2>Connect With Us</h2>
          <div className="social-links-container">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
              >
                <div className="social-icon">{social.icon}</div>
                <div className="social-info">
                  <h3>{social.name}</h3>
                  <p>{social.username}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaModal; 