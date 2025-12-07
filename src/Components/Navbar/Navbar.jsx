import { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut(); // logout function from AuthContext
      setDropdownOpen(false); // close dropdown
      toast.success("Successfully logged out"); // optional toast
      navigate("/auth/login"); // redirect to login page
    } catch (error) {
      console.error(error);
      toast.error("Logout failed"); // optional error toast
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
                    src={user.photoURL || "https://randomuser.me/api/portraits/men/32.jpg"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-indigo-600 object-cover"
                  />
                  <span className="text-gray-700 font-medium">{user.displayName || user.email}</span>
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

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </NavLink>
                    <NavLink
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-indigo-50"
                      onClick={() => setDropdownOpen(false)}
                    >
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
                <NavLink
                  to="/dashboard"
                  className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
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
  );
};

export default Navbar;

























// import { use, useState } from "react";
// import { NavLink } from "react-router";
// import { AuthContext } from "../../Context/AuthContext";

// const Navbar = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const {user} = use(AuthContext);

//   console.log(user);

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
//   const isLoggedIn = true;
//   const userName = "Rahim";
//   const userPhoto = "https://randomuser.me/api/portraits/men/32.jpg";

//   return (
//     <nav className="bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex-shrink-0">
//             <NavLink to="/" className="text-2xl font-bold text-indigo-600">
//               ClubSphere
//             </NavLink>
//           </div>

//           {/* Desktop Public Links */}
//           <div className="hidden md:flex items-center space-x-8">
//             <NavLink
//               to="/"
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-indigo-600 font-medium"
//                   : "text-gray-700 hover:text-indigo-600 font-medium"
//               }
//             >
//               Home
//             </NavLink>
//             <NavLink
//               to="/clubs"
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-indigo-600 font-medium"
//                   : "text-gray-700 hover:text-indigo-600 font-medium"
//               }
//             >
//               Clubs
//             </NavLink>
//             <NavLink
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-indigo-600 font-medium"
//                   : "text-gray-700 hover:text-indigo-600 font-medium"
//               }
//             >
//               Events
//             </NavLink>
//             <NavLink to="/auth/register">register</NavLink>
//             <NavLink to="/auth/login">login</NavLink>
//           </div>

//           {/* Desktop Auth / Profile */}
//           <div className="hidden md:flex items-center space-x-6">
//             {isLoggedIn ? (
//               <div className="relative group">
//                 <button className="flex items-center space-x-3 focus:outline-none">
//                   <img
//                     src={userPhoto}
//                     alt="Profile"
//                     className="w-10 h-10 rounded-full border-2 border-indigo-600 object-cover"
//                   />
//                   <span className="text-gray-700 font-medium">{userName}</span>
//                   <svg
//                     className="w-4 h-4 text-gray-600"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </button>

//                 {/* Dropdown */}
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 hidden group-hover:block">
//                   <NavLink
//                     to="/profile"
//                     className="block px-4 py-2 text-gray-700 hover:bg-indigo-50"
//                   >
//                     Profile
//                   </NavLink>
//                   <NavLink
//                     to="/dashboard"
//                     className="block px-4 py-2 text-gray-700 hover:bg-indigo-50"
//                   >
//                     Dashboard
//                   </NavLink>
//                   <hr className="my-1" />
//                   <NavLink
//                     to="/logout"
//                     className="block px-4 py-2 text-red-600 hover:bg-red-50"
//                   >
//                     Logout
//                   </NavLink>
//                 </div>
//               </div>
//             ) : (
//               LogReg
//             )}
//           </div>

//           {/* Mobile Hamburger */}
//           <div className="md:hidden">
//             <button
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//               className="text-gray-700 focus:outline-none"
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 {mobileMenuOpen ? (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 ) : (
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden bg-white border-t">
//           <div className="px-2 pt-2 pb-3 space-y-1">
//             <NavLink
//               to="/"
//               className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               Home
//             </NavLink>
//             <NavLink
//               to="/clubs"
//               className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               Clubs
//             </NavLink>
//             <NavLink
//               to="/events"
//               className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               Events
//             </NavLink>

//             <hr className="my-3" />

//             {isLoggedIn ? (
//               <>
//                 <NavLink
//                   to="/profile"
//                   className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   Profile
//                 </NavLink>
//                 <NavLink
//                   to="/dashboard"
//                   className="block px-3 py-2 text-gray-700 hover:bg-indigo-50 rounded-md"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   Dashboard
//                 </NavLink>
//                 <NavLink
//                   to="/logout"
//                   className="block px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   Logout
//                 </NavLink>
//               </>
//             ) : (
//               LogReg
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
