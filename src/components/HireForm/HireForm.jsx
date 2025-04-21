import React from 'react';
import './HireForm.css';

const HireForm = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: e.target.name.value,
        email: e.target.email.value,
        message: e.target.message.value,
      };
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/hire`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Form submitted successfully!');
        e.target.reset();
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit form. Please try again.');
    }
  };

  return (
    <div className="hire-content">
      <div className="form-container">
        <h2>Hire Developers</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input type="text" name="name" placeholder="Your Name" required />
          </div>
          <div className="form-group">
            <input type="email" name="email" placeholder="Your Email" required />
          </div>
          <div className="form-group">
            <textarea name="message" placeholder="Project Description" required></textarea>
          </div>
          <button type="submit" className="submit-btn">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default HireForm; 