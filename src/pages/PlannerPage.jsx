import React, { useState } from 'react';
import styles from './PlannerPage.module.css';

const Sparkline = () => (
  <svg className={styles.spark} viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 28L14 18l12 10 12-14 12 10 12-16 12 16 12-12 12 8 12-6" stroke="#00A693" strokeWidth="2" strokeLinecap="round" fill="none"/>
  </svg>
);

const PlannerPage = () => {
  const [activeTab, setActiveTab] = useState('today');
  const devices = [
    { name: 'EV Charger', kw: '4.2 kW', time: '7am - 9am', img: '/evCharger.png' },
    { name: 'Heat Pump', kw: '4.2 kW', time: '7am - 9am', img: '/heatPump.png' },
    { name: 'Central AC', kw: '4.2 kW', time: '7am - 9am', img: '/ac.png' },
    { name: 'Electric Heater', kw: '4.2 kW', time: '7am - 9am', img: '/heater.png' },
    { name: 'Dishwasher', kw: '4.2 kW', time: '7am - 9am', img: '/dishwasher.png' },
    { name: 'Oven', kw: '4.2 kW', time: '7am - 9am', img: '/oven.png' },
  ];

  // Edit Plan modal state
  const [isEditOpen, setIsEditOpen] = useState(false);
  const times = ['6 am', '7 am', '8 am', '9 am', '10 am'];
  const [planRows, setPlanRows] = useState(() =>
    devices.map((d) => ({ name: d.name, kw: 4, start: '7 am', duration: 2, cost: '$3/10kwh' }))
  );
  const updateRow = (idx, changes) => {
    setPlanRows((prev) => prev.map((r, i) => (i === idx ? { ...r, ...changes } : r)));
  };
  const changeDuration = (idx, val) => {
    const next = Math.max(1, Math.min(12, val));
    updateRow(idx, { duration: next });
  };
  const handleSave = () => {
    // TODO: integrate with backend or parent state
    setIsEditOpen(false);
  };

  return (
    <section>
      <div className={styles.plannerRoot}>
        <div style={{borderBottom: '1px solid #E3E3E3', paddingBottom: '16px'}} className={styles.headerRow}>
          {/* <div> */}
          <h2 className={styles.title}>Auto Planner</h2>
          {/* </div> */}
          <button className={styles.dateBtn}>
            03 Oct 2025
            <svg className={styles.dateIcon} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M5 2v2M13 2v2M3 8h12M4 4h10a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1z" stroke="#9AA1A6" strokeWidth="1.4" strokeLinecap="round" fill="none"/></svg>
          </button>
        </div>

        <div className={styles.apxTabs}>
          <button className={`${styles.apxTab} ${activeTab==='today' ? styles.apxTabActive : ''}`} onClick={() => setActiveTab('today')}>Today’s Plan</button>
          <button className={`${styles.apxTab} ${activeTab==='tomorrow' ? styles.apxTabActive : ''}`} onClick={() => setActiveTab('tomorrow')}>Tomorrow Plan</button>
        </div>

        <div className={styles.metrics}>
          <div className={styles.metricCard}>
            <div className={styles.metricRow}>
              <div>
                <div className={styles.metricValue}>$500</div>
                <div className={styles.metricLabel}>Total Expected Saving</div>
              </div>
              <Sparkline />
            </div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricRow}>
              <div>
                <div className={styles.metricValue}>15 kW</div>
                <div className={styles.metricLabel}>Total Energy Consumption</div>
              </div>
              <Sparkline />
            </div>
          </div>
          <div className={styles.metricCard}>
            <div className={styles.metricRow}>
              <div>
                <div className={styles.metricValue}>1.5t</div>
                <div className={styles.metricLabel}>CO₂ savings</div>
              </div>
              <Sparkline />
            </div>
          </div>
        </div>

        <div className={styles.sectionTitle}>Active Devices</div>
        <div className={styles.devicesGrid}>
          {devices.map((d) => (
            <div key={d.name} className={styles.deviceCard}>
              <div className={styles.deviceHeader}>
                <div className={styles.deviceTitleRow}>
                  <img className={styles.apxDeviceIconImg} src={d.img} alt="" aria-hidden="true" />
                  <div className={styles.deviceName}>{d.name}</div>
                </div>
                <span className={styles.deviceKw}>{d.kw}</span>
              </div>
              <div className={styles.deviceMeta}>
                <svg className={styles.clockIcon} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="7" stroke="#9AA1A6" strokeWidth="1.4" fill="none"/><path d="M9 5v4l3 2" stroke="#9AA1A6" strokeWidth="1.4" strokeLinecap="round"/></svg>
                Active Time: {d.time}
              </div>
            </div>
          ))}
        </div>

        <div className={styles.actionBar}>
          <button className={styles.btnSecondary} onClick={() => setIsEditOpen(true)}>Edit Plan</button>
          <button className={styles.btnPrimary}>Apply Plan</button>
        </div>

        {isEditOpen && (
          <div className={styles.modalOverlay} onClick={(e) => { if (e.target === e.currentTarget) setIsEditOpen(false); }}>
            <div className={`${styles.modal} ${styles.apxModal}`} role="dialog" aria-modal="true" aria-labelledby="editPlanTitle">
              <div className={styles.modalHeader}>
                <div id="editPlanTitle" className={styles.modalTitle}>Edit Plan</div>
                <button className={styles.modalClose} aria-label="Close" onClick={() => setIsEditOpen(false)}>
                  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><path d="M4.5 4.5l9 9M13.5 4.5l-9 9" stroke="#9AA1A6" strokeWidth="1.6" strokeLinecap="round"/></svg>
                </button>
              </div>
              <div className={`${styles.modalBody} ${styles.apxModalBody}`}>
                <div className={`${styles.editHead} ${styles.apxEditHead}`}>
                  <div>Device Name</div>
                  <div>Kw</div>
                  <div>Stat Time</div>
                  <div>Duration</div>
                  <div className={styles.apxCellCost}>Estimated Cost</div>
                </div>
                {planRows.map((row, idx) => (
                  <div className={`${styles.editRow} ${styles.apxEditRow}`} key={row.name}>
                    <div className={styles.cellName}>{row.name}</div>
                    <div className={styles.cellKw}>{row.kw}</div>
                    <div className={`${styles.cellStart} ${styles.apxCellStart}`}>
                      <select
                        className={styles.timeSelect}
                        value={row.start}
                        onChange={(e) => updateRow(idx, { start: e.target.value })}
                      >
                        {times.map((t) => (<option key={t} value={t}>{t}</option>))}
                      </select>
                      <svg className={styles.timeIcon} viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><circle cx="9" cy="9" r="7" stroke="#9AA1A6" strokeWidth="1.4" fill="none"/><path d="M9 5v4l3 2" stroke="#9AA1A6" strokeWidth="1.4" strokeLinecap="round"/></svg>
                    </div>
                    <div className={`${styles.cellDuration} ${styles.apxCellDuration}`}>
                      <div className={styles.stepper}>
                        <button className={styles.stepperBtn} onClick={() => changeDuration(idx, row.duration - 1)} aria-label="Decrease duration">
                          <svg width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M5 10h10" stroke="#9AA1A6" strokeWidth="1.8" strokeLinecap="round"/></svg>
                        </button>
                        <input className={styles.stepperInput} value={row.duration} readOnly aria-label="Duration (hours)" />
                        <button className={styles.stepperBtn} onClick={() => changeDuration(idx, row.duration + 1)} aria-label="Increase duration">
                          <svg width="16" height="16" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 5v10M5 10h10" stroke="#9AA1A6" strokeWidth="1.8" strokeLinecap="round"/></svg>
                        </button>
                      </div>
                    </div>
                    <div className={`${styles.cellCost} ${styles.apxCellCost}`}>{row.cost}</div>
                  </div>
                ))}
              </div>
              <div className={styles.modalFooter}>
                <button className={styles.modalCancel} onClick={() => setIsEditOpen(false)}>Cancel</button>
                <button className={styles.modalSave} onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PlannerPage;