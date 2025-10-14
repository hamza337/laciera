import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './DashboardSidebar.module.css';

const IconDashboard = () => (
  <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2.5" y="2.5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
    <rect x="11.5" y="2.5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
    <rect x="2.5" y="11.5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
    <rect x="11.5" y="11.5" width="6" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const IconPlanner = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="12" cy="6" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1.6" />
    <path d="M6 6v8c0 1.9 2.7 3.1 6 3.1s6-1.2 6-3.1V6" stroke="currentColor" strokeWidth="1.6" />
    <ellipse cx="12" cy="14" rx="6" ry="2.5" stroke="currentColor" strokeWidth="1.6" />
    <g transform="translate(14.5 12.5)">
      <circle cx="3.5" cy="3.5" r="2.1" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.2 6.2l1.6 1.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  </svg>
);

const IconDevices = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
    <rect x="3" y="5" width="18" height="3.8" rx="2.5" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="6" cy="7" r="0.8" fill="currentColor" />
    <circle cx="8" cy="7" r="0.8" fill="currentColor" />
    <circle cx="10" cy="7" r="0.8" fill="currentColor" />
    <path d="M12.5 11l-2.2 3.5h2.1l-1.2 3 4-4.8h-2.3l1.3-1.7z" fill="currentColor" />
  </svg>
);

const IconBuilding = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="4" width="10" height="16" rx="1.8" stroke="currentColor" strokeWidth="1.6" />
    <rect x="16" y="10" width="3" height="10" rx="1" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="8" cy="7" r="0.9" fill="currentColor" />
    <circle cx="12" cy="7" r="0.9" fill="currentColor" />
    <circle cx="8" cy="10" r="0.9" fill="currentColor" />
    <circle cx="12" cy="10" r="0.9" fill="currentColor" />
  </svg>
);

const IconReports = () => (
  <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 15v-3.2M8 15V9.5M12 15V7.8M16 15V5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M3.2 15.8h13.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

const IconSettings = () => (
  <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="2.8" stroke="currentColor" strokeWidth="1.6" />
    <path d="M16.8 10a6.8 6.8 0 0 0-.1-1.2l2-1.5-1.7-3-2.4.7a7.1 7.1 0 0 0-2-1.2L12.5 1H7.5L7 4a7.1 7.1 0 0 0-2 1.2l-2.4-.7-1.7 3 2 1.5a6.8 6.8 0 0 0 0 2.4l-2 1.5 1.7 3 2.4-.7c.6.5 1.3.9 2 1.2l.5 3h5l.5-3c.7-.3 1.4-.7 2-1.2l2.4.7 1.7-3-2-1.5c.1-.4.1-.8.1-1.2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NavItem = ({ label, active, icon, onClick }) => (
  <li
    className={`${styles.ldNavItem} ${active ? styles.ldNavItemActive : ''}`}
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    <span className={styles.ldIcon} aria-hidden="true">{icon}</span>
    <span className={styles.ldLabel}>{label}</span>
  </li>
);

const DashboardSidebar = () => {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('dashboard');

  const items = [
    { key: 'dashboard', label: 'Dashboard', icon: <IconDashboard /> },
    { key: 'planner', label: 'Auto Planner', icon: <IconPlanner /> },
    { key: 'devices', label: 'Devices', icon: <IconDevices /> },
    { key: 'building', label: 'Building Information', icon: <IconBuilding /> },
    { key: 'reports', label: 'Reports', icon: <IconReports /> },
    { key: 'settings', label: 'Settings', icon: <IconSettings /> },
  ];

  const routeMap = {
    dashboard: '/app/dashboard',
    planner: '/app/planner',
    devices: '/app/devices',
    building: '/app/building',
    reports: '/app/reports',
    settings: '/app/settings',
  };

  const handleClick = (key) => {
    setActiveKey(key);
    const to = routeMap[key] || '/dashboard-isolated';
    navigate(to);
  };

  return (
    <aside className={styles.ldSidebar}>
      <div className={styles.ldBrand}>
        <div className={styles.ldLogoRow}>
          <img src="/logo.png" alt="Laciera" className={styles.ldLogo} />
          <span className={styles.ldBrandName}>LACIERA</span>
        </div>
        <span className={styles.ldSectionCaption}>Dashboard</span>
      </div>

      <nav className={styles.ldNav} aria-label="Main">
        <ul>
          {items.map((item) => (
            <NavItem
              key={item.key}
              label={item.label}
              icon={item.icon}
              active={activeKey === item.key}
              onClick={() => handleClick(item.key)}
            />
          ))}
        </ul>
      </nav>

      <div className={styles.ldHelpCard}>
        <div className={styles.ldHelpIcon}>
          <svg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <ellipse cx="32" cy="28" rx="18" ry="14" fill="#009382" />
            <path d="M30 40 L26 48 L38 40 Z" fill="#009382" />
            <rect x="24" y="23" width="18" height="3.2" rx="1.6" fill="#ffffff" />
            <rect x="24" y="28.5" width="18" height="3.2" rx="1.6" fill="#ffffff" />
            <rect x="24" y="34" width="12" height="3.2" rx="1.6" fill="#ffffff" />
          </svg>
        </div>
        <div className={styles.ldHelpText}>Need a Help?</div>
        <button className={styles.ldHelpButton}>Ask Question</button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;