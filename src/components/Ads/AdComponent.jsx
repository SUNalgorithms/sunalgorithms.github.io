import React from 'react';
import './AdComponent.css';

const AdComponent = ({ ad }) => {
  return (
    <div className="ad-container">
      <span className="sponsored-label">Sponsored</span>
      <img src={ad.image} alt={ad.title} className="ad-image" />
      <h3>{ad.title}</h3>
      <p>{ad.description}</p>
    </div>
  );
};

export default AdComponent; 