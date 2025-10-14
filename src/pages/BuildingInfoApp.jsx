import React, { useState } from 'react';
import layoutStyles from './IsolatedDashboard.module.css';
import styles from './BuildingInfoApp.module.css';
import CustomSelect from '../components/CustomSelect';

const InfoItem = ({ label, value }) => (
  <div className={styles.infoItem}>
    <div className={styles.label}>{label}</div>
    <div className={styles.chip} aria-label={`${label}: ${value}`}>{value}</div>
  </div>
);

function BuildingInfoApp() {
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('building');

  const onSave = () => {
    setIsModalOpen(false);
  };

  return (
    <section className={layoutStyles.ldContent}>
      <div className={layoutStyles.ldHeaderRow}>
        <div>
          <h2 className={layoutStyles.ldPageTitle}>Building Information</h2>
          <p className={layoutStyles.ldPageSub}>View and manage your building & installation information</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.editBtn} onClick={() => setIsModalOpen(true)} aria-label="Edit Building Information">Edit</button>
        </div>
      </div>

      <div className={styles.panelGrid}>
        {/* Building Information Card */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionTitle}>Building Information</div>
          <div className={styles.infoGrid}>
            <InfoItem label="Building Type" value={buildingType} />
            <InfoItem label="Floor Space" value={floorSpace} />
            <InfoItem label="Year of Construction" value={yearOfConstruction} />
            <InfoItem label="Current Energy Label" value={energyLabel} />
            <InfoItem label="Household Size" value={householdSize} />
            <InfoItem label="Country" value={country} />
            <InfoItem label="Province" value={province} />
            <InfoItem label="City" value={city} />
            <InfoItem label="Address" value={address} />
            <InfoItem label="Work-from-Home Status" value={workFromHome} />
            <InfoItem label="Smart Home Enabled" value={smartHomeEnabled} />
            <InfoItem label="Network Provider" value={networkProvider} />
            <InfoItem label="Energy Supplier" value={energySupplier} />
            <InfoItem label="Contract Type" value={contractType} />
          </div>
        </div>

        {/* Installation Information Card */}
        <div className={styles.sectionCard}>
          <div className={styles.sectionTitle}>Installation Information</div>
          <div className={styles.infoGrid}>
            <InfoItem label="Connection Object ID (EAN)" value={connectionObject} />
            <InfoItem label="Connection Object Capacity" value={connectionCapacity} />
            <InfoItem label="Average Monthly Electricity Consumption (kWh)" value={monthlyConsumption} />
            <InfoItem label="Peak Electricity Usage Time" value={peakUsageTime} />
            <InfoItem label="Heating System" value={heatingSystem} />
            <InfoItem label="Cooling System" value={coolingSystem} />
            <InfoItem label="Water Heating System" value={waterHeatingSystem} />
            <InfoItem label="EV Charging Schedule" value={evChargingSchedule} />
            <InfoItem label="Battery Backup Usage" value={batteryUsage} />
            <InfoItem label="Number of Solar Panels" value={solarPanelsCount} />
            <InfoItem label="Battery Storage Installed" value={batteryInstalled} />
            <InfoItem label="Solar Panels Installed" value={solarInstalled} />
            <InfoItem label="Devices/Appliances" value={appliances} />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="bi-modal-title">
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <div id="bi-modal-title" className={styles.modalTitle}>Building Information</div>
              <button className={styles.modalClose} aria-label="Close" onClick={() => setIsModalOpen(false)}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M4 4L14 14M14 4L4 14" stroke="#171A1C" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className={styles.tabs} role="tablist" aria-label="Building info tabs">
              <button className={`${styles.tab} ${activeTab === 'building' ? styles.tabActive : ''}`} role="tab" aria-selected={activeTab === 'building'} onClick={() => setActiveTab('building')}>Building Information</button>
              <button className={`${styles.tab} ${activeTab === 'installation' ? styles.tabActive : ''}`} role="tab" aria-selected={activeTab === 'installation'} onClick={() => setActiveTab('installation')}>Installation Information</button>
            </div>

            <div className={styles.modalBody}>
              {activeTab === 'building' && (
                <>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>Building Type</label>
                      <div className={styles.select}>
                        <CustomSelect value={buildingType} onChange={setBuildingType} options={['Apartment', 'House', 'Office']} />
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label>Floor Space</label>
                      <div className={styles.select}>
                        <CustomSelect value={floorSpace} onChange={setFloorSpace} options={['< 50 m²', '51-100 m²', '101-150 m²', '> 150 m²']} />
                      </div>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>Year of Construction</label>
                      <div className={styles.select}>
                        <CustomSelect value={yearOfConstruction} onChange={setYearOfConstruction} options={['Before 1990', '1991-2000', '2001-2010', '2011-2020', 'After 2020']} />
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label>Current Energy Label</label>
                      <div className={styles.select}>
                        <CustomSelect value={energyLabel} onChange={setEnergyLabel} options={['A+++', 'A++', 'A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G']} />
                      </div>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>Household Size</label>
                      <div className={styles.select}>
                        <CustomSelect value={householdSize} onChange={setHouseholdSize} options={['1', '2', '3', '4', '5', '6+']} />
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label>Country</label>
                      <div className={styles.select}>
                        <CustomSelect value={country} onChange={setCountry} options={['Netherlands', 'Belgium', 'Germany']} />
                      </div>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>Province</label>
                      <div className={styles.select}>
                        <CustomSelect value={province} onChange={setProvince} options={['Drenthe', 'Flevoland', 'Friesland', 'Gelderland']} />
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label>City</label>
                      <div className={styles.select}>
                        <CustomSelect value={city} onChange={setCity} options={['Amsterdam', 'Rotterdam', 'The Hague', 'Utrecht']} />
                      </div>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>Address</label>
                      <input className={styles.input} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your address" />
                    </div>
                    <div className={styles.field}>
                      <label>Work-from-Home Status</label>
                      <div className={styles.select}>
                        <CustomSelect value={workFromHome} onChange={setWorkFromHome} options={['Fully Remote', 'Hybrid', 'On-site']} />
                      </div>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>Building Energy Management System (BEMS) Installed?</label>
                      <div className={styles.radioRow}>
                        {['Yes', 'No', 'Partially'].map((opt) => (
                          <label key={opt} className={styles.radio}>
                            <input type="radio" name="bems" value={opt} checked={bemsInstalled === opt} onChange={() => setBemsInstalled(opt)} />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label>Smart Home Enabled?</label>
                      <div className={styles.radioRow}>
                        {['Yes', 'No', 'Partially'].map((opt) => (
                          <label key={opt} className={styles.radio}>
                            <input type="radio" name="smarthome" value={opt} checked={smartHomeEnabled === opt} onChange={() => setSmartHomeEnabled(opt)} />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>Smart Meter Installed?</label>
                      <div className={styles.radioRow}>
                        {['Yes', 'No', 'Unknown'].map((opt) => (
                          <label key={opt} className={styles.radio}>
                            <input type="radio" name="smartmeter" value={opt} checked={smartMeterInstalled === opt} onChange={() => setSmartMeterInstalled(opt)} />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label>Network Provider</label>
                      <div className={styles.select}>
                        <CustomSelect value={networkProvider} onChange={setNetworkProvider} options={['Enexis', 'Liander', 'Stedin']} />
                      </div>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>Energy Supplier</label>
                      <input className={styles.input} value={energySupplier} onChange={(e) => setEnergySupplier(e.target.value)} placeholder="Enter your energy supplier" />
                    </div>
                    <div className={styles.field}>
                      <label>Contract Type</label>
                      <div className={styles.select}>
                        <CustomSelect value={contractType} onChange={setContractType} options={['Fixed', 'Variable', 'Hybrid']} />
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'installation' && (
                <>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>Connection Object ID (EAN)</label>
                      <input className={styles.input} value={connectionObject} onChange={(e) => setConnectionObject(e.target.value)} placeholder="Enter EAN number" />
                    </div>
                    <div className={styles.field}>
                      <label>Connection Object Capacity</label>
                      <div className={styles.select}>
                        <CustomSelect value={connectionCapacity} onChange={setConnectionCapacity} options={['1x10 ampere', '3x25 ampere', '3x35 ampere']} />
                      </div>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>Average Monthly Electricity Consumption (kWh)</label>
                      <input className={styles.input} value={monthlyConsumption} onChange={(e) => setMonthlyConsumption(e.target.value)} placeholder="Enter consumption in kWh" />
                    </div>
                    <div className={styles.field}>
                      <label>Peak Electricity Usage Time</label>
                      <div className={styles.select}>
                        <CustomSelect value={peakUsageTime} onChange={setPeakUsageTime} options={['Morning', 'Afternoon', 'Evening', 'Night']} />
                      </div>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>Heating System</label>
                      <div className={styles.select}>
                        <CustomSelect value={heatingSystem} onChange={setHeatingSystem} options={['Electric Heat Pump', 'Gas Boiler', 'District Heating']} />
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label>Cooling System</label>
                      <div className={styles.select}>
                        <CustomSelect value={coolingSystem} onChange={setCoolingSystem} options={['Split AC', 'Central AC', 'None']} />
                      </div>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>Water Heating System</label>
                      <div className={styles.select}>
                        <CustomSelect value={waterHeatingSystem} onChange={setWaterHeatingSystem} options={['Solar Water Heater', 'Electric Boiler', 'Gas Boiler']} />
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label>EV Charging Schedule</label>
                      <div className={styles.select}>
                        <CustomSelect value={evChargingSchedule} onChange={setEvChargingSchedule} options={['Daytime', 'Night-time', 'Mixed', 'Not Applicable']} />
                      </div>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>Battery Backup Usage</label>
                      <div className={styles.select}>
                        <CustomSelect value={batteryUsage} onChange={setBatteryUsage} options={['Daily Load Balancing', 'Emergency Backup', 'Peak Shaving']} />
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label>Number of Solar Panels</label>
                      <input className={styles.input} value={solarPanelsCount} onChange={(e) => setSolarPanelsCount(e.target.value)} placeholder="Enter number of panels" />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>Battery Storage Installed?</label>
                      <div className={styles.radioRow}>
                        {['Yes', 'No', 'Planning to Install'].map((opt) => (
                          <label key={opt} className={styles.radio}>
                            <input type="radio" name="battery" value={opt} checked={batteryInstalled === opt} onChange={() => setBatteryInstalled(opt)} />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div className={styles.field}>
                      <label>Solar Panels Installed?</label>
                      <div className={styles.radioRow}>
                        {['Yes', 'No', 'Planning to Install'].map((opt) => (
                          <label key={opt} className={styles.radio}>
                            <input type="radio" name="solar" value={opt} checked={solarInstalled === opt} onChange={() => setSolarInstalled(opt)} />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label>Which Devices/Appliances do you have</label>
                      <input className={styles.input} value={appliances} onChange={(e) => setAppliances(e.target.value)} placeholder="Enter your devices/appliances" />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className={styles.saveBtn} onClick={onSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default BuildingInfoApp;