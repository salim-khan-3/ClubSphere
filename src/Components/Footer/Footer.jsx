import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiX } from "react-icons/si";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Brand */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-white">
            Club<span className="text-indigo-400">Sphere</span>
          </h2>
          <p className="text-sm leading-relaxed">
            ClubSphere is a modern platform to discover, join, and manage local
            clubs and events. Built to connect communities through shared
            interests.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-indigo-400">Home</Link></li>
            <li><Link to="/clubs" className="hover:text-indigo-400">Clubs</Link></li>
            <li><Link to="/events" className="hover:text-indigo-400">Events</Link></li>
            <li><Link to="/pricing" className="hover:text-indigo-400">How It Works</Link></li>
          </ul>
        </div>

      

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">
            Connect With Us
          </h3>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              <FaGithub size={22} />
            </a>

            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              <FaLinkedin size={22} />
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition"
            >
              <SiX size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-slate-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} ClubSphere. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
