// ClubDetails.jsx
import React from "react";
import { FaUserFriends, FaCalendarAlt } from "react-icons/fa";

const ClubDetails = () => {
  // Dummy data for now
  const club = {
    name: "Chess Club",
    banner: "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1200&q=80",
    description:
      "Welcome to the Chess Club! We host tournaments and casual games every week.",
    manager: {
      name: "John Doe",
      email: "john@example.com",
    },
    membersCount: 42,
    events: [
      { id: 1, title: "Winter Chess Tournament", date: "2025-12-20" },
      { id: 2, title: "Monthly Meetup", date: "2025-12-28" },
    ],
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Banner */}
      <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-lg">
        <img
          src={club.banner}
          alt={club.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-4 w-full">
          <h1 className="text-3xl font-bold">{club.name}</h1>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">About the Club</h2>
        <p>{club.description}</p>
      </div>

      {/* Manager Info & Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow flex flex-col space-y-2">
          <h3 className="font-semibold text-lg">Club Manager</h3>
          <p>Name: {club.manager.name}</p>
          <p>Email: {club.manager.email}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow flex items-center space-x-4">
          <FaUserFriends size={24} className="text-blue-500" />
          <div>
            <h3 className="font-semibold text-lg">Members</h3>
            <p>{club.membersCount} members</p>
          </div>
        </div>
      </div>

      {/* Events */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Upcoming Events</h2>
        <ul className="space-y-3">
          {club.events.map((event) => (
            <li
              key={event.id}
              className="flex justify-between items-center p-4 bg-gray-100 rounded"
            >
              <div>
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-gray-600">{event.date}</p>
              </div>
              <FaCalendarAlt className="text-gray-500" />
            </li>
          ))}
        </ul>
      </div>

      {/* Action Button */}
      <div className="text-center">
        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
          Join Club
        </button>
      </div>
    </div>
  );
};

export default ClubDetails;
