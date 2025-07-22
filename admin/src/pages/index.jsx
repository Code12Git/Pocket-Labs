import { Routes, Route, Navigate } from 'react-router-dom';
import ExpenseDashboard from './ExpenseDashboard';
import Dashboard from './Dashboard';

export default function App() {
  return (
    <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/expense' element={<ExpenseDashboard />} />
    </Routes>
  );
}
