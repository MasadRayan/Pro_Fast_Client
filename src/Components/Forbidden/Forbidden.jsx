import React from 'react';
import { Link } from 'react-router-dom'; // ✅ FIXED
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import forbiddenAnimation from '../../assets/Lottie/Animation - 1751728121485.json';

export default function Forbidden() {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="w-full max-w-md">
        <Lottie animationData={forbiddenAnimation} loop={true} />
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mt-6">403 - Forbidden</h1>
      <p className="text-gray-600 mt-2 text-center max-w-md">
        Sorry, you don't have permission to access this page.
      </p>
      <Link
        to={'/'}
        className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-2xl shadow-lg transition transform hover:scale-105"
      >
        Back to Home
      </Link>
    </motion.div>
  );
}
