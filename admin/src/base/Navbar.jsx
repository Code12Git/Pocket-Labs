import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux /actions/authActions';

const Navbar = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/admin');
  };

  const handleLoginRedirect = () => {
    if (!isAuthenticated) {
      navigate('/admin');
    } else {
      handleLogout();
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md px-6 py-4 flex justify-between items-center"
    >
      <div className="text-xl font-bold text-blue-600">ExpenseDashboard</div>

      <div className="flex items-center gap-6">
        {isAuthenticated && (
          <>
            <Link
              to="/"
              className={`text-sm font-medium ${
                location.pathname === '/' ? 'text-blue-600' : 'text-gray-700'
              } hover:text-blue-500`}
            >
              Dashboard
            </Link>
            <Link
              to="/expense"
              className={`text-sm font-medium ${
                location.pathname === '/expense' ? 'text-blue-600' : 'text-gray-700'
              } hover:text-blue-500`}
            >
              Expense
            </Link>
            <Link
              to="/logs"
              className={`text-sm font-medium ${
                location.pathname === '/logs' ? 'text-blue-600' : 'text-gray-700'
              } hover:text-blue-500`}
            >
              Logs
            </Link>
          </>
        )}

        <button
          onClick={handleLoginRedirect}
          className="bg-blue-600 cursor-pointer hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition"
        >
          {isAuthenticated ? 'Logout' : 'Admin Login'}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;