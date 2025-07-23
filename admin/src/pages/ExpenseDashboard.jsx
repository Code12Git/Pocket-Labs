import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {getExpenses,filterExpense} from '../redux /actions/expenseActions'
import Expenses from '../components/Expenses';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const ExpenseDashboard = () => {
  const dispatch = useDispatch();
  const { expenses, filter } = useSelector(state => state?.expense);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  useEffect(() => {
    dispatch(filterExpense(selectedCategory));
  }, [selectedCategory, dispatch]);

  const filterCategories = ['all', 'travel', 'food', 'accommodation', 'office supplies', 'other'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-50 p-6"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header and Filter Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold text-gray-800"
          >
            Expense Management
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            <label className="text-sm font-medium text-gray-700">Filter by Category:</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-48"
            >
              {filterCategories.map((category, index) => (
                <option key={index} value={category === 'all' ? '' : category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </motion.div>
        </div>

        {/* Expense List */}
        {expenses?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(filter?.length > 0 && selectedCategory !== '' ? filter : expenses).map((expense) => (
              <Expenses key={expense._id} expense={expense} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <p className="text-gray-500 text-lg mb-4">No expenses found.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ExpenseDashboard;