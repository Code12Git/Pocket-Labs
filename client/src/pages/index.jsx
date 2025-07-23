import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Expense from './Expense';
import PublicRoute from '../hooks/PublicRoute';
import PrivateAuth from '../hooks/PrivateAuth'
import NotFound from './NotFound';



export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={ <PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      {/* Protected Routes */}
      <Route element={<PrivateAuth />}>
      <Route path="/expense" element={ <Expense />}/>
      </Route>
      {/* Catch-all Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
