// import { Settings } from "lucide-react";
// import { FaUserFriends } from "react-icons/fa";
// import { NavLink } from "react-router";
// import { useState } from "react";
// import { RiArrowDropDownLine } from "react-icons/ri";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { auth } from "../../../firebase/firebase.init";

// const Sidebar = ({ isMobile = false, onClose = () => {} }) => {
//   const [adminOpen, setAdminOpen] = useState(true);
//   const [managerOpen, setManagerOpen] = useState(true);
//   const [memberOpen, setMemberOpen] = useState(true);

//   // 🔐 get firebase token
//   const getToken = async () => {
//     const user = auth.currentUser;
//     if (user) return await user.getIdToken();
//     return null;
//   };

//   // 🔥 get current user role
//   const { data: role = "", isLoading } = useQuery({
//     queryKey: ["user-role", auth.currentUser?.email],
//     enabled: !!auth.currentUser?.email,
//     queryFn: async () => {
//       const token = await getToken();

//       const res = await axios.get("http://localhost:3000/users", {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       });

//       const email = auth.currentUser.email;
//       const currentUser = res.data.find(
//         (u) => u.email === email
//       );

//       return currentUser?.role || "member";
//     },
//   });

//   const handleLinkClick = () => {
//     if (isMobile) onClose();
//   };

//   if (isLoading) {
//     return <div className="p-6">Loading...</div>;
//   }

//   return (
//     <aside
//       className={`bg-white shadow-xl p-6 ${
//         isMobile ? "w-72 block" : "w-[300px] hidden md:block"
//       }`}
//     >
//       <nav className="space-y-4">

//         {/* ================= ADMIN ================= */}
//         {role === "admin" && (
//           <>
//             <button
//               onClick={() => setAdminOpen(!adminOpen)}
//               className="flex items-center justify-between w-full text-lg font-medium hover:text-blue-600"
//             >
//               <span className="flex items-center gap-3">
//                 <FaUserFriends size={20} /> Admin
//               </span>
//               <RiArrowDropDownLine
//                 size={22}
//                 className={`transition-transform ${
//                   adminOpen ? "rotate-0" : "-rotate-90"
//                 }`}
//               />
//             </button>

//             <div
//               className={`ml-8 mt-2 space-y-3 overflow-hidden transition-all ${
//                 adminOpen ? "max-h-60" : "max-h-0"
//               }`}
//             >
//               <NavLink to="/dashboard/admin" onClick={handleLinkClick}>
//                 Admin Overview
//               </NavLink>
//               <NavLink
//                 to="/dashboard/admin/manage-users"
//                 onClick={handleLinkClick}
//               >
//                 Manage Users
//               </NavLink>
//               <NavLink
//                 to="/dashboard/admin/manage-clubs"
//                 onClick={handleLinkClick}
//               >
//                 Manage Clubs
//               </NavLink>
//               <NavLink
//                 to="/dashboard/admin/payments"
//                 onClick={handleLinkClick}
//               >
//                 Payments
//               </NavLink>
//             </div>
//           </>
//         )}

//         {/* ================= CLUB MANAGER ================= */}
//         {role === "clubManager" && (
//           <>
//             <button
//               onClick={() => setManagerOpen(!managerOpen)}
//               className="flex items-center justify-between w-full text-lg font-medium hover:text-blue-600"
//             >
//               <span className="flex items-center gap-3">
//                 <FaUserFriends size={20} /> Club Manager
//               </span>
//               <RiArrowDropDownLine
//                 size={22}
//                 className={`transition-transform ${
//                   managerOpen ? "rotate-0" : "-rotate-90"
//                 }`}
//               />
//             </button>

//             <div
//               className={`ml-8 mt-2 space-y-3 overflow-hidden transition-all ${
//                 managerOpen ? "max-h-80" : "max-h-0"
//               }`}
//             >
//               <NavLink to="/dashboard/manager">Manager Overview</NavLink>
//               <NavLink to="/dashboard/manager/my-clubs">My Clubs</NavLink>
//               <NavLink to="/dashboard/manager/club-members">
//                 Club Members
//               </NavLink>
//               <NavLink to="/dashboard/manager/events-Management">
//                 Events Management
//               </NavLink>
//               <NavLink to="/dashboard/manager/event-registrations">
//                 Event Registrations
//               </NavLink>
//             </div>
//           </>
//         )}

