import { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Sidebar from "../../dashboard/Shared/Sidebar/Sidebar";



const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  // Add keyframes dynamically for slide animation
  useEffect(() => {
    const styleSheet = document.styleSheets[0];
    const rule = `
      @keyframes slideLeft {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
      }
    `;
    styleSheet.insertRule(rule, styleSheet.cssRules.length);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      setDropdownOpen(false);
      setOpenSidebar(false); 
      toast.success("Successfully logged out");
      navigate("/auth/login");
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  const handleDashboardClick = () => {
    if (window.innerWidth < 768) {
      // Mobile
      setOpenSidebar(true);
      setMobileMenuOpen(false);
    } else {
      // Desktop
      navigate("/dashboard");
    }
  };

  const LogReg = (
    <>
      <NavLink
        to="/auth/login"
        className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
        onClick={() => setMobileMenuOpen(false)}
      >
        Login
      </NavLink>
      <NavLink
        to="/auth/register"
        className="block px-3 py-2 text-center bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        onClick={() => setMobileMenuOpen(false)}
      >
        Register
      </NavLink>
    </>
  );

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <NavLink to="/" className="text-2xl font-bold text-indigo-600">
                ClubSphere
              </NavLink>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-medium"
                    : "text-gray-700 hover:text-indigo-600 font-medium"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/clubs"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-medium"
                    : "text-gray-700 hover:text-indigo-600 font-medium"
                }
              >
                Clubs
              </NavLink>
              <NavLink
                to="/events"
                className={({ isActive }) =>
                  isActive
                    ? "text-indigo-600 font-medium"
                    : "text-gray-700 hover:text-indigo-600 font-medium"
                }
              >
                Events
              </NavLink>
            </div>

            {/* Desktop Auth/Profile */}
            <div className="hidden md:flex items-center space-x-6">
              {user ? (
                <div className="relative">
                  <button
                    className="flex items-center space-x-3 focus:outline-none"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <img
                      src={
                        user.photoURL ||
                        "https://randomuser.me/api/portraits/men/32.jpg"
                      }
                      alt="Profile"
                      className="w-10 h-10 rounded-full border-2 border-indigo-600 object-cover"
                    />
                    <span className="text-gray-700 font-medium">
                      {user.displayName || user.email}
                    </span>
                    <svg
                      className="w-4 h-4 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Desktop Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-10">
                      <NavLink
                        to="/profile"
                        className="block flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-indigo-50"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <CgProfile />
                        Profile
                      </NavLink>
                      <NavLink
                        to="/dashboard"
                        className="block px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-indigo-50"
                        onClick={(e) => {
                          e.preventDefault();
                          setDropdownOpen(false);
                          handleDashboardClick();
                        }}
                      >
                        <MdDashboard />
                        Dashboard
                      </NavLink>
                      <hr className="my-1" />
                      <button
                        onClick={handleLogout}
                        className="w-full text-left block px-4 py-2 text-red-600 hover:bg-red-50"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                LogReg
              )}
            </div>

            {/* Mobile Hamburger */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavLink
                to="/"
                className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/clubs"
                className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Clubs
              </NavLink>
              <NavLink
                to="/events"
                className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </NavLink>
              <hr className="my-3" />
              {user ? (
                <>
                  <NavLink
                    to="/profile"
                    className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Profile
                  </NavLink>
                  <button
                    onClick={handleDashboardClick}
                    className="w-full text-left block px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full text-left block px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                LogReg
              )}
            </div>
          </div>
        )}
      </nav>

      {openSidebar && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpenSidebar(false)}
          />

          {/* Sliding Sidebar */}
          <div
            className="relative w-72 bg-white h-full shadow-2xl overflow-y-auto"
            style={{ animation: "slideLeft 0.3s ease-out" }}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-gray-900 z-10"
              onClick={() => setOpenSidebar(false)}
            >
              ×
            </button>

            {/* User Info Header */}
            {user && (
              <div className="p-6 border-b">
                <div className="flex items-center gap-4">
                  <img
                    src={
                      user?.photoURL ||
                      "https://randomuser.me/api/portraits/men/32.jpg"
                    }
                    alt="User"
                    className="w-14 h-14 rounded-full border-2 border-indigo-600 object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">
                      {user?.displayName || "User"}
                    </h3>
                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}

            <Sidebar isMobile={true} onClose={() => setOpenSidebar(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;


























// import { useState, useContext, useEffect } from "react";
// import { NavLink, useNavigate } from "react-router";
// import { AuthContext } from "../../Context/AuthContext";
// import toast from "react-hot-toast";
// import { MdDashboard } from "react-icons/md";
// import { CgProfile } from "react-icons/cg";
// import DashboardLayout from "../../Layouts/DashboardLayout";
// import Sidebar from "../../dashboard/Shared/Sidebar/Sidebar";

// const Navbar = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [openSidebar, setOpenSidebar] = useState(false);
//   const { user, logOut } = useContext(AuthContext);
//   const navigate = useNavigate();

//   // Add keyframes dynamically for slide animation
//   useEffect(() => {
//     const styleSheet = document.styleSheets[0];
//     const rule = `
//       @keyframes slideLeft {
//         from { transform: translateX(-100%); }
//         to { transform: translateX(0); }
//       }
//     `;
//     styleSheet.insertRule(rule, styleSheet.cssRules.length);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await logOut();
//       setDropdownOpen(false);
//       toast.success("Successfully logged out");
//       navigate("/auth/login");
//     } catch (error) {
//       console.error(error);
//       toast.error("Logout failed");
//     }
//   };

//   const handleDashboardClick = () => {
//     if (window.innerWidth < 768) {
//       // Mobile
//       setOpenSidebar(true);
//       setMobileMenuOpen(false);
//     } else {
//       // Desktop
//       navigate("/dashboard");
//     }
//   };

//   const LogReg = (
//     <>
//       <NavLink
//         to="/auth/login"
//         className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
//         onClick={() => setMobileMenuOpen(false)}
//       >
//         Login
//       </NavLink>
//       <NavLink
//         to="/auth/register"
//         className="block px-3 py-2 text-center bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
//         onClick={() => setMobileMenuOpen(false)}
//       >
//         Register
//       </NavLink>
//     </>
//   );

//   return (
//     <>
//       <nav className="bg-white shadow-md sticky top-0 z-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center h-16">
//             {/* Logo */}
//             <div className="flex-shrink-0">
//               <NavLink to="/" className="text-2xl font-bold text-indigo-600">
//                 ClubSphere
//               </NavLink>
//             </div>

//             {/* Desktop Navigation Links */}
//             <div className="hidden md:flex items-center space-x-8">
//               <NavLink
//                 to="/"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-indigo-600 font-medium"
//                     : "text-gray-700 hover:text-indigo-600 font-medium"
//                 }
//               >
//                 Home
//               </NavLink>
//               <NavLink
//                 to="/clubs"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-indigo-600 font-medium"
//                     : "text-gray-700 hover:text-indigo-600 font-medium"
//                 }
//               >
//                 Clubs
//               </NavLink>
//               <NavLink
//                 to="/events"
//                 className={({ isActive }) =>
//                   isActive
//                     ? "text-indigo-600 font-medium"
//                     : "text-gray-700 hover:text-indigo-600 font-medium"
//                 }
//               >
//                 Events
//               </NavLink>
//             </div>

//             {/* Desktop Auth/Profile */}
//             <div className="hidden md:flex items-center space-x-6">
//               {user ? (
//                 <div className="relative">
//                   <button
//                     className="flex items-center space-x-3 focus:outline-none"
//                     onClick={() => setDropdownOpen(!dropdownOpen)}
//                   >
//                     <img
//                       src={
//                         user.photoURL ||
//                         "https://randomuser.me/api/portraits/men/32.jpg"
//                       }
//                       alt="Profile"
//                       className="w-10 h-10 rounded-full border-2 border-indigo-600 object-cover"
//                     />
//                     <span className="text-gray-700 font-medium">
//                       {user.displayName || user.email}
//                     </span>
//                     <svg
//                       className="w-4 h-4 text-gray-600"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   </button>

//                   {/* Dropdown */}
//                   {dropdownOpen && (
//                     <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
//                       <NavLink
//                         to="/profile"
//                         className="block flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-indigo-50"
//                         onClick={() => setDropdownOpen(false)}
//                       >
//                         <CgProfile />
//                         Profile
//                       </NavLink>
//                       <NavLink
//                         to="/dashboard"
//                         className="block px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-indigo-50"
//                         onClick={(e) => {
//                           e.preventDefault();
//                           setDropdownOpen(false);
//                           handleDashboardClick();
//                         }}
//                       >
//                         <MdDashboard />
//                         Dashboard
//                       </NavLink>
//                       <hr className="my-1" />
//                       <button
//                         onClick={handleLogout}
//                         className="w-full text-left block px-4 py-2 text-red-600 hover:bg-red-50"
//                       >
//                         Logout
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 LogReg
//               )}
//             </div>

//             {/* Mobile Hamburger */}
//             <div className="md:hidden">
//               <button
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 className="text-gray-700 focus:outline-none"
//               >
//                 <svg
//                   className="h-6 w-6"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   {mobileMenuOpen ? (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   ) : (
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M4 6h16M4 12h16M4 18h16"
//                     />
//                   )}
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {mobileMenuOpen && (
//           <div className="md:hidden bg-white border-t">
//             <div className="px-2 pt-2 pb-3 space-y-1">
//               <NavLink
//                 to="/"
//                 className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Home
//               </NavLink>
//               <NavLink
//                 to="/clubs"
//                 className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Clubs
//               </NavLink>
//               <NavLink
//                 to="/events"
//                 className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
//                 onClick={() => setMobileMenuOpen(false)}
//               >
//                 Events
//               </NavLink>

//               <hr className="my-3" />

//               {user ? (
//                 <>
//                   <NavLink
//                     to="/profile"
//                     className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
//                     onClick={() => setMobileMenuOpen(false)}
//                   >
//                     Profile
//                   </NavLink>
//                   <NavLink
//                     to="/dashboard"
//                     className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
//                     onClick={(e) => {
//                       e.preventDefault();
//                       handleDashboardClick();
//                     }}
//                   >
//                     Dashboard
//                   </NavLink>
//                   <button
//                     onClick={() => {
//                       handleLogout();
//                       setMobileMenuOpen(false);
//                     }}
//                     className="w-full text-left block px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
//                   >
//                     Logout
//                   </button>
//                 </>
//               ) : (
//                 LogReg
//               )}
//             </div>
//           </div>
//         )}
//       </nav>




//       {/* Mobile Dashboard Sidebar */}
//       {openSidebar && (
//         <div className="fixed inset-0 z-50 flex md:hidden">
//           {/* Overlay */}
//           <div
//             className="absolute inset-0 bg-black/40"
//             onClick={() => setOpenSidebar(false)}
//           />

//           {/* Sidebar */}
//           <div
//             className="relative w-64 bg-white h-full shadow-xl p-5 z-50"
//             style={{ animation: "slideLeft 0.3s ease-out" }}
//           >
//             {/* Close Button */}
//             <button
//               className="absolute top-4 right-4 text-xl"
//               onClick={() => setOpenSidebar(false)}
//             >
//               ✖
//             </button>

//             {/* User Info */}
//             <div className="flex items-center gap-3 mb-6 mt-6">
//               <img
//                 src={
//                   user?.photoURL ||
//                   "https://randomuser.me/api/portraits/men/32.jpg"
//                 }
//                 className="w-12 h-12 rounded-full border"
//               />
//               <div>
//                 <h2 className="text-lg font-semibold">
//                   {user?.displayName || user?.email}
//                 </h2>
//               </div>
//             </div>

//             <hr />

//             {/* Sidebar Links */}


//             <Sidebar></Sidebar>
//             {/* <NavLink
//               to="/dashboard"
//               className="block py-2 mt-4 text-gray-800 hover:bg-indigo-50 rounded"
//               onClick={() => setOpenSidebar(false)}
//             >
//               Dashboard Home
//             </NavLink>

//             <NavLink
//               to="/profile"
//               className="block py-2 text-gray-800 hover:bg-indigo-50 rounded"
//               onClick={() => setOpenSidebar(false)}
//             >
//               Profile
//             </NavLink>

//             <NavLink
//               to="/clubs"
//               className="block py-2 text-gray-800 hover:bg-indigo-50 rounded"
//               onClick={() => setOpenSidebar(false)}
//             >
//               Clubs
//             </NavLink>

//             <NavLink
//               to="/events"
//               className="block py-2 text-gray-800 hover:bg-indigo-50 rounded"
//               onClick={() => setOpenSidebar(false)}
//             >
//               Events
//             </NavLink> */}

//             {/* Logout */}
//             <button
//               onClick={() => {
//                 handleLogout();
//                 setOpenSidebar(false);
//               }}
//               className="block w-full text-left py-2 mt-4 text-red-600 hover:bg-red-50 rounded"
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Navbar;
