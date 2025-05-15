import React, { useState } from 'react';
import './QueryForm.css';
import logoImage from '../../assets/logo.jpeg';
import { sendEmail } from '../../utils/emailService';

const QueryForm = ({ isOpen, onClose, onBack, category }) => {
  const [formData, setFormData] = useState({
    queryTitle: '',
    queryDescription: '',
    name: '',
    email: '',
    phone: '',
    preferredContact: 'email'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const success = await sendEmail(formData, 'dwu', category);
      
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

  const getCategoryTitle = () => {
    switch(category) {
      case 'student': return 'Academic Assistance';
      case 'work': return 'Work Collaboration';
      case 'project': return 'Project Development';
      case 'other': return 'Custom Query';
      default: return 'Submit Your Query';
    }
  };

  return (
    <div className="query-modal-overlay">
      <div className="query-modal">
        <div className="query-modal-header">
          <img src={logoImage} alt="SUNalgorithms" className="modal-logo" />
          <h2 className="query-header-title">{getCategoryTitle()}</h2>
          {onBack ? (
            <button
              className="back-button styled-header-btn"
              onClick={onBack}
              aria-label="Back"
            >
              ← Back
            </button>
          ) : (
            <button
              className="close-button styled-header-btn"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          )}
        </div>

        <div className="query-modal-content">
          <form className="query-form" onSubmit={handleSubmit}>
            {/* Problem/Query Description */}
            <div className="form-section">
              <div className="form-group">
                <label htmlFor="queryTitle">Title of Your Query</label>
                <input 
                  type="text" 
                  id="queryTitle" 
                  name="queryTitle"
                  value={formData.queryTitle}
                  onChange={handleChange}
                  placeholder="Brief title of your problem or request"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="queryDescription">Describe Your Problem/Query</label>
                <textarea 
                  id="queryDescription" 
                  name="queryDescription"
                  value={formData.queryDescription}
                  onChange={handleChange}
                  rows="6" 
                  placeholder="Please provide detailed information about your problem or request..."
                  required
                ></textarea>
              </div>

              {/* File Attachment */}
              <div className="form-group">
                <label htmlFor="attachments">Attach Relevant Files (Optional)</label>
                <div className="file-upload-container">
                  <input 
                    type="file" 
                    id="attachments" 
                    multiple
                    onChange={(e) => setAttachments(e.target.files)}
                    accept=".pdf,.doc,.docx,.txt,.zip,.rar,.jpg,.png"
                  />
                  <p className="file-info">
                    Supported formats: PDF, DOC, DOCX, TXT, ZIP, RAR, JPG, PNG (Max 10MB)
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="form-section">
              <h3>Contact Information</h3>
              
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  placeholder="Your full name"
                />
              </div>

              <div className="contact-row">
                <div className="form-group">
                  <label htmlFor="email">Email Address *</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your contact number"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="preferredContact">Preferred Contact Method</label>
                <select 
                  id="preferredContact" 
                  name="preferredContact"
                  value={formData.preferredContact}
                  onChange={handleChange}
                >
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-actions">
              <button 
                type="submit" 
                className="submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Query'}
              </button>
            </div>

            {submitStatus && (
              <div className={`submit-status ${submitStatus}`}>
                {submitStatus === 'success' 
                  ? 'Query submitted successfully!' 
                  : 'Error submitting query. Please try again.'}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default QueryForm;