//         {/* ================= MEMBER ================= */}
//         {role === "member" && (
//           <>
//             <button
//               onClick={() => setMemberOpen(!memberOpen)}
//               className="flex items-center justify-between w-full text-lg font-medium hover:text-blue-600"
//             >
//               <span className="flex items-center gap-3">
//                 <FaUserFriends size={20} /> Member
//               </span>
//               <RiArrowDropDownLine
//                 size={22}
//                 className={`transition-transform ${
//                   memberOpen ? "rotate-0" : "-rotate-90"
//                 }`}
//               />
//             </button>

//             <div
//               className={`ml-8 mt-2 space-y-3 overflow-hidden transition-all ${
//                 memberOpen ? "max-h-80" : "max-h-0"
//               }`}
//             >
//               <NavLink to="/dashboard/member">Member Overview</NavLink>
//               <NavLink to="/dashboard/member/myclubs">My Clubs</NavLink>
//               <NavLink to="/dashboard/member/myevents">My Events</NavLink>
//               <NavLink to="/dashboard/member/paymenthistory">
//                 Payment History
//               </NavLink>
//             </div>
//           </>
//         )}

//         <NavLink className="flex items-center gap-3 text-lg font-medium hover:text-blue-600">
//           <Settings size={20} /> Settings
//         </NavLink>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;
























// import { Settings } from "lucide-react";
// import { RiAdminFill } from "react-icons/ri";
// import { FaUser, FaUserFriends } from "react-icons/fa";
// import { NavLink } from "react-router";
// import { useState } from "react";
// import { RiArrowDropDownLine } from "react-icons/ri";

// const Sidebar = ({ isMobile = false, onClose = () => {} }) => {
//   const [adminOpen, setAdminOpen] = useState(false);
//   const [managerOpen, setManagerOpen] = useState(false);
//   const [memberOpen, setMemberOpen] = useState(false);


//   const handleLinkClick = () => {
//     if (isMobile) onClose();
//   };

//   return (
//     // <aside className="w-[300px] bg-white shadow-xl p-6 hidden md:block">
//     <aside className={`bg-white shadow-xl p-6 ${isMobile ? 'w-72 block' : 'w-[300px] hidden md:block'}`}>

//       <nav className="space-y-4">
//         {/* ---------- ADMIN MAIN BUTTON ---------- */}
//         <button
//           onClick={() => setAdminOpen(!adminOpen)}
//           className="flex items-center justify-between w-full text-lg font-medium hover:text-blue-600 cursor-pointer"
//         >
//           <span className="flex items-center gap-3">
//             <FaUserFriends size={20} /> Admin
//           </span>

//           <span
//             className={`transition-transform  duration-300 ${
//               adminOpen ? "rotate-0" : "-rotate-90"
//             }`}
//           >
//             <RiArrowDropDownLine size={22} />
//           </span>
//         </button>

//         {/* ---------- ADMIN DROPDOWN LINKS ---------- */}
//         <div
//           className={`ml-8 mt-2 space-y-3 transition-all duration-300 overflow-hidden ${
//             adminOpen ? "max-h-60" : "max-h-0"
//           }`}
//         >
//           <NavLink
//             to="/dashboard/admin/"
//             onClick={handleLinkClick}
//             className="block hover:text-blue-600 text-gray-700"
//           >
//             Admin Overview
//           </NavLink>

//           <NavLink
//             to="/dashboard/admin/manage-users"
//             onClick={handleLinkClick}
//             className="block hover:text-blue-600 text-gray-700"
//           >
//             Manage Users
//           </NavLink>

//           <NavLink
//             to="/dashboard/admin/manage-clubs"
//             onClick={handleLinkClick}
//             className="block hover:text-blue-600 text-gray-700"
//           >
//             Manage Clubs
//           </NavLink>

//           <NavLink
//             to="/dashboard/admin/payments"
//             onClick={handleLinkClick}
//             className="block hover:text-blue-600 text-gray-700"
//           >
//             Payments / Transactions
//           </NavLink>
//         </div>

//         {/* ---------- MANAGER ---------- */}

//         <button
//           onClick={() => setManagerOpen(!managerOpen)}
//           className="flex items-center justify-between w-full text-lg font-medium hover:text-blue-600 cursor-pointer"
//         >
//           <span className="flex items-center gap-3">
//             <FaUserFriends size={20} /> Club Manager
//           </span>

