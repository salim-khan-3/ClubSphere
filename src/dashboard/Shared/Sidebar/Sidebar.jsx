import { Settings } from "lucide-react";
import { RiAdminFill } from "react-icons/ri";
import { FaUser, FaUserFriends } from "react-icons/fa";
import { NavLink } from "react-router";
import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { AiOutlineDashboard } from "react-icons/ai";

const Sidebar = ({ isMobile = false, onClose = () => {} }) => {
  const [adminOpen, setAdminOpen] = useState(false);
  const [managerOpen, setManagerOpen] = useState(false);
  const [memberOpen, setMemberOpen] = useState(false);


  const handleLinkClick = () => {
    if (isMobile) onClose();
  };

  return (
    // <aside className="w-[300px] bg-white shadow-xl p-6 hidden md:block">
    <aside className={`bg-white shadow-xl p-6 ${isMobile ? 'w-72 block' : 'w-[300px] hidden md:block'}`}>

      <nav className="space-y-4">
        {/* ---------- ADMIN MAIN BUTTON ---------- */}
        <button
          onClick={() => setAdminOpen(!adminOpen)}
          className="flex items-center justify-between w-full text-lg font-medium hover:text-blue-600 cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <FaUserFriends size={20} /> Admin
          </span>

          <span
            className={`transition-transform  duration-300 ${
              adminOpen ? "rotate-0" : "-rotate-90"
            }`}
          >
            <RiArrowDropDownLine size={22} />
          </span>
        </button>

        {/* ---------- ADMIN DROPDOWN LINKS ---------- */}
        <div
          className={`ml-8 mt-2 space-y-3 transition-all duration-300 overflow-hidden ${
            adminOpen ? "max-h-60" : "max-h-0"
          }`}
        >
          <NavLink
            to="/dashboard/admin/"
            onClick={handleLinkClick}
            className="block hover:text-blue-600 text-gray-700"
          >
            Admin Overview
          </NavLink>

          <NavLink
            to="/dashboard/admin/manage-users"
            onClick={handleLinkClick}
            className="block hover:text-blue-600 text-gray-700"
          >
            Manage Users
          </NavLink>

          <NavLink
            to="/dashboard/admin/manage-clubs"
            onClick={handleLinkClick}
            className="block hover:text-blue-600 text-gray-700"
          >
            Manage Clubs
          </NavLink>

          <NavLink
            to="/dashboard/admin/payments"
            onClick={handleLinkClick}
            className="block hover:text-blue-600 text-gray-700"
          >
            Payments / Transactions
          </NavLink>
        </div>

        {/* ---------- MANAGER ---------- */}

        <button
          onClick={() => setManagerOpen(!managerOpen)}
          className="flex items-center justify-between w-full text-lg font-medium hover:text-blue-600 cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <FaUserFriends size={20} /> Club Manager
          </span>

          <span
            className={`transition-transform  duration-300 ${
              managerOpen ? "rotate-0" : "-rotate-90"
            }`}
          >
            <RiArrowDropDownLine size={22} />
          </span>
        </button>

        {/* ---------- MANAGER DROPDOWN LINKS ---------- */}
        <div
          className={`ml-8 mt-2 space-y-3 transition-all duration-300 overflow-hidden ${
            managerOpen ? "max-h-80" : "max-h-0"
          }`}
        >
          <NavLink
            to="/dashboard/manager"
            className="block hover:text-blue-600 text-gray-700"
          >
            Manager Overview
          </NavLink>

          <NavLink
            to="/dashboard/manager/my-clubs"
            className="block hover:text-blue-600 text-gray-700"
          >
            My Clubs
          </NavLink>

          <NavLink
            to="/dashboard/manager/club-members"
            className="block hover:text-blue-600 text-gray-700"
          >
            Club Members
          </NavLink>

          <NavLink
            to="/dashboard/manager/events-Management"
            className="block hover:text-blue-600 text-gray-700"
          >
            Events Management
          </NavLink>

          <NavLink
            to="/dashboard/manager/event-registrations"
            className="block hover:text-blue-600 text-gray-700"
          >
            Event Registrations
          </NavLink>
        </div>

        {/* ---------- MANAGER ---------- */}

        <button
          onClick={() => setMemberOpen(!memberOpen)}
          className="flex items-center justify-between w-full text-lg font-medium hover:text-blue-600 cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <FaUserFriends size={20} /> Member
          </span>

          <span
            className={`transition-transform  duration-300 ${
              memberOpen ? "rotate-0" : "-rotate-90"
            }`}
          >
            <RiArrowDropDownLine size={22} />
          </span>
        </button>

        {/* ---------- MEMBER ---------- */}
        <div
          className={`ml-8 mt-2 space-y-3 transition-all duration-300 overflow-hidden ${
            memberOpen ? "max-h-80" : "max-h-0"
          }`}
        >
          <NavLink
            to="/dashboard/member"
            className="block hover:text-blue-600 text-gray-700"
          >
            Member Overview
          </NavLink>
          <NavLink
            to="/dashboard/member/myclubs"
            className="block hover:text-blue-600 text-gray-700"
          >
            My Clubs
          </NavLink>
          <NavLink
            to="/dashboard/member/myevents"
            className="block hover:text-blue-600 text-gray-700"
          >
            My Events
          </NavLink>
          <NavLink
            to="/dashboard/member/paymenthistory"
            className="block hover:text-blue-600 text-gray-700"
          >
            Payment History
          </NavLink>
        </div>

        {/* ---------- SETTINGS ---------- */}
        <NavLink className="flex items-center gap-3 text-lg font-medium hover:text-blue-600 cursor-pointer">
          <Settings size={20} /> Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
