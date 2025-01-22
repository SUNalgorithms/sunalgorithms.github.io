import React, { useState } from 'react';
import './HiringForm.css';
import logoImage from '../../assets/logo.jpeg';
import { sendEmail } from '../../utils/emailService';

const HiringForm = ({ isOpen, onClose }) => {
  console.log('HiringForm rendered, isOpen:', isOpen);
  
  const [formData, setFormData] = useState({
    firstName: '',
    surname: '',
    residence: '',
    address: '',
    phone: '',
    email: '',
    // ... other form fields
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const success = await sendEmail(formData, 'hiring');
      
      if (success) {
        setSubmitStatus('success');
        setTimeout(() => {
          onClose();
          setSubmitStatus(null);
        }, 3000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="hiring-modal-overlay">
      <div className="hiring-modal">
        <div className="hiring-modal-header">
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
          <img src={logoImage} alt="SUNalgorithms" className="modal-logo" />
        </div>

        <div className="hiring-modal-content">
          <h2>Application Form</h2>
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
                  ? 'Application submitted successfully!' 
                  : 'Error submitting application. Please try again.'}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default HiringForm;
