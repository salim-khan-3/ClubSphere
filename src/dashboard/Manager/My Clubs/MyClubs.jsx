import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router"; // Navigate কম্পোনেন্ট ইম্পোর্ট করো না
import { AuthContext } from "../../../Context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Components/Loader/Loader";

const MyClubs = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const {
    data: clubs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myclubs", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/clubs/my-clubs?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
    retry: 1,
  });

  if (!user) {
    return <Loader></Loader>;
  }

  if (isLoading) {
    return <Loader></Loader>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-600 py-10">
        Error: {error?.message || "Failed to load clubs"}
      </div>
    );
  }

  const handleCreateClick = () => {
    navigate("/dashboard/manager/create-club");
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-6">My Clubs</h2>

      <button
        onClick={handleCreateClick}
        className="mb-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
      >
        Create New Club
      </button>

      {clubs.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-6">
            You haven't created any clubs yet.
          </p>
          <button
            onClick={handleCreateClick}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Create Your First Club
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {clubs.map((club) => (
            <div
              key={club._id}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="overflow-hidden rounded-t-2xl">
                <img
                  src={
                    club.bannerImage || "https://via.placeholder.com/400x200"
                  }
                  alt={club.name}
                  className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-5">
                <h3 className="text-2xl font-semibold text-gray-900 tracking-wide">
                  {club.name}
                </h3>

                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {club.description}
                </p>

                <div className="mt-4 text-sm text-gray-500 space-y-1">
                  <p> Location: {club.location}</p>
                  <p>Category: {club.category}</p>
                  <p>Membership Fee: ${club.membershipFee}</p>
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="flex-1 py-2 rounded-xl bg-amber-400 text-black font-medium hover:bg-amber-500 shadow-md hover:shadow-lg transition-all duration-300">
                    Edit
                  </button>
                  <button className="flex-1 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 shadow-md hover:shadow-lg transition-all duration-300">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyClubs;
