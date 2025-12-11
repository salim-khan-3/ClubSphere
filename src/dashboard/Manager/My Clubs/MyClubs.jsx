import React from "react";
import { Navigate, useNavigate } from "react-router";

const MyClubs = () => {
      const Navigate = useNavigate();
  const clubs = [
    {
      id: 1,
      name: "Fitness Club",
      description: "Gym & Health",
      location: "Dhaka",
      membershipFee: "৳2000",
      category: "Health",
      bannerImage: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Book Lovers",
      description: "Community of readers",
      location: "Chittagong",
      membershipFee: "৳500",
      category: "Education",
      bannerImage: "https://via.placeholder.com/150",
    },
  ];

  const handleCreateClick = () => {
    Navigate("/dashboard/manager/create-club")
  }
  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-6">My Clubs</h2>

      <button onClick={handleCreateClick} className="mb-6 px-4 py-2 cursor-pointer bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
        Create New Club
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {clubs.map((club) => (
          <div
            key={club.id}
            className="border rounded-xl shadow p-4 bg-white hover:shadow-lg transition"
          >
            <img
              src={club.bannerImage}
              alt={club.name}
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-semibold">{club.name}</h3>
            <p className="text-gray-500 text-sm mb-2">{club.description}</p>
            <p className="text-gray-600 text-sm">Location: {club.location}</p>
            <p className="text-gray-600 text-sm">Category: {club.category}</p>
            <p className="text-gray-600 text-sm">
              Membership Fee: {club.membershipFee}
            </p>
            <div className="mt-4 flex gap-2">
              <button className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition">
                Edit
              </button>
              <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClubs;
