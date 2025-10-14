import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BuildingInfoPage.css';
// Using public folder assets
const logo = '/logo.png';
import CustomSelect from '../components/CustomSelect';

function BuildingInfoPage() {
  const navigate = useNavigate();
  // Building Information States
  const [buildingType, setBuildingType] = useState('Apartment');
  const [yearOfConstruction, setYearOfConstruction] = useState('2011-2020');
  const [householdSize, setHouseholdSize] = useState('5');
  const [province, setProvince] = useState('Drenthe');
  const [address, setAddress] = useState('Zonnestraat 45A, 1053 CD Amsterdam, Netherlands');
  const [bemsInstalled, setBemsInstalled] = useState('Yes');
  const [smartMeterInstalled, setSmartMeterInstalled] = useState('Yes');
  const [energySupplier, setEnergySupplier] = useState('Aurora Energy');
  const [floorSpace, setFloorSpace] = useState('101-150 m²');
  const [energyLabel, setEnergyLabel] = useState('A');
  const [country, setCountry] = useState('Netherlands');
  const [city, setCity] = useState('Amsterdam');
  const [workFromHome, setWorkFromHome] = useState('Hybrid');
  const [smartHomeEnabled, setSmartHomeEnabled] = useState('Yes');
  const [networkProvider, setNetworkProvider] = useState('Enexis');
  const [contractType, setContractType] = useState('Fixed');

  // Installation Information States
  const [connectionObject, setConnectionObject] = useState('123456789');
  const [connectionCapacity, setConnectionCapacity] = useState('1x10 ampere');
  const [monthlyConsumption, setMonthlyConsumption] = useState('200');
  const [peakUsageTime, setPeakUsageTime] = useState('Afternoon');
  const [heatingSystem, setHeatingSystem] = useState('Electric Heat Pump');
  const [coolingSystem, setCoolingSystem] = useState('Split AC');
  const [waterHeatingSystem, setWaterHeatingSystem] = useState('Solar Water Heater');
  const [evChargingSchedule, setEvChargingSchedule] = useState('Daytime');
  const [batteryUsage, setBatteryUsage] = useState('Daily Load Balancing');
  const [solarPanelsCount, setSolarPanelsCount] = useState('8');
  const [batteryInstalled, setBatteryInstalled] = useState('Yes');
  const [solarInstalled, setSolarInstalled] = useState('Yes');
  const [appliances, setAppliances] = useState('Washing Machine');

  const [activeTab, setActiveTab] = useState('building'); // Add state for active tab

  return (
    <div className="prosumer-page">
      {/* Left Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <img src="/logo.png" alt="Laciera" />
          <div className="step-caption">STEP 2/3</div>
        </div>
        <div className="stepper">
          <div className="step completed">
            <div className="circle">1</div>
            <span className="label">Prosumer Information</span>
          </div>
          <div className="step active">
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
              <div className="mobile-stepper-step completed">
                <div className="circle">1</div>
                <span className="label">Prosumer</span>
              </div>
              <div className="mobile-stepper-step active">
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
              <h1 className="page-title">Building & Installation Information</h1>
              <p className="page-subtitle">
                Tell us about your energy setup and installed systems to help us better understand your building and suggest accurate plans.
              </p>
            </div>
            {/* <img 
              src="https://placehold.co/280x200/e7f7f5/009382?text=Building+Illustration"
              alt="Building illustration" 
              className="header-illustration"
            /> */}
          </header>

          <form className="form-grid" onSubmit={(e) => e.preventDefault()}>
            <div className="form-tabs">
              <button 
                className={`tab-button ${activeTab === 'building' ? 'active' : ''}`}
                onClick={() => setActiveTab('building')}
                type="button"
              >
                Building Information
              </button>
              <button 
                className={`tab-button ${activeTab === 'installation' ? 'active' : ''}`}
                onClick={() => setActiveTab('installation')}
                type="button"
              >
                Installation Information
              </button>
            </div>

            {/* Building Information Section */}
            <div className={`form-section ${activeTab === 'building' ? 'active' : ''}`}>
              {/* Row: Building Type + Floor Space */}
              <div className="form-row two-cols">
                <div className="col">
                  <label className="form-label">Building Type</label>
                  <CustomSelect
                    value={buildingType}
                    onChange={setBuildingType}
                    options={['Apartment', 'House', 'Office']}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Floor Space</label>
                  <CustomSelect
                    value={floorSpace}
                    onChange={setFloorSpace}
                    options={['< 50 m²', '51-100 m²', '101-150 m²', '> 150 m²']}
                  />
                </div>
              </div>

              {/* Row: Year of Construction + Energy Label */}
              <div className="form-row two-cols">
                <div className="col">
                  <label className="form-label">Year of Construction</label>
                  <CustomSelect
                    value={yearOfConstruction}
                    onChange={setYearOfConstruction}
                    options={['Before 1990', '1991-2000', '2001-2010', '2011-2020', 'After 2020']}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Current Energy Label</label>
                  <CustomSelect
                    value={energyLabel}
                    onChange={setEnergyLabel}
                    options={['A+++', 'A++', 'A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G']}
                  />
                </div>
              </div>

              {/* Row: Household Size + Country */}
              <div className="form-row two-cols">
                <div className="col">
                  <label className="form-label">Household Size</label>
                  <CustomSelect
                    value={householdSize}
                    onChange={setHouseholdSize}
                    options={['1', '2', '3', '4', '5', '6+']}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Country</label>
                  <CustomSelect
                    value={country}
                    onChange={setCountry}
                    options={['Netherlands', 'Belgium', 'Germany']}
                  />
                </div>
              </div>

              {/* Row: Province + City */}
              <div className="form-row two-cols">
                <div className="col">
                  <label className="form-label">Province</label>
                  <CustomSelect
                    value={province}
                    onChange={setProvince}
                    options={['Drenthe', 'Flevoland', 'Friesland', 'Gelderland']}
                  />
                </div>
                <div className="col">
                  <label className="form-label">City</label>
                  <CustomSelect
                    value={city}
                    onChange={setCity}
                    options={['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht']}
                  />
                </div>
              </div>

              {/* Row: Address */}
              <div className="form-row">
                <div className="col">
                  <label className="form-label">Address</label>
                  <input
                    className="form-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                  />
                </div>
              </div>

              {/* Row: BEMS + Smart Home */}
              <div className="form-row two-cols">
                <div className="col">
                  <label className="form-label">Building Energy Management System (BEMS) Installed?</label>
                  <div className="radio-options radio-circle">
                    {['Yes', 'No', 'Partially'].map((opt) => (
                      <label key={opt} className={`radio-option ${bemsInstalled === opt ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="bems"
                          value={opt}
                          checked={bemsInstalled === opt}
                          onChange={() => setBemsInstalled(opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="col">
                  <label className="form-label">Smart Home Enabled?</label>
                  <div className="radio-options radio-circle">
                    {['Yes', 'No', 'Partially'].map((opt) => (
                      <label key={opt} className={`radio-option ${smartHomeEnabled === opt ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="smarthome"
                          value={opt}
                          checked={smartHomeEnabled === opt}
                          onChange={() => setSmartHomeEnabled(opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row: Smart Meter + Network Provider */}
              <div className="form-row two-cols">
                <div className="col">
                  <label className="form-label">Smart Meter Installed?</label>
                  <div className="radio-options radio-circle">
                    {['Yes', 'No', 'Unknown'].map((opt) => (
                      <label key={opt} className={`radio-option ${smartMeterInstalled === opt ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="smartmeter"
                          value={opt}
                          checked={smartMeterInstalled === opt}
                          onChange={() => setSmartMeterInstalled(opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="col">
                  <label className="form-label">Network Provider</label>
                  <CustomSelect
                    value={networkProvider}
                    onChange={setNetworkProvider}
                    options={['Enexis', 'Liander', 'Stedin']}
                  />
                </div>
              </div>

              {/* Row: Energy Supplier + Contract Type */}
              <div className="form-row two-cols">
                <div className="col">
                  <label className="form-label">Energy Supplier</label>
                  <input
                    className="form-input"
                    value={energySupplier}
                    onChange={(e) => setEnergySupplier(e.target.value)}
                    placeholder="Enter your energy supplier"
                  />
                </div>
                <div className="col">
                  <label className="form-label">Contract type</label>
                  <CustomSelect
                    value={contractType}
                    onChange={setContractType}
                    options={['Fixed', 'Variable', 'Hybrid']}
                  />
                </div>
              </div>
            </div>

            {/* Installation Information Section */}
            <div className={`form-section ${activeTab === 'installation' ? 'active' : ''}`}>
              {/* Row: Connection Object + Capacity */}
              <div className="form-row two-cols">
                <div className="col">
                  <label className="form-label">Connection Object ID (EAN)</label>
                  <input
                    className="form-input"
                    value={connectionObject}
                    onChange={(e) => setConnectionObject(e.target.value)}
                    placeholder="Enter EAN number"
                  />
                </div>
                <div className="col">
                  <label className="form-label">Connection Object Capacity</label>
                  <CustomSelect
                    value={connectionCapacity}
                    onChange={setConnectionCapacity}
                    options={['1x10 ampere', '3x25 ampere', '3x35 ampere']}
                  />
                </div>
              </div>

              {/* Row: Monthly Consumption + Peak Usage */}
              <div className="form-row two-cols">
                <div className="col">
                  <label className="form-label">Average Monthly Electricity Consumption (kWh)</label>
                  <input
                    className="form-input"
                    value={monthlyConsumption}
                    onChange={(e) => setMonthlyConsumption(e.target.value)}
                    placeholder="Enter consumption in kWh"
                  />
                </div>
                <div className="col">
                  <label className="form-label">Peak Electricity Usage Time</label>
                  <CustomSelect
                    value={peakUsageTime}
                    onChange={setPeakUsageTime}
                    options={['Morning', 'Afternoon', 'Evening', 'Night']}
                  />
                </div>
              </div>

              {/* Row: Heating + Cooling System */}
              <div className="form-row two-cols">
                <div className="col">
                  <label className="form-label">Heating System</label>
                  <CustomSelect
                    value={heatingSystem}
                    onChange={setHeatingSystem}
                    options={['Electric Heat Pump', 'Gas Boiler', 'District Heating']}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Cooling System</label>
                  <CustomSelect
                    value={coolingSystem}
                    onChange={setCoolingSystem}
                    options={['Split AC', 'Central AC', 'None']}
                  />
                </div>
              </div>

              {/* Row: Water Heating + EV Charging */}
              <div className="form-row two-cols">
                <div className="col">
                  <label className="form-label">Water Heating System</label>
                  <CustomSelect
                    value={waterHeatingSystem}
                    onChange={setWaterHeatingSystem}
                    options={['Solar Water Heater', 'Electric Boiler', 'Gas Boiler']}
                  />
                </div>
                <div className="col">
                  <label className="form-label">EV Charging Schedule</label>
                  <CustomSelect
                    value={evChargingSchedule}
                    onChange={setEvChargingSchedule}
                    options={['Daytime', 'Night-time', 'Mixed', 'Not Applicable']}
                  />
                </div>
              </div>

              {/* Row: Battery Usage + Solar Panels */}
              <div className="form-row two-cols">
                <div className="col">
                  <label className="form-label">Battery Backup Usage</label>
                  <CustomSelect
                    value={batteryUsage}
                    onChange={setBatteryUsage}
                    options={['Daily Load Balancing', 'Emergency Backup', 'Peak Shaving']}
                  />
                </div>
                <div className="col">
                  <label className="form-label">Number of Solar Panels</label>
                  <input
                    className="form-input"
                    value={solarPanelsCount}
                    onChange={(e) => setSolarPanelsCount(e.target.value)}
                    placeholder="Enter number of panels"
                  />
                </div>
              </div>

              {/* Row: Battery + Solar Installation Status */}
              <div className="form-row two-cols">
                <div className="col">
                  <label className="form-label">Battery Storage Installed?</label>
                  <div className="radio-options radio-circle">
                    {['Yes', 'No', 'Planning to Install'].map((opt) => (
                      <label key={opt} className={`radio-option ${batteryInstalled === opt ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="battery"
                          value={opt}
                          checked={batteryInstalled === opt}
                          onChange={() => setBatteryInstalled(opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="col">
                  <label className="form-label">Solar Panels Installed?</label>
                  <div className="radio-options radio-circle">
                    {['Yes', 'No', 'Planning to Install'].map((opt) => (
                      <label key={opt} className={`radio-option ${solarInstalled === opt ? 'active' : ''}`}>
                        <input
                          type="radio"
                          name="solar"
                          value={opt}
                          checked={solarInstalled === opt}
                          onChange={() => setSolarInstalled(opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row: Appliances */}
              <div className="form-row">
                <div className="col">
                  <label className="form-label">Which Devices/Appliances do you have</label>
                  <input
                    className="form-input"
                    value={appliances}
                    onChange={(e) => setAppliances(e.target.value)}
                    placeholder="Enter your devices/appliances"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="form-buttons">
              <button className="button-secondary" onClick={() => navigate('/prosumer')}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.8337 10H4.16699" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 15.8334L4.16667 10L10 4.16669" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Back
              </button>
              <button className="button-outline" onClick={() => navigate('/dashboard-isolated')}>
                Skip & Go To Dashboard
              </button>
              <button className="button-primary" onClick={() => navigate('/preferences')}>
                Next
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.16699 10H15.8337" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 4.16669L15.8333 10L10 15.8334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default BuildingInfoPage;