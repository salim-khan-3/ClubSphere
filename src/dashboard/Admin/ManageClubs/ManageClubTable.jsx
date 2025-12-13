import React from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Eye, Check, X } from "lucide-react";
import Loader from "../../../Components/Loader/Loader";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const ManageClubTable = () => {
  const queryClient = useQueryClient();

  // FETCH clubs (all)
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/clubs/all");
      return res.data;
    },
  });

  // APPROVE mutation
  const approveMutation = useMutation({
    mutationFn: async (id) => {
      return axiosInstance.patch(`/clubs/approve/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["clubs"]);
    },
  });

  // REJECT mutation
  const rejectMutation = useMutation({
    mutationFn: async (id) => {
      return axiosInstance.patch(`/clubs/reject/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["clubs"]);
    },
  });

  if (isLoading) return <Loader></Loader>;

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">All Clubs</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Club Name
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Manager Email
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Fee
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {clubs.map((club) => (
                <tr key={club._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-6">{club.clubName}</td>
                  <td className="px-4 py-6 text-gray-600">
                    {club.managerEmail}
                  </td>
                  <td className="px-4 py-6 font-medium">
                    ${club.membershipFee}
                  </td>

                  <td className="px-4 py-6">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        club.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : club.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {club.status}
                    </span>
                  </td>

                  <td className="px-4 py-6">
                    <div className="flex items-center gap-2">
                      {club.status === "pending" && (
                        <>
                          <button
                            onClick={() => approveMutation.mutate(club._id)}
                            className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                            disabled={approveMutation.isPending}
                          >
                            <Check size={16} />
                            Approve
                          </button>

                          <button
                            onClick={() => rejectMutation.mutate(club._id)}
                            className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                            disabled={rejectMutation.isPending}
                          >
                            <X size={16} />
                            Reject
                          </button>
                        </>
                      )}

                      <button className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-300">
                        <Eye size={16} />
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageClubTable;