//           <span
//             className={`transition-transform  duration-300 ${
//               managerOpen ? "rotate-0" : "-rotate-90"
//             }`}
//           >
//             <RiArrowDropDownLine size={22} />
//           </span>
//         </button>

//         {/* ---------- MANAGER DROPDOWN LINKS ---------- */}
//         <div
//           className={`ml-8 mt-2 space-y-3 transition-all duration-300 overflow-hidden ${
//             managerOpen ? "max-h-80" : "max-h-0"
//           }`}
//         >
//           <NavLink
//             to="/dashboard/manager"
//             className="block hover:text-blue-600 text-gray-700"
//           >
//             Manager Overview
//           </NavLink>

//           <NavLink
//             to="/dashboard/manager/my-clubs"
//             className="block hover:text-blue-600 text-gray-700"
//           >
//             My Clubs
//           </NavLink>

//           <NavLink
//             to="/dashboard/manager/club-members"
//             className="block hover:text-blue-600 text-gray-700"
//           >
//             Club Members
//           </NavLink>

//           <NavLink
//             to="/dashboard/manager/events-Management"
//             className="block hover:text-blue-600 text-gray-700"
//           >
//             Events Management
//           </NavLink>

//           <NavLink
//             to="/dashboard/manager/event-registrations"
//             className="block hover:text-blue-600 text-gray-700"
//           >
//             Event Registrations
//           </NavLink>
//         </div>

//         {/* ---------- MANAGER ---------- */}

//         <button
//           onClick={() => setMemberOpen(!memberOpen)}
//           className="flex items-center justify-between w-full text-lg font-medium hover:text-blue-600 cursor-pointer"
//         >
//           <span className="flex items-center gap-3">
//             <FaUserFriends size={20} /> Member
//           </span>

//           <span
//             className={`transition-transform  duration-300 ${
//               memberOpen ? "rotate-0" : "-rotate-90"
//             }`}
//           >
//             <RiArrowDropDownLine size={22} />
//           </span>
//         </button>

//         {/* ---------- MEMBER ---------- */}
//         <div
//           className={`ml-8 mt-2 space-y-3 transition-all duration-300 overflow-hidden ${
//             memberOpen ? "max-h-80" : "max-h-0"
//           }`}
//         >
//           <NavLink
//             to="/dashboard/member"
//             className="block hover:text-blue-600 text-gray-700"
//           >
//             Member Overview
//           </NavLink>
//           <NavLink
//             to="/dashboard/member/myclubs"
//             className="block hover:text-blue-600 text-gray-700"
//           >
//             My Clubs
//           </NavLink>
//           <NavLink
//             to="/dashboard/member/myevents"
//             className="block hover:text-blue-600 text-gray-700"
//           >
//             My Events
//           </NavLink>
//           <NavLink
//             to="/dashboard/member/paymenthistory"
//             className="block hover:text-blue-600 text-gray-700"
//           >
//             Payment History
//           </NavLink>
//         </div>

//         {/* ---------- SETTINGS ---------- */}
//         <NavLink className="flex items-center gap-3 text-lg font-medium hover:text-blue-600 cursor-pointer">
//           <Settings size={20} /> Settings
//         </NavLink>
//       </nav>
//     </aside>
//   );
// };

// export default Sidebar;







import { Settings } from "lucide-react";
import { FaUserFriends } from "react-icons/fa";
import { NavLink } from "react-router";
import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { auth } from "../../../firebase/firebase.init";

