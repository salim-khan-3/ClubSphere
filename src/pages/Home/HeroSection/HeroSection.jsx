import React from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router'; // 1. useNavigate import kora hoyeche

const HeroSection = () => {
  const navigate = useNavigate(); // 2. navigate initialize kora hoyeche

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    },
  };

  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0f172a] text-white font-sans">
      
      {/* Background Decorative Blurred Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-700 rounded-full mix-blend-screen filter blur-[120px] opacity-30"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-700 rounded-full mix-blend-screen filter blur-[120px] opacity-30"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-8 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Tagline */}
          <motion.span variants={itemVariants} className="inline-block py-1.5 px-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 text-sm font-semibold tracking-wider mb-6 uppercase">
            🚀 Your Local Community Hub
          </motion.span>

          {/* Main Headline */}
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Discover Your Passion. <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">
              Connect Your Sphere.
            </span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            ClubSphere is the ultimate platform to explore vibrant local clubs, manage memberships, and register for unforgettable events. Start your journey today!
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-5 w-full justify-center">
            
            {/* Primary Button - Join (Updated with onClick) */}
            <motion.button
              onClick={() => navigate('/clubs')} // 3. Redirect to /clubs
              whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 cursor-pointer rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg flex items-center justify-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">Join a Club</span>
              <FaArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform"/>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-white/10"></div>
            </motion.button>

            {/* Secondary Button - Create */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full border-2 border-gray-500 text-gray-200 font-bold text-lg flex items-center justify-center gap-3 transition-colors hover:border-blue-400 hover:text-blue-400"
            >
               <FaPlus className="text-sm"/>
              Create a Club
            </motion.button>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;