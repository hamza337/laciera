import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './DashboardTopbar.module.css';

const DashboardTopbar = ({ transparent = false, onMenuClick }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tab = params.get('tab');
  const match = location.pathname.match(/^\/app\/(\w+)/);
  const pathSection = match?.[1];
  const pageMap = {
    planner: 'Auto Planner',
    devices: 'Devices',
    building: 'Building Information',
    reports: 'Reports',
    settings: 'Settings',
    dashboard: 'Dashboard',
  };
  const pageLabel = pageMap[(pathSection || tab || 'dashboard')] || 'Dashboard';

  const headerClass = `${styles.ldTopbar} ${transparent ? styles.ldTopbarTransparent : ''}`;

  return (
    <header className={headerClass}>
      <div className={styles.ldTopLeft}>
        <button className={styles.ldMenuBtn} aria-label="Open navigation" onClick={onMenuClick}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7h16M4 12h16M4 17h16" stroke="#0E0E0D" strokeWidth="2" strokeLinecap="round"/></svg>
        </button>
        <div className={styles.ldBrandRow}>
          <img src="/logo.png" alt="Laciera" className={styles.ldTopLogo} />
          <span className={styles.ldBrandName}>LACIERA</span>
        </div>
      </div>
      <div className={styles.ldBreadcrumbAbs}>{pageLabel}</div>
      <div className={styles.ldRight}>
        <button className={styles.ldIconBtn} aria-label="Notifications">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 1.8a3.5 3.5 0 0 0-3.5 3.5v2.6c0 .7-.3 1.4-.9 1.8l-1.4 1v1h12v-1l-1.4-1c-.6-.4-.9-1.1-.9-1.8V5.3A3.5 3.5 0 0 0 9 1.8z" stroke="#9AA1A6" strokeWidth="1.4" strokeLinecap="round"/>
            <path d="M6.8 14.8a2.2 2.2 0 0 0 4.4 0" stroke="#9AA1A6" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </button>
        <button className={styles.ldLangBtn} aria-label="Language">
          <img className={styles.ldFlag} src="/english.png" alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <span className={styles.ldLangText}>EN</span>
          <svg className={styles.ldCaret} viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4 4 4-4" stroke="#9AA1A6" strokeWidth="1.4" strokeLinecap="round" fill="none"/></svg>
        </button>
        <div className={styles.ldUser}>
          <img className={styles.ldAvatar} src="/john.jpeg" alt="" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
          <span className={styles.ldUserName}>John Seo</span>
          <svg className={styles.ldCaret} viewBox="0 0 10 6" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l4 4 4-4" stroke="#9AA1A6" strokeWidth="1.4" strokeLinecap="round" fill="none"/></svg>
        </div>
      </div>
    </header>
  );
};

export default DashboardTopbar;