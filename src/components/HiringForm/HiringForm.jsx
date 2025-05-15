import React, { useState } from 'react';
import './HiringForm.css';
import logoImage from '../../assets/logo.jpeg';
import { sendEmail } from '../../utils/emailService';

const paths = [
  {
    label: 'Developer',
    value: 'developer',
    description: 'Apply as a software developer and join our engineering team.',
    icon: '💻',
    color: 'linear-gradient(135deg, #4ecdc4, #156e2e)',
  },
  {
    label: 'Designer',
    value: 'designer',
    description: 'Show your creative skills as a UI/UX or graphic designer.',
    icon: '🎨',
    color: 'linear-gradient(135deg, #ff6b6b, #f8b500)',
  },
  // Add more paths as needed
];

const HiringForm = ({ isOpen, step = 0, onClose, onBack, onPathChosen }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    residence: '',
    address: '',
    phone: '',
    email: '',
    path: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Handle path selection
  const handlePathSelect = (path) => {
    setFormData((prev) => ({ ...prev, path }));
    if (onPathChosen) onPathChosen();
  };

  // Handle form input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    const success = await sendEmail(formData, 'hiring');
    setIsSubmitting(false);
    setSubmitStatus(success ? 'success' : 'error');
    if (success) {
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="hiring-modal-overlay">
      <div className="hiring-modal">
        <div className="hiring-modal-header">
          <div className="header-buttons">
            {step === 1 && (
              <button className="back-button styled-header-btn" onClick={onBack}>← Back</button>
            )}
            <button className="close-button styled-header-btn" onClick={onClose}>✕</button>
          </div>
          <img src={logoImage} alt="SUNalgorithms" className="modal-logo" />
        </div>
        <div className="hiring-modal-content">
          {step === 0 ? (
            <>
              <h2 className="hiring-title">Get Hired at SUNalgorithms</h2>
              <p className="hiring-desc">
                Choose the path that best describes your skills and interests. We are always looking for talented individuals to join our team!
              </p>
              <div className="hiring-path-options">
                {paths.map((p) => (
                  <button
                    key={p.value}
                    className="hiring-path-card"
                    style={{ background: p.color }}
                    onClick={() => handlePathSelect(p.value)}
                  >
                    <span className="hiring-path-icon">{p.icon}</span>
                    <span className="hiring-path-label">{p.label}</span>
                    <span className="hiring-path-desc">{p.description}</span>
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="form-header">
                <button className="back-button styled-header-btn" onClick={onBack}>← Back</button>
                <h2>Application Form</h2>
              </div>
              <form className="hiring-form" onSubmit={handleSubmit}>
                <div className="form-section">
                  <h3>Personal Details</h3>
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="surname">Surname *</label>
                    <input
                      type="text"
                      id="surname"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      required
                      placeholder="Enter your surname"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="residence">Residence *</label>
                    <input
                      type="text"
                      id="residence"
                      name="residence"
                      value={formData.residence}
                      onChange={handleChange}
                      required
                      placeholder="Enter your residence"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address *</label>
                    <textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      placeholder="Enter your full address"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
                <div className="form-actions">
                  <button
                    type="submit"
                    className="submit-button"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
                {submitStatus && (
                  <div className={`submit-status ${submitStatus}`}>
                    {submitStatus === 'success'
                      ? 'Application submitted successfully! Returning to Home...'
                      : 'Error submitting application. Please try again.'}
                  </div>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HiringForm;
