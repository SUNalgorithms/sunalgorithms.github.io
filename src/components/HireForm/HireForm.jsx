import React, { useState } from 'react';
import { sendEmail } from '../../utils/emailService';
import './HireForm.css';

const HireForm = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    const success = await sendEmail(formData, 'hire');
    setIsSubmitting(false);
    setSubmitStatus(success ? 'success' : 'error');
    if (success) {
      setTimeout(() => {
        if (onClose) onClose();
      }, 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="hire-modal-overlay">
      <div className="hire-modal">
        <div className="hire-modal-header">
          <button className="close-button styled-header-btn" onClick={onClose}>✕</button>
          <h2>Tech Help</h2>
        </div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
            </div>
            <div className="form-group">
              <input name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required />
            </div>
            <div className="form-group">
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Describe your tech issue or question" required></textarea>
            </div>
            <button type="submit" className="submit-btn" disabled={isSubmitting}>Submit Request</button>
            {submitStatus === 'success' && <p>Form sent! Returning to Home...</p>}
            {submitStatus === 'error' && <p>Failed to send. Try again.</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default HireForm;