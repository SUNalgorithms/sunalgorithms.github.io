import React, { useState, useEffect } from 'react';
import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import logoImage from './assets/logo.jpeg';
import HiringForm from './components/HiringForm/HiringForm';
import CategorySelect from './components/CategorySelect/CategorySelect';
import QueryForm from './components/QueryForm/QueryForm';
import SocialMediaModal from './components/SocialMediaModal/SocialMediaModal';
import TopAppBar from './components/TopAppBar/TopAppBar';
import Loader from './components/Loader/Loader';

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [showHiringForm, setShowHiringForm] = useState(false);
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showQueryForm, setShowQueryForm] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // Other state values for image slideshows etc.
  const [currentImages, setCurrentImages] = useState({
    programmers: 0,
    algorithms: 0,
    team: 0,
    other: 0,
  });
  const [currentImageIndex, setCurrentImageIndex] = useState({
    programmers: 0,
    team: 0,
  });

  const images = {
    programmers: [
      '/programmers/image1.jpg',
      '/programmers/image2.jpg',
      '/programmers/image3.webp',
    ],
    team: ['/team/team1.jpeg'],
  };

  const [loadedImages, setLoadedImages] = useState({
    programmers: new Array(images.programmers.length).fill(false),
    team: new Array(images.team.length).fill(false),
  });

  const handleImageLoad = (section, index) => {
    setLoadedImages((prev) => ({
      ...prev,
      [section]: prev[section].map((loaded, i) => (i === index ? true : loaded)),
    }));
  };

  const handleImageError = (e, section, index) => {
    console.warn(`Failed to load image: ${e.target.src}`);
    handleImageLoad(section, index); // Mark as loaded even if error
  };

  // Verify a list of images exist (for debugging)
  const verifyImageExists = (path) => {
    const img = new Image();
    img.src = path;
    img.onload = () => console.log(`Image loaded successfully: ${path}`);
    img.onerror = () => console.log(`Image failed to load: ${path}`);
  };

  // Slideshow Effect for programmers images
  useEffect(() => {
    images.programmers.forEach(verifyImageExists);
    images.team.forEach(verifyImageExists);
    const interval = setInterval(() => {
      setCurrentImages((prev) => ({
        programmers: (prev.programmers + 1) % images.programmers.length,
        algorithms: 0,
        team: 0,
        other: 0,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulate loading time
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Additional simulated loading if needed
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  // Slideshow index for programmers images (or other sections)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => ({
        programmers: (prev.programmers + 1) % images.programmers.length,
        team: prev.team,
      }));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Load the AdSense script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
    script.async = true;
    script.setAttribute('data-ad-client', 'ca-pub-7147971204711316');
    document.body.appendChild(script);
  }, []);

  // Initialize adsbygoogle once the ad container is mounted
  useEffect(() => {
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
  }, []);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 1) {
      setShowHiringForm(true);
    } else if (tabId === 2) {
      setShowCategorySelect(true);
    } else if (tabId === 3) {
      setShowSocialModal(true);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategorySelect(false);
    setShowQueryForm(true);
  };

  const tabs = [
    { id: 0, label: 'Home', icon: '🏠' },
    { id: 1, label: 'Get Hired', icon: '💼' },
    { id: 2, label: 'Develop With Us', icon: '🚀' },
    { id: 3, label: 'Contact', icon: '📧' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <div className="home-content">
            <div className="gallery-grid-container">
              {/* Programmers Section */}
              <div className="gallery-section programmers">
                <h2>Programmers</h2>
                <div className="slideshow-container">
                  <div
                    className="slides"
                    style={{
                      transform: `translateX(-${
                        currentImageIndex.programmers * 100
                      }%)`,
                    }}
                  >
                    {images.programmers.map((img, index) => (
                      <div key={index} className="slide">
                        <img
                          src={img}
                          alt={`Programmer ${index + 1}`}
                          onLoad={() => handleImageLoad('programmers', index)}
                          onError={(e) => handleImageError(e, 'programmers', index)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Team Section */}
              <div className="gallery-section team">
                <h2>Team</h2>
                <div className="slideshow-container">
                  <div className="slide">
                    <img
                      src={images.team[0]}
                      alt="Team"
                      onLoad={() => handleImageLoad('team', 0)}
                      onError={(e) => handleImageError(e, 'team', 0)}
                    />
                  </div>
                </div>
              </div>

              {/* Our Services Section */}
              <div className="gallery-section apis">
                <h2>Our Services</h2>
                <div className="api-container">
                  <div className="api-card">
                    <h3>GitHub API</h3>
                    <p>Access repositories and development tools</p>
                  </div>
                  <div className="api-card">
                    <h3>Stack Overflow API</h3>
                    <p>Get developer solutions and resources</p>
                  </div>
                </div>
              </div>

              {/* Featured Ads Section */}
              <div className="gallery-section ads">
                <h2>Featured</h2>
                <div className="ad-container">
                  <ins
                    className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-ad-client="ca-pub-7147971204711316"
                    data-ad-slot="1234567890" // Replace with your actual ad slot ID
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                  ></ins>
                </div>
              </div>

              {/* Others Section */}
              <div className="gallery-section others full-width">
                <h2>Others</h2>
                <div className="coming-soon">
                  <h3>Coming Soon</h3>
                  <p>Stay tuned for exciting updates!</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="services-content">
            <h2>Our Services</h2>
            {/* Services content */}
          </div>
        );
      case 3:
        return (
          <div className="contact-content">
            <h2>Contact Us</h2>
            {/* Contact content */}
          </div>
        );
      default:
        return null;
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="app">
      <TopAppBar />
      <div className="stars"></div>
      <div className="twinkling"></div>
      <main className="main-content">{renderContent()}</main>
      <Toolbar
        activeTab={activeTab}
        setActiveTab={handleTabClick}
        onHireClick={() => setShowHiringForm(true)}
      />
      <HiringForm isOpen={showHiringForm} onClose={() => setShowHiringForm(false)} />
      <CategorySelect
        isOpen={showCategorySelect}
        onClose={() => setShowCategorySelect(false)}
        onSelect={handleCategorySelect}
      />
      <QueryForm
        isOpen={showQueryForm}
        onClose={() => setShowQueryForm(false)}
        category={selectedCategory}
      />
      <SocialMediaModal
        isOpen={showSocialModal}
        onClose={() => setShowSocialModal(false)}
      />
    </div>
  );
}

export default App;
