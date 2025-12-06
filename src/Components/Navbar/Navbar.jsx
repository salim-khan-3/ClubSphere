import { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  // mock auth check (replace with real auth)
  const isLoggedIn = false; // change later

  return (
    <nav className="w-full shadow-md bg-white fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          ClubSphere
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-lg">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <Link to="/clubs" className="hover:text-blue-600">Clubs</Link>
          <Link to="/events" className="hover:text-blue-600">Events</Link>

          {!isLoggedIn && (
            <>
              <Link to="/login" className="hover:text-blue-600">Login</Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-1 rounded-lg hover:bg-blue-700"
              >
                Register
              </Link>
            </>
          )}

          {isLoggedIn && (
            <div className="relative group cursor-pointer">
              <img
                src="https://i.pravatar.cc/40"
                alt="avatar"
                className="w-10 h-10 rounded-full border"
              />
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg hidden group-hover:block">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Profile
                </Link>
                <Link
                  to="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
                <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-3 text-lg">
          <Link to="/" onClick={() => setOpen(false)} className="block">Home</Link>
          <Link to="/clubs" onClick={() => setOpen(false)} className="block">Clubs</Link>
          <Link to="/events" onClick={() => setOpen(false)} className="block">Events</Link>

          {!isLoggedIn && (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="block">Login</Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="block bg-blue-600 text-white px-4 py-1 rounded-lg w-fit"
              >
                Register
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <Link to="/profile" onClick={() => setOpen(false)} className="block">Profile</Link>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="block">Dashboard</Link>
              <button className="block w-full text-left">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}