import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router"; // 1. useNavigate import korun

const FeaturedClubs = () => {
  const navigate = useNavigate(); // 2. navigate function initialize korun

  // TanStack Query: Backend theke data fetch kora
  const {
    data: clubs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["featuredClubs"],
    queryFn: async () => {
      const response = await axios.get("https://club-sphere-server-six.vercel.app/clubs/all");

      const processedData = response.data
        .filter((club) => club.status === "approved")
        .sort((a, b) => {
          const memberDiff = (b.memberCount || 0) - (a.memberCount || 0);
          if (memberDiff !== 0) return memberDiff;
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
        .slice(0, 6);

      return processedData;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-20 text-red-500 font-medium">
        Failed to load featured clubs. Please check your connection.
      </div>
    );

  return (
    <section className="py-24 bg-[#F8FAFC] px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-gray-900 mb-4"
          >
            Featured Clubs
          </motion.h2>
          <p className="text-gray-500 text-lg">
            Join the most active and trending communities today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {clubs.map((club, index) => (
            <motion.div
              key={club._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white rounded-3xl shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-12px_rgba(79,70,229,0.2)] transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
            >
              <div className="relative overflow-hidden group">
                <img
                  src={club.bannerImage}
                  alt={club.clubName}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-white/90 backdrop-blur-md text-indigo-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-sm">
                    {club.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-2 mb-4 text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-xs font-medium uppercase tracking-tighter">
                    {club.location}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-1">
                  {club.clubName}
                </h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                  {club.description}
                </p>

                <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">
                      Membership Fee
                    </p>
                    <span className="text-xl font-black text-indigo-600">
                      {club.membershipFee > 0
                        ? `$${club.membershipFee}`
                        : "FREE"}
                    </span>
                  </div>
                  {/* 3. onClick handler add kora hoyeche dynamic ID soho */}
                  <button
                    onClick={() => navigate(`/club_details/${club._id}`)} // Route file-er sathe mil rekhe update kora hoyeche
                    className="bg-gray-900 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-600 transition-colors shadow-lg shadow-gray-200"
                  >
                    Join Sphere
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedClubs;

// import React from 'react';
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';
// import { motion } from 'framer-motion';

// const FeaturedClubs = () => {
//   // TanStack Query: Backend theke data fetch kora
//   const { data: clubs = [], isLoading, isError } = useQuery({
//     queryKey: ['featuredClubs'],
//     queryFn: async () => {
//       const response = await axios.get('http://localhost:3000/clubs/all');

//       // Sorting & Filtering Logic
//       return response.data
//         .filter(club => club.status === 'approved') // Sudhu approved gulo
//         .sort((a, b) => {
//           // 1st Priority: Beshi member (memberCount)
//           const memberDiff = (b.memberCount || 0) - (a.memberCount || 0);
//           if (memberDiff !== 0) return memberDiff;

//           // 2nd Priority: Recently Approved (createdAt)
//           return new Date(b.createdAt) - new Date(a.createdAt);
//         })
//         .slice(0, 6); // Top 6 ta nibe
//     }
//   });

//   if (isLoading) return <div className="text-center py-20 font-bold text-xl">Loading Featured Clubs...</div>;
//   if (isError) return <div className="text-center py-20 text-red-500">Failed to load data!</div>;

//   return (
//     <section className="py-20 bg-gray-50 px-4 md:px-0">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-12">
//           Featured Clubs
//         </h2>

//         {/* Grid layout for 6 cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {clubs.map((club, index) => (
//             <motion.div
//               key={club._id}
//               // Framer Motion Animation
//               initial={{ opacity: 0, scale: 0.9, y: 30 }}
//               whileInView={{ opacity: 1, scale: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col"
//             >
//               {/* Club Banner */}
//               <img
//                 src={club.bannerImage}
//                 alt={club.clubName}
//                 className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
//               />

//               <div className="p-6 flex-grow">
//                 {/* Category and Location Row (Original Design) */}
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
//                     {club.category}
//                   </span>
//                   <span className="text-sm font-semibold text-gray-500">
//                     {club.location}
//                   </span>
//                 </div>

//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">{club.clubName}</h3>
//                 <p className="text-gray-600 text-sm mb-4 line-clamp-2 italic">
//                   "{club.description}"
//                 </p>

//                 <div className="mt-auto pt-4 border-t flex justify-between items-center">
//                   <span className="text-lg font-bold text-indigo-600">
//                     {club.membershipFee > 0 ? `$${club.membershipFee}` : 'Free'}
//                   </span>
//                   <button className="bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-indigo-700 transition">
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default FeaturedClubs;
