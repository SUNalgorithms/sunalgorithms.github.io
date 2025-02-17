import React from 'react';
import './CategorySelect.css';
import logoImage from '../../assets/logo.jpeg';

const CategorySelect = ({ isOpen, onClose, onSelect }) => {
  if (!isOpen) return null;

  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };

  const categories = [
    {
      id: 'student',
      title: 'Student',
      icon: '🎓',
      description: 'Get help with assignments, school work, or enhance your learning journey',
      subPoints: [
        'Assignment assistance',
        'Project guidance',
        'Learning resources',
        'Programming tutorials'
      ]
    },
    {
      id: 'work',
      title: 'Work',
      icon: '💼',
      description: 'Professional collaboration and employment'
    },
    {
      id: 'project',
      title: 'Personal Project',
      icon: '🚀',
      description: 'Build and develop your own ideas'
    },
    {
      id: 'other',
      title: 'Other',
      icon: '✨',
      description: 'Custom collaboration opportunities'
    }
  ];

  return (
    <div className="category-modal-overlay">
      <div className="category-modal">
        <div className="category-modal-header">
          <img src={logoImage} alt="SUNalgorithms" className="modal-logo" />
          <button 
            className="close-button" 
            onClick={handleClose}
            type="button"
          >
            ✕
          </button>
        </div>

        <div className="category-content">
          <h2>Choose Your Path</h2>
          <p className="category-subtitle">Select the option that best describes your needs</p>

          <div className="category-grid">
            {categories.map(category => (
              <div 
                key={category.id}
                className="category-card"
                onClick={() => onSelect(category.id)}
              >
                <div className="category-icon">{category.icon}</div>
                <h3>{category.title}</h3>
                <p className="category-main-desc">{category.description}</p>
                {category.subPoints && (
                  <ul className="category-sub-points">
                    {category.subPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategorySelect; 