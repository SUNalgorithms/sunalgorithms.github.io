import { useState, useEffect } from 'react'
import './App.css'
import Toolbar from './components/Toolbar/Toolbar'
import logoImage from './assets/logo.jpeg'
import HiringForm from './components/HiringForm/HiringForm'
import CategorySelect from './components/CategorySelect/CategorySelect'
import QueryForm from './components/QueryForm/QueryForm'
import SocialMediaModal from './components/SocialMediaModal/SocialMediaModal'

function App() {
  const [activeTab, setActiveTab] = useState(0)
  const [showDescription, setShowDescription] = useState(false)
  const [currentImages, setCurrentImages] = useState({
    programmers: 0,
    algorithms: 0,
    team: 0,
    other: 0
  })
  const [isLoading, setIsLoading] = useState(true);
  const [showCategorySelect, setShowCategorySelect] = useState(false);
  const [showHiringForm, setShowHiringForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showQueryForm, setShowQueryForm] = useState(false);
  const [showSocialModal, setShowSocialModal] = useState(false);

  // Alternative way to reference images
  const imagesFolders = {
    programmers: [
      '/programmers/image1.jpg',
      '/programmers/image2.jpg',
      '/programmers/image3.webp'
    ],
    team: ['/team/team1.jpeg'],
    other: []
  }

  // Add this function to verify paths
  const verifyImageExists = (path) => {
    const img = new Image();
    img.src = path;
    img.onload = () => console.log(`Image loaded successfully: ${path}`);
    img.onerror = () => console.log(`Image failed to load: ${path}`);
  }

  // Slideshow Effect
  useEffect(() => {
    // Verify all images
    imagesFolders.programmers.forEach(verifyImageExists);
    imagesFolders.team.forEach(verifyImageExists);

    const interval = setInterval(() => {
      setCurrentImages(prev => {
        const next = {
          programmers: (prev.programmers + 1) % imagesFolders.programmers.length,
          algorithms: 0,
          team: 0,
          other: 0
        };
        console.log('Switching to image:', next.programmers); // Debug log
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Add this function to handle tab clicks
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 1) {
      setShowHiringForm(true);
    } else if (tabId === 2) {
      setShowCategorySelect(true);
    } else if (tabId === 3) { // Contact tab
      setShowSocialModal(true);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowCategorySelect(false);
    setShowQueryForm(true);
  };

  // Make sure your toolbar tabs are in this order:
  const tabs = [
    { id: 0, label: 'Home', icon: '🏠' },
    { id: 1, label: 'Get Hired', icon: '💼' },
    { id: 2, label: 'Develop With Us', icon: '🚀' },  // This is now id: 2
    { id: 3, label: 'Contact', icon: '📧' }
  ];


  return (
    <>
      <div className="animated-background">
        <div className="stars"></div>
        <div className="nebula"></div>
        <div className="planet"></div>
        <div className="planet"></div>
        <div className="planet"></div>
        <div className="shooting-star" style={{top: '20%', left: '10%'}}></div>
        <div className="shooting-star" style={{top: '50%', left: '30%', animationDelay: '2s'}}></div>
        <div className="shooting-star" style={{top: '70%', left: '60%', animationDelay: '4s'}}></div>
      </div>
      <div className="app-container">
        <div className="logo-section">
          <div className="logo-container animate-fade-in">
            <img src={logoImage} alt="SUNalgorithms" className="logo-image pulse" />
          </div>

          <div className="frames-container">
            {/* About Frame */}
            <div className="frame about-frame">
              <h2>About Us</h2>
              <p className="about-description">
                Welcome to SUNalgorithms, where innovation meets efficiency. 
                We specialize in crafting elegant solutions through advanced 
                algorithms and cutting-edge technology. Our mission is to 
                illuminate the path to better software solutions, making complex 
                problems simple and accessible. From optimization to machine 
                learning, we transform challenges into opportunities, helping 
                businesses and developers shine in the digital landscape.
                {/* Add more content here - it will be scrollable */}
              </p>
            </div>

            {/* Programmers Frame */}
            <div className={`frame slideshow-frame ${isLoading ? 'loading' : ''}`}>
              <h3>Learn Futuristic Algorithms</h3>
              
              <div className="slideshow">
                <img 
                  key={currentImages.programmers} 
                  src={imagesFolders.programmers[currentImages.programmers]} 
                  alt={`Programming ${currentImages.programmers + 1}`}
                  className="slideshow-image"
                />
              </div>
              
              <div className="frame-description-container">
                <div className="frame-description-scroll">
                  <p className="frame-description">
                    Master advanced programming and cutting-edge algorithms in AI, 
                    Machine Learning, Quantum Computing, and Blockchain technology. 
                    Transform your coding journey with our innovative solutions.
                    
                    Our comprehensive curriculum covers:
                    • Advanced Algorithm Design
                    • Machine Learning Implementation
                    • Neural Network Architecture
                    • Quantum Computing Basics
                    • Blockchain Development
                    • Data Structure Optimization
                    • Real-world Application Development
                  </p>
                </div>
              </div>
            </div>

            {/* Team Frame */}
            <div className={`frame slideshow-frame ${isLoading ? 'loading' : ''}`}>
              <h3>Our Team</h3>
              <div className="slideshow">
                <img 
                  src={imagesFolders.team[0]} 
                  alt="Team"
                  className="slideshow-image"
                  style={{ display: 'block' }}
                />
              </div>
            </div>

            {/* Other Frame (placeholder until you add images) */}
            <div className="frame slideshow-frame placeholder-frame">
              <h3>Coming Soon</h3>
              <div className="placeholder-content">
                <p>More content will be added soon!</p>
              </div>
            </div>
          </div>
        </div>

        <Toolbar 
          activeTab={activeTab} 
          setActiveTab={handleTabClick}
        />

        <HiringForm 
          isOpen={showHiringForm}
          onClose={() => setShowHiringForm(false)}
        />

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
    </>
  )
}

export default App