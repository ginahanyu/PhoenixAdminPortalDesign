import { Route, Routes, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/AdminLayout';
import { UserPage } from './pages/UserPage';
import { RolePage } from './pages/RolePage';
import { AppManagementPage } from './pages/AppManagementPage';
import { ApplicationDetailPage } from './pages/ApplicationDetailPage';
import { ConfigPage } from './pages/ConfigPage';
import { SecuritySettingsProvider } from './components/SecuritySettingsContext';
import { DiagnosticSettingsProvider } from './components/DiagnosticSettingsContext';

export default function App() {
  return (
    <SecuritySettingsProvider>
      <DiagnosticSettingsProvider>
        <AdminLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/users" replace />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/roles" element={<RolePage />} />
            <Route path="/config" element={<ConfigPage />} />
            <Route path="/applications" element={<AppManagementPage />} />
            <Route path="/applications/:appKey" element={<ApplicationDetailPage />} />
          </Routes>
        </AdminLayout>
      </DiagnosticSettingsProvider>
    </SecuritySettingsProvider>
  );
}
