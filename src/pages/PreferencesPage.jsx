import React, { useState } from 'react';
import styles from './PreferencesPage.module.css';
import CustomSelect from '../components/CustomSelect';
import { useNavigate } from 'react-router-dom';

function PreferencesPage() {
  // Example local state mirroring building form fields (can be wired later)
  const [renewablePref, setRenewablePref] = useState('Maximize Green Energy Consumption');
  const [operationalHours, setOperationalHours] = useState('24-7');
  const [cookingFrequency, setCookingFrequency] = useState('Daily');
  const [laundrySchedule, setLaundrySchedule] = useState('Daily during Daytime');
  const [dishwashingSchedule, setDishwashingSchedule] = useState('Daily during Daytime');

  // radio selections
  const [morningUse, setMorningUse] = useState('High');
  const [entertainmentUse, setEntertainmentUse] = useState('High');
  const [winterHeatingUse, setWinterHeatingUse] = useState('High');
  const [summerCoolingUse, setSummerCoolingUse] = useState('High');
  const [seasonalAppliance, setSeasonalAppliance] = useState('Yes');
  const [holidaySavings, setHolidaySavings] = useState('Yes');
  
  // navigation
  const navigate = useNavigate();

  return (
    <div className={styles.prefLayout}>
      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <img src="/logo.png" alt="Laciera" />
          <div className="step-caption">STEP 1/3</div>
        </div>
        <div className="stepper">
          <div className="step completed">
            <div className="circle">1</div>
            <span className="label">Prosumer Information</span>
          </div>
          <div className="step completed">
            <div className="circle">2</div>
            <span className="label">Building & Installation Information</span>
          </div>
          <div className="step active">
            <div className="circle">3</div>
            <span className="label">Preferences, Lifestyles & Habits</span>
          </div>
        </div>
      </aside>

      {/* Right Content */}
      <main className={styles.prefContent}>
        <div className={styles.prefContentInner}>
          {/* Mobile Top Stepper (visible on small screens) */}
          <nav className="mobile-stepper" aria-label="Form steps">
            <div className="mobile-stepper-track">
              <div className="mobile-stepper-step completed">
                <div className="circle">1</div>
                <span className="label">Prosumer</span>
              </div>
              <div className="mobile-stepper-step completed">
                <div className="circle">2</div>
                <span className="label">Building</span>
              </div>
              <div className="mobile-stepper-step active">
                <div className="circle">3</div>
                <span className="label">Preferences</span>
              </div>
            </div>
          </nav>
          <header className={styles.prefHeader}>
            <div className={styles.headerLeft}>
              <h1 className={styles.prefTitle}>Preferences, Lifestyles & Habits</h1>
              <p className={styles.prefSubtitle}>Tell us about your lifestyle and comfort preferences.</p>
            </div>
            {/* Optional illustration space */}
          </header>

          <form className={styles.prefFormGrid} onSubmit={(e) => e.preventDefault()}>
            <div className={`${styles.prefFormRow} ${styles.prefTwoCols}`}>
              <div className={styles.col}>
                <label className={styles.prefLabel}>Renewable Energy Preference</label>
                <div className={styles.prefSelect}>
                  <CustomSelect
                    value={renewablePref}
                    onChange={setRenewablePref}
                    options={['Maximize Green Energy Consumption', 'Balanced Usage', 'Minimize Cost']}
                  />
                </div>
              </div>
              <div className={styles.col}>
                <label className={styles.prefLabel}>Operational Hours</label>
                <div className={styles.prefSelect}>
                  <CustomSelect
                    value={operationalHours}
                    onChange={setOperationalHours}
                    options={['24-7', 'Daytime Only', 'Nighttime']}
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.prefFormRow} ${styles.prefTwoCols}`}>
              <div className={styles.col}>
                <label className={styles.prefLabel}>Morning Routine Energy Use</label>
                <div className={styles.prefRadioGroup}>
                  {['High', 'Moderate', 'Low'].map((opt) => (
                    <div
                      key={opt}
                      className={`${styles.prefRadioOption} ${morningUse === opt ? styles.prefRadioOptionActive : ''}`}
                      onClick={() => setMorningUse(opt)}
                    >
                      <div className={styles.prefRadioCircle} />
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.col}>
                <label className={styles.prefLabel}>Entertainment Usage</label>
                <div className={styles.prefRadioGroup}>
                  {['High', 'Moderate', 'Low'].map((opt) => (
                    <div
                      key={opt}
                      className={`${styles.prefRadioOption} ${entertainmentUse === opt ? styles.prefRadioOptionActive : ''}`}
                      onClick={() => setEntertainmentUse(opt)}
                    >
                      <div className={styles.prefRadioCircle} />
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${styles.prefFormRow} ${styles.prefTwoCols}`}>
              <div className={styles.col}>
                <label className={styles.prefLabel}>Laundry Schedule</label>
                <div className={styles.prefSelect}>
                  <CustomSelect
                    value={laundrySchedule}
                    onChange={setLaundrySchedule}
                    options={['Daily during Daytime', 'Every Other Day', 'Weekly']}
                  />
                </div>
              </div>
              <div className={styles.col}>
                <label className={styles.prefLabel}>Cooking Frequency</label>
                <div className={styles.prefSelect}>
                  <CustomSelect
                    value={cookingFrequency}
                    onChange={setCookingFrequency}
                    options={['Daily', 'Several times a week', 'Occasionally']}
                  />
                </div>
              </div>
            </div>

            <div className={`${styles.prefFormRow} ${styles.prefTwoCols}`}>
              <div className={styles.col}>
                <label className={styles.prefLabel}>Dishwashing Schedule</label>
                <div className={styles.prefSelect}>
                  <CustomSelect
                    value={dishwashingSchedule}
                    onChange={setDishwashingSchedule}
                    options={['Daily during Daytime', 'Every Other Day', 'Weekly']}
                  />
                </div>
              </div>
              <div className={styles.col}>
                <label className={styles.prefLabel}>Winter Heating Usage</label>
                <div className={styles.prefRadioGroup}>
                  {['High', 'Moderate', 'Low'].map((opt) => (
                    <div
                      key={opt}
                      className={`${styles.prefRadioOption} ${winterHeatingUse === opt ? styles.prefRadioOptionActive : ''}`}
                      onClick={() => setWinterHeatingUse(opt)}
                    >
                      <div className={styles.prefRadioCircle} />
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${styles.prefFormRow} ${styles.prefTwoCols}`}>
              <div className={styles.col}>
                <label className={styles.prefLabel}>Summer Cooling Usage</label>
                <div className={styles.prefRadioGroup}>
                  {['High', 'Moderate', 'Low'].map((opt) => (
                    <div
                      key={opt}
                      className={`${styles.prefRadioOption} ${summerCoolingUse === opt ? styles.prefRadioOptionActive : ''}`}
                      onClick={() => setSummerCoolingUse(opt)}
                    >
                      <div className={styles.prefRadioCircle} />
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
              <div className={styles.col}>
                <label className={styles.prefLabel}>Seasonal Appliance Usage</label>
                <div className={styles.prefRadioGroup}>
                  {['Yes', 'No'].map((opt) => (
                    <div
                      key={opt}
                      className={`${styles.prefRadioOption} ${seasonalAppliance === opt ? styles.prefRadioOptionActive : ''}`}
                      onClick={() => setSeasonalAppliance(opt)}
                    >
                      <div className={styles.prefRadioCircle} />
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`${styles.prefFormRow} ${styles.prefTwoCols}`}>
              <div className={styles.col}>
                <label className={styles.prefLabel}>Holiday Travel Energy Savings Mode</label>
                <div className={styles.prefRadioGroup}>
                  {['Yes', 'No', 'Occasionally'].map((opt) => (
                    <div
                      key={opt}
                      className={`${styles.prefRadioOption} ${holidaySavings === opt ? styles.prefRadioOptionActive : ''}`}
                      onClick={() => setHolidaySavings(opt)}
                    >
                      <div className={styles.prefRadioCircle} />
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.prefActions}>
              <button type="button" className={`${styles.prefButton} ${styles.prefBack}`} onClick={() => navigate('/building-info')}>
                <svg className={styles.prefBackIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back
              </button>
                <button type="submit" className={`${styles.prefButton} ${styles.prefSave}`} onClick={() => navigate('/app/dashboard')}>Save</button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default PreferencesPage;