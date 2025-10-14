import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProsumerInfoPage.css';
import CustomSelect from '../components/CustomSelect';

function ProsumerInfoPage() {
  const navigate = useNavigate();
  const [consumerType, setConsumerType] = useState('Residential');
  const [businessType, setBusinessType] = useState('Partnerships');
  const [sustainabilityDriver, setSustainabilityDriver] = useState('High');
  const [energyCostSaving, setEnergyCostSaving] = useState('High');
  const [switchingFlexibility, setSwitchingFlexibility] = useState('Yes');
  const [energyTrading, setEnergyTrading] = useState('Yes');
  const [budget, setBudget] = useState('< €500');

  return (
    <div className="prosumer-page">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <img src="/logo.png" alt="Laciera" />
          <div className="step-caption">STEP 1/3</div>
        </div>
        <div className="stepper">
          <div className="step active">
            <div className="circle">1</div>
            <span className="label">Prosumer Information</span>
          </div>
          <div className="step">
            <div className="circle">2</div>
            <span className="label">Building & Installation Information</span>
          </div>
          <div className="step">
            <div className="circle">3</div>
            <span className="label">Preferences, Lifestyles & Habits</span>
          </div>
        </div>
      </aside>

      {/* Right Content */}
      <main className="content">
        <div className="content-inner">
          {/* Mobile Top Stepper (visible on small screens) */}
          <nav className="mobile-stepper" aria-label="Form steps">
            <div className="mobile-stepper-track">
              <div className="mobile-stepper-step active">
                <div className="circle">1</div>
                <span className="label">Prosumer Info</span>
              </div>
              <div className="mobile-stepper-step">
                <div className="circle">2</div>
                <span className="label">Building</span>
              </div>
              <div className="mobile-stepper-step">
                <div className="circle">3</div>
                <span className="label">Preferences</span>
              </div>
            </div>
          </nav>

           <header className="page-header">
             <div className="header-left">
               <h1 className="page-title">Prosumer Information</h1>
               <p className="page-subtitle">
                 Tell us a little about yourself. This information helps us understand your needs and provide the best energy solutions.
               </p>
             </div>
         <div className="header-actions" aria-hidden="true">
           <div className="check-badge" title="Verified">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="9" cy="9" r="8" stroke="#00A693" strokeWidth="2" fill="#E7F7F5"/>
                 <path d="M5.5 9.5L8 12l4.5-4.5" stroke="#00A693" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
           </div>
             <div className="message-badge" title="Info">
               <span className="line"></span>
               <span className="line short"></span>
            </div>
         </div>
{/* +            <img className="header-illustration" src="/about us.png" alt="Header illustration" /> */}
           </header>

          <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
            {/* Row: Consumer Type */}
            <div className="form-row consumer-type">
               <label className="form-label">Consumer Type</label>
               <CustomSelect
                 value={consumerType}
                 onChange={setConsumerType}
                 options={['Residential', 'Commercial', 'Industrial']}
               />
             </div>

            {/* Row: First/Last Name */}
            <div className="form-row two-cols">
              <div className="col">
                <label className="form-label">First Name</label>
                <input className="form-input" placeholder="John" />
              </div>
              <div className="col">
                <label className="form-label">Last Name</label>
                <input className="form-input" placeholder="Seo" />
              </div>
            </div>

            {/* Row: Email/Phone */}
            <div className="form-row two-cols">
              <div className="col">
                <label className="form-label">Email</label>
                <input className="form-input" placeholder="johnseo@gmail.com" />
              </div>
              <div className="col">
                <label className="form-label">Phone Number</label>
                <div className="phone-input-container">
                  <div className="country-selector">
                    <span className="country-flag">🇬🇧</span>
                    <svg className="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 1L5 5L9 1" stroke="#666666" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="vertical-line"></div>
                  <input className="phone-input" type="tel" placeholder="6783451212" />
                </div>
              </div>
            </div>

            {/* Row: Company/CoC */}
            <div className="form-row two-cols">
              <div className="col">
                <label className="form-label">Company Name</label>
                <input className="form-input" placeholder="ABCD" />
              </div>
              <div className="col">
                <label className="form-label">Chamber of Commerce Number (Optional)</label>
                <input className="form-input" placeholder="12345678963" />
              </div>
            </div>

            {/* Row: Business Type + Energy Cost Saving Needs */}
            <div className="form-row two-cols">
              <div className="col">
                <label className="form-label">Business Type</label>
                <CustomSelect
                 value={businessType}
                 onChange={setBusinessType}
                 options={['Partnerships', 'Corporation', 'Sole Proprietorship']}
               />
              </div>
              <div className="col">
                <label className="form-label">Energy Cost Saving Needs</label>
                <div className="radio-options radio-circle">
                  {['High', 'Moderate', 'Low'].map((opt) => (
                    <label key={opt} className={`radio-option ${energyCostSaving === opt ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="costsaving"
                        value={opt}
                        checked={energyCostSaving === opt}
                        onChange={() => setEnergyCostSaving(opt)}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Row: Sustainability Driver + Switching Flexibility */}
            <div className="form-row two-cols">
              <div className="col">
                <label className="form-label">Sustainability Driver</label>
                <div className="radio-options radio-circle">
                  {['High', 'Moderate', 'Low'].map((opt) => (
                    <label key={opt} className={`radio-option ${sustainabilityDriver === opt ? 'active' : ''}`}>
                      <input type="radio" name="sustainability" value={opt} checked={sustainabilityDriver === opt} onChange={() => setSustainabilityDriver(opt)} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="col">
                <label className="form-label">Energy Supplier Switching Flexibility</label>
                <div className="radio-options radio-circle">
                  {['Yes', 'No', 'Depends on Cost Saving'].map((opt) => (
                    <label key={opt} className={`radio-option ${switchingFlexibility === opt ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="flexibility"
                        value={opt}
                        checked={switchingFlexibility === opt}
                        onChange={() => setSwitchingFlexibility(opt)}
                      />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Row: Energy Trading + Budget */}
            <div className="form-row two-cols">
              <div className="col">
                <label className="form-label">Willing to Participate in Energy Trading</label>
                <div className="radio-options radio-circle">
                  {['Yes', 'No', 'Need More Info'].map((opt) => (
                    <label key={opt} className={`radio-option ${energyTrading === opt ? 'active' : ''}`}>
                      <input type="radio" name="trading" value={opt} checked={energyTrading === opt} onChange={() => setEnergyTrading(opt)} />
                      <span>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="col">
                <label className="form-label">Budget for Energy Efficiency Upgrades</label>
                <div className="budget-group">
                  {['< €500', '€500–€2,000', '€2,000–€5,000', '€5,000+'].map((opt) => (
                    <label key={opt} className={`budget-option ${budget === opt ? 'active' : ''}`}>
                      <input
                        type="radio"
                        name="budget"
                        value={opt}
                        checked={budget === opt}
                        onChange={() => setBudget(opt)}
                      />
                      <span className="budget-label">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </form>

          {/* Spacer */}
          <div style={{ height: 16 }} />

          {/* Footer Next Button */}
          <div className="form-footer">
            <button type="button" className="next-button" onClick={() => navigate('/building-info')}>
              Next
              <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ProsumerInfoPage;