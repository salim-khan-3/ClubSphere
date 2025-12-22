import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { auth } from "../../../firebase/firebase.init"; // <--- তোমার সঠিক পাথ দিয়ে চেঞ্জ করো
// উদাহরণ: import { auth } from "@/firebase/firebase.init";
// বা import { auth } from "../../firebase/firebase.init";

import Loader from "../../../Components/Loader/Loader";
import toast from "react-hot-toast"; // npm i react-hot-toast করো যদি না থাকে

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const API_URL = import.meta.env.VITE_API_URL || "https://club-sphere-server-six.vercel.app";

const ManageUsersTable = () => {
  const queryClient = useQueryClient();
  const currentUserEmail = auth.currentUser?.email?.toLowerCase();

  // Fetch all users
  const fetchUsers = async () => {
    if (!auth.currentUser) {
      throw new Error("You are not logged in. Please login again.");
    }

    const token = await auth.currentUser.getIdToken();

    const res = await fetch(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to load users");
    }

    return res.json();
  };

  // Update user role
  const updateUserRole = async ({ email, role }) => {
    if (!auth.currentUser) {
      throw new Error("You are not logged in.");
    }

    // Prevent current admin from demoting themselves
    if (email.toLowerCase() === currentUserEmail && role !== "admin") {
      throw new Error("You cannot remove your own admin privileges!");
    }

    const token = await auth.currentUser.getIdToken();

    const res = await fetch(`${API_URL}/users/role/${email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to update role");
    }

    return res.json();
  };

  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin-users"],
    queryFn: fetchUsers,
    staleTime: 1000 * 60, // 1 minute cache
  });

  const mutation = useMutation({
    mutationFn: updateUserRole,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success(`${variables.email} is now ${variables.role}!`);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  if (isLoading) return <Loader />;

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 text-xl mb-4">Error: {error.message}</p>
        <button
          onClick={() => queryClient.refetchQueries(["admin-users"])}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Manage Users</h2>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => {
              const isCurrentUser = user.email.toLowerCase() === currentUserEmail;

              return (
                <tr key={user._id} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-medium">{user.name || "N/A"}</td>
                  <td className="px-6 py-4 text-gray-700">{user.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-4 py-1.5 text-xs font-semibold rounded-full capitalize ${
                        user.role === "admin"
                          ? "bg-purple-100 text-purple-800"
                          : user.role === "clubManager"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={() => mutation.mutate({ email: user.email, role: "admin" })}
                        disabled={mutation.isPending || user.role === "admin"}
                        className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                      >
                        {mutation.isPending ? "..." : "Make Admin"}
                      </button>

                      <button
                        onClick={() => mutation.mutate({ email: user.email, role: "clubManager" })}
                        disabled={mutation.isPending || user.role === "clubManager"}
                        className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                      >
                        {mutation.isPending ? "..." : "Make Manager"}
                      </button>

                      <button
                        onClick={() => mutation.mutate({ email: user.email, role: "member" })}
                        disabled={
                          mutation.isPending ||
                          user.role === "member" ||
                          (isCurrentUser && user.role === "admin")
                        }
                        className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                      >
                        {mutation.isPending ? "..." : "Make Member"}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsersTable;






