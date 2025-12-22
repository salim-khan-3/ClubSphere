import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router'; 
import { 
  HiOutlineCamera, 
  HiOutlineTrophy, 
  HiOutlineCodeBracket, 
  HiOutlineBookOpen, 
  HiOutlineMapPin, 
  HiOutlineMusicalNote 
} from "react-icons/hi2";

const PopularCategories = () => {
  const navigate = useNavigate();

  // Icons array with specific colors for a vibrant look
  const categories = [
    { 
      name: "Photography", 
      icon: <HiOutlineCamera className="text-blue-600" />, 
      count: "12 Clubs", 
      bg: "bg-blue-50",
      border: "hover:border-blue-200"
    },
    { 
      name: "Sports", 
      icon: <HiOutlineTrophy className="text-green-600" />, 
      count: "25 Clubs", 
      bg: "bg-green-50",
      border: "hover:border-green-200"
    },
    { 
      name: "Tech & Coding", 
      icon: <HiOutlineCodeBracket className="text-purple-600" />, 
      count: "18 Clubs", 
      bg: "bg-purple-50",
      border: "hover:border-purple-200"
    },
    { 
      name: "Books", 
      icon: <HiOutlineBookOpen className="text-yellow-600" />, 
      count: "10 Clubs", 
      bg: "bg-yellow-50",
      border: "hover:border-yellow-200"
    },
    { 
      name: "Hiking", 
      icon: <HiOutlineMapPin className="text-orange-600" />, 
      count: "15 Clubs", 
      bg: "bg-orange-50",
      border: "hover:border-orange-200"
    },
    { 
      name: "Music", 
      icon: <HiOutlineMusicalNote className="text-pink-600" />, 
      count: "20 Clubs", 
      bg: "bg-pink-50",
      border: "hover:border-pink-200"
    },
  ];

  return (
    <section className="py-24 bg-white px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl text-left">
            <motion.h2 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black text-gray-900 mb-4"
            >
              Explore Popular <span className="text-indigo-600">Categories</span>
            </motion.h2>
            <p className="text-gray-500 text-lg">
              Find the community that best fits your interests and start your journey with ClubSphere.
            </p>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/clubs')}
            className="px-8 py-3 bg-indigo-600 cursor-pointer text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
          >
            See All Categories
          </motion.button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.05)"
              }}
              onClick={() => navigate(`/clubs?category=${cat.name}`)}
              className={`${cat.bg} p-8 rounded-[2rem] cursor-pointer flex flex-col items-center text-center transition-all border-2 border-transparent ${cat.border} group`}
            >
              <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-300">
                {cat.icon}
              </div>
              <h3 className="font-bold text-gray-800 text-base mb-1 group-hover:text-indigo-600 transition-colors">
                {cat.name}
              </h3>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{cat.count}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;