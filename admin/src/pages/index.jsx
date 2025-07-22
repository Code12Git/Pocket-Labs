import { Routes, Route, Navigate } from 'react-router-dom';
import ExpenseDashboard from './ExpenseDashboard';

export default function App() {
  return (
    <Routes>
        <Route path='/' element={<ExpenseDashboard />}/>
    </Routes>
  );
}
