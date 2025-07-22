import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Expense from './Expense';



export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route path="/expense" element={ <Expense />}/>

      {/* Catch-all Route */}
      {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
    </Routes>
  );
}
