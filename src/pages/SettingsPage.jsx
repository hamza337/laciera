import React from 'react';
import styles from './IsolatedDashboard.module.css';
import CustomSelect from '../components/CustomSelect';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = React.useState('prosumer');

  // Prosumer state
  const [consumerType, setConsumerType] = React.useState('Residential');
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
      <div className={styles.ldHeaderRow}>
        <div>
          <h2 className={styles.ldPageTitle}>Settings</h2>
          <p className={styles.ldPageSub}>Configure preferences and account</p>
        </div>
      </div>

      <div className={styles.setLayout}>
        {/* Sidebar */}
        <aside className={styles.setSidebar} aria-label="Settings sections">
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
            <div className={styles.ldPanel}>
              <div className={styles.ldPanelHeader}><span>Prosumer Information</span></div>
              <div className={styles.setFormHeader}>
                <h3 className={styles.setFormTitle}>Prosumer Information</h3>
                <p className={styles.setFormSub}>Tell us a little about yourself. This information helps us understand your needs and provide the best energy solutions.</p>
              </div>
              <div className={styles.setFormGrid}>
                <div className={styles.setRow}>
                  <label className={styles.setLabel}>Consumer Type</label>
                  <CustomSelect value={consumerType} onChange={setConsumerType} options={["Residential","Commercial","Industrial"]} />
                </div>
                <div className={`${styles.setRow} ${styles.setTwoCols}`}>
                  <div>
                    <label className={styles.setLabel}>First Name</label>
                    <input className={styles.setInput} value={firstName} onChange={(e)=>setFirstName(e.target.value)} />
                  </div>
                  <div>
                    <label className={styles.setLabel}>Last Name</label>
                    <input className={styles.setInput} value={lastName} onChange={(e)=>setLastName(e.target.value)} />
                  </div>
                </div>
                <div className={`${styles.setRow} ${styles.setTwoCols}`}>
                  <div>
                    <label className={styles.setLabel}>Email</label>
                    <input className={styles.setInput} value={email} onChange={(e)=>setEmail(e.target.value)} />
                  </div>
                  <div>
                    <label className={styles.setLabel}>Phone Number</label>
                    <div className={styles.setPhoneWrap}>
                      <span className={styles.setPhoneCountry}>🇬🇧</span>
                      <input className={styles.setPhoneInput} value={phone} onChange={(e)=>setPhone(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className={`${styles.setRow} ${styles.setTwoCols}`}>
                  <div>
                    <label className={styles.setLabel}>Chamber of Commerce Number (Optional)</label>
                    <input className={styles.setInput} value={coc} onChange={(e)=>setCoc(e.target.value)} />
                  </div>
                </div>
                <div className={`${styles.setRow} ${styles.setTwoCols}`}>
                  <div>
                    <label className={styles.setLabel}>Sustainability Driver</label>
                    <div className={styles.setRadioGroup}>
                      {['High','Moderate','Low'].map((opt)=> (
                        <Radio key={opt} value={opt} current={sustainabilityDriver} onChange={setSustainabilityDriver}>{opt}</Radio>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={styles.setLabel}>Energy Cost Saving Needs</label>
                    <div className={styles.setRadioGroup}>
                      {['High','Moderate','Low'].map((opt)=> (
                        <Radio key={opt} value={opt} current={energyCostSaving} onChange={setEnergyCostSaving}>{opt}</Radio>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={`${styles.setRow} ${styles.setTwoCols}`}>
                  <div>
                    <label className={styles.setLabel}>Energy Supplier Switching Flexibility</label>
                    <div className={styles.setRadioGroup}>
                      {['Yes','No','Depends on Cost Saving'].map((opt)=> (
                        <Radio key={opt} value={opt} current={switchingFlexibility} onChange={setSwitchingFlexibility}>{opt}</Radio>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={styles.setLabel}>Willing to Participate in Energy Trading</label>
                    <div className={styles.setRadioGroup}>
                      {['Yes','No','Need More Info'].map((opt)=> (
                        <Radio key={opt} value={opt} current={energyTrading} onChange={setEnergyTrading}>{opt}</Radio>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.setRow}>
                  <label className={styles.setLabel}>Budget for Energy Efficiency Upgrades</label>
                  <div className={styles.setBudgetGroup}>
                    {['< €500','€500–€2,000','€2,000–€5,000','€5,000+'].map((opt)=> (
                      <BudgetBtn key={opt} value={opt} />
                    ))}
                  </div>
                </div>
                <div className={styles.setActions}>
                  <button type="button" className={`${styles.setBtn} ${styles.setCancel}`}>Cancel</button>
                  <button type="button" className={`${styles.setBtn} ${styles.setSave}`}>Save changes</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className={styles.ldPanel}>
              <div className={styles.ldPanelHeader}><span>Preferences, Lifestyles & Habits</span></div>
              <div className={styles.setFormHeader}>
                <h3 className={styles.setFormTitle}>Preferences, Lifestyles & Habits</h3>
                <p className={styles.setFormSub}>Tell us about your lifestyle and comfort preferences.</p>
              </div>
              <div className={styles.setFormGrid}>
                <div className={`${styles.setRow} ${styles.setTwoCols}`}>
                  <div>
                    <label className={styles.setLabel}>Renewable Energy Preference</label>
                    <CustomSelect value={renewablePref} onChange={setRenewablePref} options={["Maximize Green Energy Consumption","Balanced Usage","Minimize Cost"]} />
                  </div>
                  <div>
                    <label className={styles.setLabel}>Operational Hours</label>
                    <CustomSelect value={operationalHours} onChange={setOperationalHours} options={["24-7","Daytime Only","Nighttime"]} />
                  </div>
                </div>
                <div className={`${styles.setRow} ${styles.setTwoCols}`}>
                  <div>
                    <label className={styles.setLabel}>Morning Routine Energy Use</label>
                    <div className={styles.setRadioGroup}>
                      {['High','Moderate','Low'].map((opt)=> (
                        <Radio key={opt} value={opt} current={morningUse} onChange={setMorningUse}>{opt}</Radio>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={styles.setLabel}>Entertainment Usage</label>
                    <div className={styles.setRadioGroup}>
                      {['High','Moderate','Low'].map((opt)=> (
                        <Radio key={opt} value={opt} current={entertainmentUse} onChange={setEntertainmentUse}>{opt}</Radio>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={`${styles.setRow} ${styles.setTwoCols}`}>
                  <div>
                    <label className={styles.setLabel}>Laundry Schedule</label>
                    <CustomSelect value={laundrySchedule} onChange={setLaundrySchedule} options={["Daily during Daytime","Every Other Day","Weekly"]} />
                  </div>
                  <div>
                    <label className={styles.setLabel}>Cooking Frequency</label>
                    <CustomSelect value={cookingFrequency} onChange={setCookingFrequency} options={["Daily","Several times a week","Occasionally"]} />
                  </div>
                </div>
                <div className={`${styles.setRow} ${styles.setTwoCols}`}>
                  <div>
                    <label className={styles.setLabel}>Dishwashing Schedule</label>
                    <CustomSelect value={dishwashingSchedule} onChange={setDishwashingSchedule} options={["Daily during Daytime","Every Other Day","Weekly"]} />
                  </div>
                  <div>
                    <label className={styles.setLabel}>Winter Heating Usage</label>
                    <div className={styles.setRadioGroup}>
                      {['High','Moderate','Low'].map((opt)=> (
                        <Radio key={opt} value={opt} current={winterHeatingUse} onChange={setWinterHeatingUse}>{opt}</Radio>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={`${styles.setRow} ${styles.setTwoCols}`}>
                  <div>
                    <label className={styles.setLabel}>Summer Cooling Usage</label>
                    <div className={styles.setRadioGroup}>
                      {['High','Moderate','Low'].map((opt)=> (
                        <Radio key={opt} value={opt} current={summerCoolingUse} onChange={setSummerCoolingUse}>{opt}</Radio>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={styles.setLabel}>Seasonal Appliance Usage</label>
                    <div className={styles.setRadioGroup}>
                      {['Yes','No'].map((opt)=> (
                        <Radio key={opt} value={opt} current={seasonalAppliance} onChange={setSeasonalAppliance}>{opt}</Radio>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.setRow}>
                  <label className={styles.setLabel}>Holiday Travel Energy Savings Mode</label>
                  <div className={styles.setRadioGroup}>
                    {['Yes','No','Occasionally'].map((opt)=> (
                      <Radio key={opt} value={opt} current={holidaySavings} onChange={setHolidaySavings}>{opt}</Radio>
                    ))}
                  </div>
                </div>
                <div className={styles.setActions}>
                  <button type="button" className={`${styles.setBtn} ${styles.setCancel}`}>Cancel</button>
                  <button type="button" className={`${styles.setBtn} ${styles.setSave}`}>Save changes</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SettingsPage;