import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router";
import Loader from "../../Components/Loader/Loader";
import { FiSearch, FiMapPin, FiTag, FiFilter } from "react-icons/fi"; // Icons load korar jonno

const axiosInstance = axios.create({
  baseURL: "https://club-sphere-server-six.vercel.app/",
});

const Clubs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [sort, setSort] = useState("newest");

  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs", search, category, location, sort],
    queryFn: async () => {
      const params = { search, category, location, sort };
      const res = await axiosInstance.get("clubs/search", { params });
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        {/* ================= Header Section ================= */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">
            Explore Elite Clubs
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Join the most vibrant communities and grow your skills with people
            who share your passion.
          </p>
        </div>

        {/* ================= Search & Filter Bar ================= */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <div className="relative group">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search club name..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all text-gray-700"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="relative">
              <FiTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 appearance-none focus:border-blue-500 outline-none transition-all cursor-pointer text-gray-700"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Sports">Sports</option>
                <option value="Music">Music</option>
                <option value="Technology">Technology</option>
                <option value="Education">Education</option>
                <option value="Cultural">Cultural</option>
              </select>
            </div>

            <div className="relative">
              <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 appearance-none focus:border-blue-500 outline-none transition-all cursor-pointer text-gray-700"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <option value="All">All Locations</option>
                <option value="Dhaka">Dhaka</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Rajshahi">Rajshahi</option>
                <option value="Sylhet">Sylhet</option>
              </select>
            </div>

            <div className="relative">
              <FiFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 appearance-none focus:border-blue-500 outline-none transition-all cursor-pointer text-gray-700"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="low-fee">Fee: Low to High</option>
                <option value="high-fee">Fee: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* ================= Clubs Grid ================= */}
        {clubs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-500 font-medium">
              No clubs match your criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {clubs.map((club) => (
              <div
                key={club._id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    src={
                      club.bannerImage &&
                      (club.bannerImage.startsWith("http://") ||
                        club.bannerImage.startsWith("https://"))
                        ? club.bannerImage
                        : "https://via.placeholder.com/400x250?text=No+Image"
                    }
                    alt={club.clubName}
                  />

                  {/* {console.log(club.bannerImage)} */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-blue-600 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    {club.category}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                    {club.clubName}
                  </h2>

                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-gray-500 text-sm">
                      <FiMapPin className="mr-2 text-blue-400" />
                      {club.location}
                    </div>
                    <div className="flex items-center text-gray-700 font-semibold">
                      <span className="text-blue-500 mr-1">$</span>
                      {club.membershipFee || 0}{" "}
                      <span className="text-xs text-gray-400 ml-1 font-normal">
                        / Membership Fee
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                      Est. {new Date(club.createdAt).getFullYear()}
                    </span>
                    <Link
                      to={`/club_details/${club._id}`}
                      className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Clubs;

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import React, { useState } from "react";
// import { Link } from "react-router";
// import Loader from "../../Components/Loader/Loader";

// const axiosInstance = axios.create({
//   baseURL: "https://club-sphere-server-six.vercel.app/",
// });

// const Clubs = () => {
//   // 🔹 UI States
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [location, setLocation] = useState("All");
//   const [sort, setSort] = useState("newest");

//   // 🔹 Fetch clubs with search/filter/sort
//   const { data: clubs = [], isLoading } = useQuery({
//     queryKey: ["clubs", search, category, location, sort],
//     queryFn: async () => {
//       const params = {
//         search,
//         category,
//         location,
//         sort,
//       };

//       const res = await axiosInstance.get("clubs/search", { params });
//       return res.data;
//     },
//   });

//   if (isLoading) return <Loader />;

//   return (
//     <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
//       {/* ================= Search + Filter + Sort ================= */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         {/* 🔍 Search */}
//         <input
//           type="text"
//           placeholder="Search club name..."
//           className="border p-2 rounded"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />

//         {/* 🧰 Category Filter */}
//         <select
//           className="border p-2 rounded"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//         >
//           <option value="All">All Categories</option>
//           <option value="Sports">Sports</option>
//           <option value="Music">Music</option>
//           <option value="Technology">Technology</option>
//           <option value="Education">Education</option>
//           <option value="Cultural">Cultural</option>
//         </select>

//         {/* 📍 Location Filter */}
//         <select
//           className="border p-2 rounded"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//         >
//           <option value="All">All Locations</option>
//           <option value="Dhaka">Dhaka</option>
//           <option value="Chittagong">Chittagong</option>
//           <option value="Rajshahi">Rajshahi</option>
//           <option value="Sylhet">Sylhet</option>
//         </select>

//         {/* 🔃 Sort */}
//         <select
//           className="border p-2 rounded"
//           value={sort}
//           onChange={(e) => setSort(e.target.value)}
//         >
//           <option value="newest">Newest</option>
//           <option value="oldest">Oldest</option>
//           <option value="low-fee">Low Fee → High</option>
//           <option value="high-fee">High Fee → Low</option>
//         </select>
//       </div>

//       {/* ================= Clubs Grid ================= */}
//       {clubs.length === 0 ? (
//         <p className="text-center text-gray-500">No clubs found</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {clubs.map((club) => (
//             <div
//               key={club._id}
//               className="bg-white flex flex-col gap-4 shadow-md rounded-lg p-5 hover:shadow-xl transition"
//             >
//               <img
//                 className="h-[150px] w-full object-cover rounded"
//                 src={club.bannerImage}
//                 alt="club banner"
//               />

//               <div className="flex flex-col gap-1">
//                 <h2 className="text-lg font-bold">
//                   {club.clubName}
//                 </h2>
//                 <p className="text-sm">Category: {club.category}</p>
//                 <p className="text-sm">Location: {club.location}</p>
//                 <p className="text-sm">
//                   Fee: ${club.membershipFee || 0}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   Created:{" "}
//                   {new Date(club.createdAt).toLocaleDateString("en-BD")}
//                 </p>
//               </div>

//               <Link
//                 to={`/club_details/${club._id}`}
//                 className="mt-auto text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//               >
//                 View Club
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Clubs;

// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";
// import React from "react";
// import { Link } from "react-router";
// import Loader from "../../Components/Loader/Loader"

// const axiosInstance = axios.create({
//   baseURL: "https://club-sphere-server-six.vercel.app/",
// });

// const Clubs = () => {
//   const queryClient = useQueryClient();
//   // FETCH clubs (all)
//   const { data: clubs = [], isLoading  } = useQuery({
//     queryKey: ["clubs"],
//     queryFn: async () => {
//       // const res = await axiosInstance.get("/clubs/all");
//       const res = await axiosInstance.get("clubs/all");
//       return res.data;
//     },
//   });
//   console.log(clubs);
//   if(isLoading ) {
//     return <Loader></Loader>
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {clubs
//         .filter((club) => club.status === "approved") // sudhu approved clubs
//         .map((club) => (
//           <div
//             key={club._id}
//             className="bg-white flex flex-col gap-5 shadow-md rounded-lg p-5 hover:shadow-xl transition duration-300"
//           >
//             <div>
//               <img className="h-[150px] w-full" src={club.bannerImage} alt="" />
//             </div>

//             <div className="flex flex-col gap-2">
//               <h2 className="text-xl font-bold mb-2">
//                 Club Name:{club.clubName}
//               </h2>
//               <p>Club Category: {club.category}</p>
//               <p>
//                 Created At:{" "}
//                 {new Date(club.createdAt).toLocaleString("en-BD", {
//                   timeZone: "Asia/Dhaka",
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                   hour: "2-digit",
//                   minute: "2-digit",
//                   second: "2-digit",
//                 })}
//               </p>

//               <p>Location:{club.location}</p>
//             </div>

//             {/* <p className="text-gray-600 mb-4 break-words">{club.description}</p> */}
//             <Link to={`/club_details/${club._id}`} className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//               View Club
//             </Link>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default Clubs;

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import React, { useState } from "react";
// import { Link } from "react-router";
// import Loader from "../../Components/Loader/Loader";

// const axiosInstance = axios.create({
//   baseURL: "https://club-sphere-server-six.vercel.app/",
// });

// const Clubs = () => {
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("All");
//   const [sort, setSort] = useState("newest");

//   // Fetching data with search, category, and sort params
//   const { data: clubs = [], isLoading } = useQuery({
//     queryKey: ["clubs", search, category, sort],
//     queryFn: async () => {
//       const res = await axiosInstance.get(`search-filter-sort`, {
//         params: { search, category, sort },
//       });
//       return res.data;
//     },
//   });

//   const categories = ["All", "Photography", "Sports", "Tech", "Music", "Art"]; // আপনার প্রোজেক্ট অনুযায়ী নাম দিন

//   if (isLoading) return <Loader />;

//   return (
//     <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
//       {/* Search and Filter Section */}
//       <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100">

//         {/* Search Input */}
//         <div className="w-full md:w-1/3">
//           <input
//             type="text"
//             placeholder="Search by club name..."
//             className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>

//         {/* Category Filter */}
//         <div className="w-full md:w-1/4">
//           <select
//             className="select select-bordered w-full rounded-xl"
//             onChange={(e) => setCategory(e.target.value)}
//           >
//             <option disabled selected>Filter by Category</option>
//             {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
//           </select>
//         </div>

//         {/* Sort Options */}
//         <div className="w-full md:w-1/4">
//           <select
//             className="select select-bordered w-full rounded-xl"
//             onChange={(e) => setSort(e.target.value)}
//           >
//             <option value="newest">Newest First</option>
//             <option value="oldest">Oldest First</option>
//             <option value="low-fee">Lowest Fee</option>
//             <option value="high-fee">Highest Fee</option>
//           </select>
//         </div>
//       </div>

//       {/* Clubs Grid */}
//       {clubs.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {clubs.map((club) => (
//             <div
//               key={club._id}
//               className="bg-white flex flex-col gap-5 shadow-md rounded-lg p-5 hover:shadow-xl transition duration-300 border border-gray-100"
//             >
//               <div className="overflow-hidden rounded-md">
//                 <img className="h-[150px] w-full object-cover hover:scale-105 transition duration-500" src={club.bannerImage} alt={club.clubName} />
//               </div>

//               <div className="flex flex-col gap-2 flex-grow">
//                 <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
//                   {club.clubName}
//                 </h2>
//                 <p className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block w-fit">
//                    {club.category}
//                 </p>
//                 <p className="text-sm text-gray-500">Location: {club.location}</p>
//                 <p className="text-sm text-gray-400">Fee: ${club.membershipFee}</p>
//               </div>

//               <Link to={`/club_details/${club._id}`} className="w-full bg-blue-500 text-white text-center py-2 rounded-lg hover:bg-blue-600 font-bold transition">
//                 View Club
//               </Link>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-20 text-gray-500 text-xl font-medium">
//           No clubs found with these criteria.
//         </div>
//       )}
//     </div>
//   );
// };

// export default Clubs;

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import React, { useState } from "react";
// import { Link } from "react-router";
// import Loader from "../../Components/Loader/Loader";

// const axiosInstance = axios.create({
//   baseURL: "https://club-sphere-server-six.vercel.app/",
// });

// const Clubs = () => {
//   // searchState এন্টার চাপার পর আপডেট হবে, যা কুয়েরি ট্রিগার করবে
//   const [searchState, setSearchState] = useState("");
//   // ক্যাটাগরি এবং সর্ট সরাসরি কাজ করবে
//   const [category, setCategory] = useState("All");
//   const [sort, setSort] = useState("newest");

//   const { data: clubs = [], isLoading } = useQuery({
//     queryKey: ["clubs", searchState, category, sort], // searchState পরিবর্তন হলেই কেবল রিলোড হবে
//     queryFn: async () => {
//       const res = await axiosInstance.get(`search-filter-sort`, {
//         params: { search: searchState, category, sort },
//       });
//       return res.data;
//     },
//   });

//   // ফর্ম সাবমিট হ্যান্ডলার (Enter চাপলে বা বাটনে ক্লিক করলে)
//   const handleSearch = (e) => {
//     e.preventDefault();
//     const searchText = e.target.searchField.value; // ইনপুট ফিল্ড থেকে ভ্যালু নেওয়া
//     setSearchState(searchText);
//   };

//   const categories = ["All", "Photography", "Sports", "Tech", "Music", "Art"];

//   if (isLoading) return <Loader />;

//   return (
//     <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
//       <div className="flex flex-col md:flex-row gap-4 mb-10 items-center justify-between bg-gray-50 p-6 rounded-2xl shadow-sm border border-gray-100">

//         {/* Search Form - Enter কাজ করার জন্য ফর্ম ব্যবহার করা হয়েছে */}
//         <form onSubmit={handleSearch} className="w-full md:w-1/3 flex gap-2">
//           <input
//             name="searchField" // নাম দেওয়া হয়েছে যাতে e.target.searchField দিয়ে ধরা যায়
//             type="text"
//             placeholder="Search by club name..."
//             className="input input-bordered w-full rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
//           />
//           <button type="submit" className="btn btn-primary rounded-xl">Search</button>
//         </form>

//         {/* Category Filter */}
//         <div className="w-full md:w-1/4">
//           <select
//             className="select select-bordered w-full rounded-xl"
//             onChange={(e) => setCategory(e.target.value)}
//             defaultValue="All"
//           >
//             <option value="All">All Categories</option>
//             {categories.filter(c => c !== "All").map(cat => (
//               <option key={cat} value={cat}>{cat}</option>
//             ))}
//           </select>
//         </div>

//         {/* Sort Options */}
//         <div className="w-full md:w-1/4">
//           <select
//             className="select select-bordered w-full rounded-xl"
//             onChange={(e) => setSort(e.target.value)}
//           >
//             <option value="newest">Newest First</option>
//             <option value="oldest">Oldest First</option>
//             <option value="low-fee">Lowest Fee</option>
//             <option value="high-fee">Highest Fee</option>
//           </select>
//         </div>
//       </div>

//       {/* Clubs Grid Logic (আগের মতোই থাকবে) */}
//       {/* ... (বাকি কোড অপরিবর্তিত) */}
//     </div>
//   );
// };

// export default Clubs;
