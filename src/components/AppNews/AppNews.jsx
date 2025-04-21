import React from 'react';
import './AppNews.css';

const AppNews = ({ children }) => {
  return (
    <div className="app-news-container">
      <div className="app-news-content">
        {children}
      </div>s
      <div className="app-news-sidebar">
        <div className="sponsored-content">
          {/* Ads will go here */}
        </div>
        <div className="api-showcase">
          {/* API content will go here */}
        </div>
      </div>
    </div>
  );
};

export default AppNews; 