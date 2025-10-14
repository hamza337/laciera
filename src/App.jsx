import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LanguagePage from './pages/LanguagePage';
import ProsumerInfoPage from './pages/ProsumerInfoPage';
import BuildingInfoPage from './pages/BuildingInfoPage';
import BuildingInfoApp from './pages/BuildingInfoApp';
import PreferencesPage from './pages/PreferencesPage';
import IsolatedDashboard from './pages/IsolatedDashboard';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/DashboardHome';
import PlannerPage from './pages/PlannerPage';
import DevicesPage from './pages/DevicesPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LanguagePage />} />
        <Route path="/prosumer" element={<ProsumerInfoPage />} />
        <Route path="/building-info" element={<BuildingInfoPage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
        {/* <Route path="/dashboard-isolated" element={<IsolatedDashboard />} /> */}

        {/* New App layout with persistent header + sidebar */}
        <Route path="/app" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="dashboard" element={<DashboardHome />} />
          <Route path="planner" element={<PlannerPage />} />
          <Route path="devices" element={<DevicesPage />} />
          <Route path="building" element={<BuildingInfoApp />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;