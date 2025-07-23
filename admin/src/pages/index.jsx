import { Routes, Route } from 'react-router-dom';
import ExpenseDashboard from './ExpenseDashboard';
import Dashboard from './Dashboard'
import Logs from './Logs';
import AdminLogin from './AdminLogin';
import PrivateAuth from '../hooks/PrivateAuth';
import PublicRoute from '../hooks/PublicRoute';
import NotFound from './NotFound';
import Navbar from '../base/Navbar';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Private routes */}
        <Route element={<PrivateAuth />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/expense" element={<ExpenseDashboard />} />
          <Route path="/logs" element={<Logs />} />
        </Route>

        {/* Public route */}
        <Route
          path="/admin"
          element={
            <PublicRoute>
              <AdminLogin />
            </PublicRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}