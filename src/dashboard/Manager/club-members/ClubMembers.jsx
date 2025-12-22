import React, { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Loader from "../../../Components/Loader/Loader";
import Swal from "sweetalert2";

const ClubMembers = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // ১. মেম্বারদের ডাটা ফেচ করা
  const {
    data: clubsWithMembers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["clubMembers", user?.email],
    queryFn: async () => {
      const token = await user.getIdToken();
      const res = await axios.get("https://club-sphere-server-six.vercel.app/manager/club-members", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ২. মেম্বারশিপ Expired করার মিউটেশন
  const mutation = useMutation({
    mutationFn: async ({ clubId, userEmail }) => {
      const token = await user.getIdToken();
      await axios.patch(
        "https://club-sphere-server-six.vercel.app/manager/set-membership-expired",
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
        timer: 1500,
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
      title: "Are you sure?",
      text: `Do you want to expire ${memberName}'s membership? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Expire it!",
    });

    if (result.isConfirmed) {
      mutation.mutate({ clubId, userEmail });
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <div className="text-center text-red-600 py-10">Error: {error?.message}</div>;

  return (
    <div className="w-full max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-10 text-gray-800">Manage Club Members</h2>

      {clubsWithMembers.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <p className="text-gray-500">You don't have any clubs with members yet.</p>
        </div>
      ) : (
        clubsWithMembers.map((club) => (
          <div key={club.clubId} className="mb-10 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-indigo-600 px-6 py-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                {club.clubName} <span className="text-indigo-200 text-sm ml-2">({club.members.length} Members)</span>
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Member</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Join Date</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {club.members.map((member) => (
                    <tr key={member.email} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img className="h-10 w-10 rounded-full border-2 border-indigo-100" src={member.photoURL || "https://i.ibb.co/mR79Y6B/user.png"} alt="" />
                          <div className="ml-4">
                            <div className="text-sm font-bold text-gray-900">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          member.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(member.joinedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleSetExpired(club.clubId, member.email, member.name)}
                          disabled={mutation.isPending || member.status === "Expired"}
                          className={`px-4 py-2 rounded-lg font-medium transition-all ${
                            member.status === "Expired" 
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                            : "bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-200"
                          }`}
                        >
                          {member.status === "Expired" ? "Terminated" : "Set Expired"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {club.members.length === 0 && (
                <div className="p-8 text-center text-gray-400 italic">No members found in this club.</div>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ClubMembers;