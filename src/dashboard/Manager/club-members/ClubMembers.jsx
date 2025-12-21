import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../../Components/Loader/Loader";
import Swal from "sweetalert2";

const ClubMembers = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Fetch club members
  const {
    data: clubsWithMembers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["clubMembers", user?.email],
    queryFn: async () => {
      const token = await user.getIdToken();
      const res = await axios.get("http://localhost:3000/manager/club-members", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Mutation for setting membership expired
  const mutation = useMutation({
    mutationFn: async ({ clubId, userEmail }) => {
      const token = await user.getIdToken();
      await axios.patch(
        "http://localhost:3000/manager/set-membership-expired",
        { clubId, userEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["clubMembers", user?.email]);
      Swal.fire({
        title: "Success!",
        text: "Membership has been set to expired.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    },
    onError: (error) => {
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to update membership",
        icon: "error",
      });
    },
  });

  const handleSetExpired = async (clubId, userEmail, memberName) => {
    const result = await Swal.fire({
      title: "Set Membership Expired?",
      text: `Are you sure you want to expire ${memberName}'s membership?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, expire it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      mutation.mutate({ clubId, userEmail });
    }
  };

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center text-red-600 py-10">
        Error: {error?.message || "Failed to load members"}
      </div>
    );

  if (clubsWithMembers.length === 0) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 text-center">
        <h2 className="text-2xl font-semibold mb-6">Club Members</h2>
        <p className="text-gray-500">You don't have any clubs with members yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-8">Club Members</h2>

      {clubsWithMembers.map((club) => (
        <div key={club.clubId} className="mb-12">
          <h3 className="text-xl font-bold mb-4 text-indigo-700">
            {club.clubName} ({club.members.length} members)
          </h3>

          {club.members.length === 0 ? (
            <p className="text-gray-500 italic">No members yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white rounded-lg shadow">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-6 py-3">Photo</th>
                    <th className="text-left px-6 py-3">Name</th>
                    <th className="text-left px-6 py-3">Email</th>
                    <th className="text-left px-6 py-3">Status</th>
                    <th className="text-left px-6 py-3">Join Date</th>
                    <th className="text-left px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {club.members.map((member) => (
                    <tr key={member.email} className="hover:bg-gray-50 border-b">
                      <td className="px-6 py-4">
                        <img
                          src={member.photoURL || "https://via.placeholder.com/40"}
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 font-medium">{member.name}</td>
                      <td className="px-6 py-4">{member.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(member.joinedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() =>
                            handleSetExpired(club.clubId, member.email, member.name)
                          }
                          disabled={mutation.isPending}
                          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 transition"
                        >
                          {mutation.isPending ? "Processing..." : "Set Expired"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ClubMembers;