const Sidebar = ({ isMobile = false, onClose = () => {} }) => {
  const [adminOpen, setAdminOpen] = useState(false);
  const [managerOpen, setManagerOpen] = useState(false);
  const [memberOpen, setMemberOpen] = useState(false);

  const getToken = async () => {
    const user = auth.currentUser;
    if (user) return await user.getIdToken();
    return null;
  };

  // 🔥 role fetch
  const { data: role = "member", isLoading } = useQuery({
    queryKey: ["user-role", auth.currentUser?.email],
    enabled: !!auth.currentUser?.email,
    queryFn: async () => {
      const token = await getToken();
      const res = await axios.get("http://localhost:3000/users", {
        headers: { authorization: `Bearer ${token}` },
      });

      const email = auth.currentUser.email;
      const currentUser = res.data.find(u => u.email === email);
      return currentUser?.role || "member";
    },
  });

  const handleLinkClick = () => {
    if (isMobile) onClose();
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <aside className={`bg-white shadow-xl p-6 ${isMobile ? "w-72 block" : "w-[300px] hidden md:block"}`}>
      <nav className="space-y-4">

        {/* ---------- ADMIN ---------- */}
        {role === "admin" && (
          <>
            <button
              onClick={() => setAdminOpen(!adminOpen)}
              className="flex items-center justify-between w-full text-lg font-medium hover:text-blue-600 cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <FaUserFriends size={20} /> Admin
              </span>
              <span className={`transition-transform duration-300 ${adminOpen ? "rotate-0" : "-rotate-90"}`}>
                <RiArrowDropDownLine size={22} />
              </span>
            </button>

            <div className={`ml-8 mt-2 space-y-3 transition-all duration-300 overflow-hidden ${adminOpen ? "max-h-60" : "max-h-0"}`}>
              <NavLink to="/dashboard/admin" onClick={handleLinkClick} className="block hover:text-blue-600 text-gray-700">
                Admin Overview
              </NavLink>
              <NavLink to="/dashboard/admin/manage-users" onClick={handleLinkClick} className="block hover:text-blue-600 text-gray-700">
                Manage Users
              </NavLink>
              <NavLink to="/dashboard/admin/manage-clubs" onClick={handleLinkClick} className="block hover:text-blue-600 text-gray-700">
                Manage Clubs
              </NavLink>
              <NavLink to="/dashboard/admin/payments" onClick={handleLinkClick} className="block hover:text-blue-600 text-gray-700">
                Payments / Transactions
              </NavLink>
            </div>
          </>
        )}

        {/* ---------- CLUB MANAGER ---------- */}
        {role === "clubManager" && (
          <>
            <button
              onClick={() => setManagerOpen(!managerOpen)}
              className="flex items-center justify-between w-full text-lg font-medium hover:text-blue-600 cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <FaUserFriends size={20} /> Club Manager
              </span>
              <span className={`transition-transform duration-300 ${managerOpen ? "rotate-0" : "-rotate-90"}`}>
                <RiArrowDropDownLine size={22} />
              </span>
            </button>

            <div className={`ml-8 mt-2 space-y-3 transition-all duration-300 overflow-hidden ${managerOpen ? "max-h-80" : "max-h-0"}`}>
              <NavLink to="/dashboard/manager" className="block hover:text-blue-600 text-gray-700">
                Manager Overview
              </NavLink>
              <NavLink to="/dashboard/manager/my-clubs" className="block hover:text-blue-600 text-gray-700">
                My Clubs
              </NavLink>
              <NavLink to="/dashboard/manager/club-members" className="block hover:text-blue-600 text-gray-700">
                Club Members
              </NavLink>
              <NavLink to="/dashboard/manager/events-Management" className="block hover:text-blue-600 text-gray-700">
                Events Management
              </NavLink>
              <NavLink to="/dashboard/manager/event-registrations" className="block hover:text-blue-600 text-gray-700">
                Event Registrations
              </NavLink>
            </div>
          </>
        )}

        {/* ---------- MEMBER ---------- */}
        {role === "member" && (
          <>
            <button
              onClick={() => setMemberOpen(!memberOpen)}
              className="flex items-center justify-between w-full text-lg font-medium hover:text-blue-600 cursor-pointer"
            >
              <span className="flex items-center gap-3">
                <FaUserFriends size={20} /> Member
              </span>
              <span className={`transition-transform duration-300 ${memberOpen ? "rotate-0" : "-rotate-90"}`}>
                <RiArrowDropDownLine size={22} />
              </span>
            </button>

            <div className={`ml-8 mt-2 space-y-3 transition-all duration-300 overflow-hidden ${memberOpen ? "max-h-80" : "max-h-0"}`}>
              <NavLink to="/dashboard/member" className="block hover:text-blue-600 text-gray-700">
                Member Overview
              </NavLink>
              <NavLink to="/dashboard/member/myclubs" className="block hover:text-blue-600 text-gray-700">
                My Clubs
              </NavLink>
              <NavLink to="/dashboard/member/myevents" className="block hover:text-blue-600 text-gray-700">
                My Events
              </NavLink>
              <NavLink to="/dashboard/member/paymenthistory" className="block hover:text-blue-600 text-gray-700">
                Payment History
              </NavLink>
            </div>
          </>
        )}

        {/* ---------- SETTINGS ---------- */}
        <NavLink className="flex items-center gap-3 text-lg font-medium hover:text-blue-600 cursor-pointer">
          <Settings size={20} /> Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
