import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/actions/authActions';

const Navbar = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 10,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav
      className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div variants={itemVariants}>
               <span className="text-white text-xl font-bold">ExpenseTracker</span>
           </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <motion.div 
              className="ml-10 flex items-center space-x-4"
              variants={containerVariants}
            >
              {isAuthenticated && (
                <>
                  <motion.div variants={itemVariants}>
                    <Link
                      to="/expense"
                      className="text-gray-100 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                    >
                      Expenses
                    </Link>
                  </motion.div>
                 
                </>
              )}
            </motion.div>
          </div>

          {/* Auth Buttons */}
          <motion.div variants={itemVariants}>
            {isAuthenticated ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="bg-white cursor-pointer text-indigo-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-all duration-300"
              >
                Logout
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/login')}
                className="bg-white cursor-pointer text-indigo-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 transition-all duration-300"
              >
                Login
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>

       <motion.div 
        className="md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
       </motion.div>
    </motion.nav>
  );
};

export default Navbar;