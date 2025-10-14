import { useState } from 'react';
import './LanguagePage.css';
import { useNavigate } from 'react-router-dom';

function LanguagePage() {
  const [selectedLanguage, setSelectedLanguage] = useState('English')
  const navigate = useNavigate()

  const languages = [
    { code: 'en', name: 'English', img: '/english.png' },
    { code: 'fr', name: 'French', img: '/french.png' },
    { code: 'es', name: 'Spanish', img: '/spanish.png' }
  ]

  const handleContinue = () => {
    navigate('/prosumer')
  }

  return (
    <div className="App">
      <div className="language-screen">
        <div className="content-wrapper">
          {/* Welcome Section */}
          <div className="welcome-section">
            <div className="logo-section">
              <div className="logo-icon">
                <img src="/logo.png" alt="Laciera Logo" className="logo-img" />
              </div>
            </div>
            
            <div className="welcome-content">
              <div className="welcome-text-group">
                <h1 className="welcome-title">Welcome to LACIERA</h1>
                <div className="welcome-subtitle-group">
                  <p className="welcome-subtitle">"Your smart energy companion."</p>
                  <p className="welcome-description">
                    We help you manage your home or business energy usage, automate device planning, and track your savings—all in one place.
                  </p>
                </div>
              </div>
              <p className="welcome-tagline">"Save energy. Save money. Live smarter."</p>
            </div>
          </div>

          {/* Language Selection */}
          <div className="language-selection">
            <div className="language-card">
              <h2 className="language-title">Select Your Language</h2>
              <p className="language-subtitle">Please choose your preferred language</p>
              
              <div className="language-options">
                {languages.map((language) => (
                  <label 
                    key={language.code} 
                    className="language-option"
                  >
                    <input
                      type="radio"
                      name="language"
                      value={language.name}
                      checked={selectedLanguage === language.name}
                      onChange={() => setSelectedLanguage(language.name)}
                      className="language-radio"
                    />
                    <div className="language-content">
                      <img src={language.img} alt={`${language.name} flag`} className="flag" />
                      <span className="language-name">{language.name}</span>
                    </div>
                    <div className="radio-indicator"></div>
                  </label>
                ))}
              </div>
              
              <button className="continue-button" onClick={handleContinue}>
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LanguagePage;
