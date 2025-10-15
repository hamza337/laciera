import React,{useState} from 'react';
import styles from './IsolatedDashboard.module.css';
import style from './PreferencesPage.module.css';
import CustomSelect from '../components/CustomSelect';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = React.useState('prosumer');

  // Prosumer state
  const [consumerType, setConsumerType] = React.useState('Residential');
  // const [consumerType, setConsumerType] = useState('Residential');
  const [businessType, setBusinessType] = useState('Partnerships');
  const [firstName, setFirstName] = React.useState('John');
  const [lastName, setLastName] = React.useState('Seo');
  const [email, setEmail] = React.useState('johnseo@gmail.com');
  const [phone, setPhone] = React.useState('6785451212');
  const [coc, setCoc] = React.useState('12345678963');
  const [sustainabilityDriver, setSustainabilityDriver] = React.useState('High');
  const [energyCostSaving, setEnergyCostSaving] = React.useState('High');
  const [switchingFlexibility, setSwitchingFlexibility] = React.useState('Yes');
  const [energyTrading, setEnergyTrading] = React.useState('Yes');
  const [budget, setBudget] = React.useState('< €500');

  // Preferences state
  const [renewablePref, setRenewablePref] = React.useState('Maximize Green Energy Consumption');
  const [operationalHours, setOperationalHours] = React.useState('24-7');
  const [cookingFrequency, setCookingFrequency] = React.useState('Daily');
  const [laundrySchedule, setLaundrySchedule] = React.useState('Daily during Daytime');
  const [dishwashingSchedule, setDishwashingSchedule] = React.useState('Daily during Daytime');
  const [morningUse, setMorningUse] = React.useState('High');
  const [entertainmentUse, setEntertainmentUse] = React.useState('High');
  const [winterHeatingUse, setWinterHeatingUse] = React.useState('High');
  const [summerCoolingUse, setSummerCoolingUse] = React.useState('High');
  const [seasonalAppliance, setSeasonalAppliance] = React.useState('Yes');
  const [holidaySavings, setHolidaySavings] = React.useState('Yes');

  const Radio = ({ value, current, onChange, children }) => (
    <button type="button" className={`${styles.setRadioOption} ${current === value ? styles.setRadioActive : ''}`} onClick={() => onChange(value)} aria-pressed={current === value}>{children}</button>
  );

  const BudgetBtn = ({ value }) => (
    <button type="button" className={`${styles.setBudgetBtn} ${budget === value ? styles.setBudgetActive : ''}`} onClick={() => setBudget(value)}>{value}</button>
  );

  return (
    <section className={styles.ldContent}>
      <div >
        <div>
          <h2 className={styles.ldPageTitle}>Settings</h2>
          <div role="separator" aria-orientation="horizontal" style={{ width: '100%', height: '1px', background: '#E7EAEC', marginTop: '6px', borderRadius: '1px' }}></div>
        </div>
      </div>

      <div className={styles.setLayout}>
        {/* Sidebar */}
        <aside aria-label="Settings sections">
          <div className={styles.setNavList}>
            <button className={`${styles.setNavItem} ${activeTab === 'prosumer' ? styles.setNavActive : ''}`} onClick={() => setActiveTab('prosumer')}>Prosumer Information</button>
            <button className={`${styles.setNavItem} ${activeTab === 'preferences' ? styles.setNavActive : ''}`} onClick={() => setActiveTab('preferences')}>Preferences, Lifestyles & Habits</button>
            <button className={styles.setNavItem} disabled>Device Management</button>
            <button className={styles.setNavItem} disabled>Notification</button>
            <button className={styles.setNavItem} disabled>Security & Account</button>
            <button className={styles.setNavItem} disabled>Support</button>
          </div>
        </aside>

        {/* Content */}
        <div className={styles.setContent}>
          {activeTab === 'prosumer' && (
            <>
              <div className={styles.setFormHeader}>
                <h3 className={styles.setFormTitle}>Prosumer Information</h3>
                <p className={styles.setFormSub}>Tell us a little about yourself. This information helps us understand your needs and provide the best energy solutions.</p>
              </div>
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
            </>
          )}

          {activeTab === 'preferences' && (
            <form className={style.prefFormGrid} onSubmit={(e) => e.preventDefault()}>
              <div className={`${style.prefFormRow} ${style.prefTwoCols}`}>
                <div className={style.col}>
                  <label className={style.prefLabel}>Renewable Energy Preference</label>
                  <div className={style.prefSelect}>
                    <CustomSelect
                      value={renewablePref}
                      onChange={setRenewablePref}
                      options={['Maximize Green Energy Consumption', 'Balanced Usage', 'Minimize Cost']}
                    />
                  </div>
                </div>
                <div className={style.col}>
                  <label className={style.prefLabel}>Operational Hours</label>
                  <div className={style.prefSelect}>
                    <CustomSelect
                      value={operationalHours}
                      onChange={setOperationalHours}
                      options={['24-7', 'Daytime Only', 'Nighttime']}
                    />
                  </div>
                </div>
              </div>

              <div className={`${style.prefFormRow} ${style.prefTwoCols}`}>
                <div className={style.col}>
                  <label className={style.prefLabel}>Morning Routine Energy Use</label>
                  <div className={style.prefRadioGroup}>
                    {['High', 'Moderate', 'Low'].map((opt) => (
                      <div
                        key={opt}
                        className={`${style.prefRadioOption} ${morningUse === opt ? style.prefRadioOptionActive : ''}`}
                        onClick={() => setMorningUse(opt)}
                      >
                        <div className={style.prefRadioCircle} />
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={style.col}>
                  <label className={style.prefLabel}>Entertainment Usage</label>
                  <div className={style.prefRadioGroup}>
                    {['High', 'Moderate', 'Low'].map((opt) => (
                      <div
                        key={opt}
                        className={`${style.prefRadioOption} ${entertainmentUse === opt ? style.prefRadioOptionActive : ''}`}
                        onClick={() => setEntertainmentUse(opt)}
                      >
                        <div className={style.prefRadioCircle} />
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`${style.prefFormRow} ${style.prefTwoCols}`}>
                <div className={style.col}>
                  <label className={style.prefLabel}>Laundry Schedule</label>
                  <div className={style.prefSelect}>
                    <CustomSelect
                      value={laundrySchedule}
                      onChange={setLaundrySchedule}
                      options={['Daily during Daytime', 'Every Other Day', 'Weekly']}
                    />
                  </div>
                </div>
                <div className={style.col}>
                  <label className={style.prefLabel}>Cooking Frequency</label>
                  <div className={style.prefSelect}>
                    <CustomSelect
                      value={cookingFrequency}
                      onChange={setCookingFrequency}
                      options={['Daily', 'Several times a week', 'Occasionally']}
                    />
                  </div>
                </div>
              </div>

              <div className={`${style.prefFormRow} ${style.prefTwoCols}`}>
                <div className={style.col}>
                  <label className={style.prefLabel}>Dishwashing Schedule</label>
                  <div className={style.prefSelect}>
                    <CustomSelect
                      value={dishwashingSchedule}
                      onChange={setDishwashingSchedule}
                      options={['Daily during Daytime', 'Every Other Day', 'Weekly']}
                    />
                  </div>
                </div>
                <div className={style.col}>
                  <label className={style.prefLabel}>Winter Heating Usage</label>
                  <div className={style.prefRadioGroup}>
                    {['High', 'Moderate', 'Low'].map((opt) => (
                      <div
                        key={opt}
                        className={`${style.prefRadioOption} ${winterHeatingUse === opt ? style.prefRadioOptionActive : ''}`}
                        onClick={() => setWinterHeatingUse(opt)}
                      >
                        <div className={style.prefRadioCircle} />
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`${style.prefFormRow} ${style.prefTwoCols}`}>
                <div className={style.col}>
                  <label className={style.prefLabel}>Summer Cooling Usage</label>
                  <div className={style.prefRadioGroup}>
                    {['High', 'Moderate', 'Low'].map((opt) => (
                      <div
                        key={opt}
                        className={`${style.prefRadioOption} ${summerCoolingUse === opt ? style.prefRadioOptionActive : ''}`}
                        onClick={() => setSummerCoolingUse(opt)}
                      >
                        <div className={style.prefRadioCircle} />
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={style.col}>
                  <label className={style.prefLabel}>Seasonal Appliance Usage</label>
                  <div className={style.prefRadioGroup}>
                    {['Yes', 'No'].map((opt) => (
                      <div
                        key={opt}
                        className={`${style.prefRadioOption} ${seasonalAppliance === opt ? style.prefRadioOptionActive : ''}`}
                        onClick={() => setSeasonalAppliance(opt)}
                      >
                        <div className={style.prefRadioCircle} />
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`${style.prefFormRow} ${style.prefTwoCols}`}>
                <div className={style.col}>
                  <label className={style.prefLabel}>Holiday Travel Energy Savings Mode</label>
                  <div className={style.prefRadioGroup}>
                    {['Yes', 'No', 'Occasionally'].map((opt) => (
                      <div
                        key={opt}
                        className={`${style.prefRadioOption} ${holidaySavings === opt ? style.prefRadioOptionActive : ''}`}
                        onClick={() => setHolidaySavings(opt)}
                      >
                        <div className={style.prefRadioCircle} />
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* <div className={style.prefActions}>
                <button type="button" className={`${style.prefButton} ${style.prefBack}`} onClick={() => navigate('/building-info')}>
                  <svg className={style.prefBackIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back
                </button>
                  <button type="submit" className={`${style.prefButton} ${style.prefSave}`} onClick={() => navigate('/app/dashboard')}>Save</button>
              </div> */}
            </form>
          )}
        </div>
      </div>
      <div style={{display:'flex', justifyContent:'flex-end', gap:'12px', borderTop:'1px solid #e0e0e0', paddingTop:'12px'}}>
        <button type="button" className={`${styles.setBtn}`}>Cancel</button>
        <button type="button" className={`${styles.setBtn} ${styles.setSave}`} style={{backgroundColor:'#009382', color:'#fff'}} >Save changes</button>
      </div>
    </section>
  );
};

export default SettingsPage;