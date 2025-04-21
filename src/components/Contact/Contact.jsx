import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-content">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <div className="contact-info">
          <div className="contact-item">
            <h3>Email</h3>
            <p>contact@sunalgorithms.com</p>
          </div>
          <div className="contact-item">
            <h3>Phone</h3>
            <p>+1234567890</p>
          </div>
          <div className="contact-item">
            <h3>Address</h3>
            <p>123 Tech Street, Silicon Valley</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 