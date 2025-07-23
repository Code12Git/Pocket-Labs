'use client'
import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center bg-white p-10 rounded-2xl shadow-2xl max-w-md w-full"
      >
        <h1 className="text-7xl font-extrabold text-blue-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/expense"
          className="inline-block px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 transition rounded-xl shadow-md"
        >
          Go to Dashboard
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound
