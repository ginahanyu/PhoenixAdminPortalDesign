import { Route, Routes, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/AdminLayout';
import { UserPage } from './pages/UserPage';
import { RolePage } from './pages/RolePage';
import { AppManagementPage } from './pages/AppManagementPage';
import { ApplicationDetailPage } from './pages/ApplicationDetailPage';
import { ApplicationGlobalConfigPage } from './pages/ApplicationGlobalConfigPage';

export default function App() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="/users" element={<UserPage />} />
        <Route path="/roles" element={<RolePage />} />
        <Route path="/applications" element={<AppManagementPage />} />
        <Route path="/applications/global-config" element={<ApplicationGlobalConfigPage />} />
        <Route path="/applications/:appKey" element={<ApplicationDetailPage />} />
      </Routes>
    </AdminLayout>
  );
}
