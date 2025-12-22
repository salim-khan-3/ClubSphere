import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../Context/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Loader from "../../../Components/Loader/Loader";
import Swal from "sweetalert2"; 

const MyClubs = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const {
    data: clubs = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myclubs", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `https://club-sphere-server-six.vercel.app/clubs/my-clubs?email=${user?.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
    retry: 1,
  });

  if (!user) {
    return <Loader />;
  }

  if (isLoading) {
    return <Loader />;
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

  const handleEditClick = (id) => {
    navigate(`/dashboard/manager/update_club/${id}`);
  };

  const handleDeleteClick = async (id) => {
    // SweetAlert2 Confirmation
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone. All members, events, and payments related to this club will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      padding: "2rem",
      customClass: {
        confirmButton: "px-6 py-3 text-lg",
        cancelButton: "px-6 py-3 text-lg",
      },
    });

    if (!result.isConfirmed) return;

    // Loading state
    Swal.fire({
      title: "Deleting club...",
      text: "Please wait",
      icon: "info",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const token = await user.getIdToken();

      await axios.delete(`https://club-sphere-server-six.vercel.app/clubs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Success message
      Swal.fire({
        title: "Deleted!",
        text: "The club has been deleted successfully.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      // Optimistic UI update
      queryClient.setQueryData(["myclubs", user?.email], (oldData) => {
        if (!oldData) return [];
        return oldData.filter((club) => club._id !== id);
      });
    } catch (error) {
      console.error("Delete error:", error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to delete club. Please try again.";

      Swal.fire({
        title: "Error!",
        text: message,
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#d33",
      });
    }
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
                  <p>Location: {club.location}</p>
                  <p>Category: {club.category}</p>
                  <p>Membership Fee: ${club.membershipFee}</p>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => handleEditClick(club._id)}
                    className="flex-1 py-2 rounded-xl bg-amber-400 text-black font-medium hover:bg-amber-500 shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDeleteClick(club._id)}
                    className="flex-1 py-2 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 shadow-md hover:shadow-lg transition-all duration-300"
                  >
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

