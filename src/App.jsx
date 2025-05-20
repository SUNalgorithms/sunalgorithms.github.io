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

  // For step control in HiringForm
  const [hiringStep, setHiringStep] = useState(0); // 0 = path select, 1 = form

  const openHiringForm = () => {
    setShowHiringForm(true);
    setHiringStep(0);
  };

  const closeHiringForm = () => {
    setShowHiringForm(false);
    setActiveTab(0); // Go to home
  };

  const goToHiringForm = () => setHiringStep(1);
  const goToPathSelect = () => setHiringStep(0);

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

  const handleBackToCategory = () => {
    setShowQueryForm(false);
    setShowCategorySelect(true);
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
            {/* Only one programmers frame, centered */}
            <div className="gallery-single-container">
              <div className="gallery-section programmers">
                <div className="programmers-welcome">Welcome to sunalgorithms</div>
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
            </div>

            {/* Hero Section */}
            <div className="hero-section">
              <h1>Empowering Your Tech Journey</h1>
              <p>
                Expert solutions in programming, design, and tech support for students, professionals, and innovators.
              </p>
              <button className="cta-btn">Get Started</button>
            </div>

            {/* Features Row */}
            <div className="features-row">
              <div className="feature-card">
                <span className="feature-icon">🤖</span>
                <h3>Tech Help</h3>
                <p>Get instant support for your programming and tech challenges.</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">💼</span>
                <h3>Get Hired</h3>
                <p>Apply for opportunities and join our talented team.</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">🚀</span>
                <h3>Project Support</h3>
                <p>Bring your ideas to life with expert guidance and collaboration.</p>
              </div>
              <div className="feature-card">
                <span className="feature-icon">🌟</span>
                <h3>Community</h3>
                <p>Connect, learn, and grow with like-minded innovators.</p>
              </div>
            </div>

            {/* Testimonials Section */}
            <div className="testimonials-section">
              <h2>What Our Users Say</h2>
              <div className="testimonial-slider">
                <div className="testimonial-card">
                  <p>"SUNalgorithms helped me solve a tough coding bug in minutes!"</p>
                  <span>- Alex, Student</span>
                </div>
                <div className="testimonial-card">
                  <p>"Their team support made my project launch a breeze."</p>
                  <span>- Priya, Developer</span>
                </div>
                <div className="testimonial-card">
                  <p>"I landed my first tech job through their Get Hired program!"</p>
                  <span>- Sam, Graduate</span>
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
      <HiringForm
        isOpen={showHiringForm}
        step={hiringStep}
        onClose={closeHiringForm}
        onBack={goToPathSelect}
        onPathChosen={goToHiringForm}
      />
      <CategorySelect
        isOpen={showCategorySelect}
        onClose={() => {
          setShowCategorySelect(false);
          setActiveTab(0); // Go to Home
        }}
        onSelect={handleCategorySelect}
      />
      <QueryForm
        isOpen={showQueryForm}
        onClose={() => setShowQueryForm(false)}
        onBack={handleBackToCategory}
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
