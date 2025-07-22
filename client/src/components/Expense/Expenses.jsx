import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses } from '../../redux/actions/expenseActions';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

const Expenses = () => {
    const dispatch = useDispatch();
    const { expenses, loading } = useSelector(state => state.expense);

    useEffect(() => {
        dispatch(getExpenses());
    }, [dispatch]);

    const statusVariants = {
        pending: { backgroundColor: '#FEF3C7', color: '#92400E' },
        approved: { backgroundColor: '#D1FAE5', color: '#065F46' },
        rejected: { backgroundColor: '#FEE2E2', color: '#991B1B' }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.4, ease: "easeOut" }
        },
        hover: { 
            y: -5,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
        }
    };

    if (loading) {
        return (
            <motion.div 
                className="flex justify-center items-center h-64"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"
                />
            </motion.div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.h1 
                className="text-2xl font-bold text-gray-800 mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                Expense Records
            </motion.h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
                <AnimatePresence>
                    {expenses?.map((expense) => (
                        <motion.div
                            key={expense._id}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover="hover"
                            exit={{ opacity: 0 }}
                            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                        >
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-4">
                                    <motion.h3 
                                        className="text-xl font-bold text-gray-800"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        ${expense.amount.toFixed(2)}
                                    </motion.h3>
                                    <motion.span
                                        className="px-3 py-1 rounded-full text-xs font-medium"
                                        style={statusVariants[expense.status]}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {expense.status}
                                    </motion.span>
                                </div>

                                <motion.div 
                                    className="space-y-3 text-sm text-gray-600"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="flex items-center">
                                        <motion.svg 
                                            className="w-4 h-4 mr-2 text-gray-400"
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </motion.svg>
                                        <span className="capitalize">{expense.category}</span>
                                    </div>

                                    <div className="flex items-center">
                                        <motion.svg 
                                            className="w-4 h-4 mr-2 text-gray-400"
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                            whileHover={{ scale: 1.2 }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </motion.svg>
                                        <span>{format(new Date(expense.date), 'MMM dd, yyyy')}</span>
                                    </div>

                                    {expense.notes && (
                                        <motion.div 
                                            className="flex items-start pt-3 mt-3 border-t border-gray-100"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <motion.svg 
                                                className="w-4 h-4 mr-2 text-gray-400 mt-0.5"
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                                whileHover={{ scale: 1.2 }}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                            </motion.svg>
                                            <p className="text-gray-600">{expense.notes}</p>
                                        </motion.div>
                                    )}
                                </motion.div>
                            </div>

                            <motion.div 
                                className="bg-gray-50 px-5 py-3 text-xs text-gray-500"
                                whileHover={{ backgroundColor: '#f3f4f6' }}
                            >
                                Created: {format(new Date(expense.createdAt), 'MMM dd, yyyy - h:mm a')}
                            </motion.div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {expenses?.length === 0 && (
                <motion.div 
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <motion.svg 
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: 1, duration: 0.5 }}
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </motion.svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No expenses found</h3>
                    <p className="mt-1 text-gray-500">Get started by creating a new expense record.</p>
                </motion.div>
            )}
        </div>
    );
};

export default Expenses;