import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import SummaryCards from "./SummaryCards";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const AdminOverview = () => {
  const { user } = useContext(AuthContext);

  const { data: stats = {}, isLoading, isError, error } = useQuery({
    queryKey: ["adminOverview"],
    queryFn: async () => {
      const res = await axiosInstance.get("/admin/overview-stats");
      return res.data;
    },
  });
  console.log(stats);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Overview</h1>
        {user && (
          <div className="flex items-center space-x-3">
            <span className="font-medium">{user.name}</span>
            <img
              src={user.photoURL || "https://i.pravatar.cc/40"}
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        )}
      </div>

      {/* Summary Cards */}
      <SummaryCards stats={stats} />
    </div>
  );
};

export default AdminOverview;
