import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardTopbar from '../components/DashboardTopbar';
import DashboardSidebar from '../components/DashboardSidebar';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className={`dl-shell ${drawerOpen ? 'dl-drawer-open' : ''}`}>
      <DashboardTopbar transparent onMenuClick={() => setDrawerOpen(true)} />
      {/* Mobile Drawer */}
      <div className="dl-drawer-overlay" onClick={() => setDrawerOpen(false)} />
      <aside className="dl-drawer-panel" aria-hidden={!drawerOpen}>
        <DashboardSidebar />
      </aside>
      <div className="dl-body">
        <DashboardSidebar />
        <main className="dl-main">
          <div className="dl-panel">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;