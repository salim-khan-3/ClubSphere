import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";


const fetchMemberOverview = async (token) => {
  if (!token) throw new Error("No token provided");
  const { data } = await axios.get("https://club-sphere-server-six.vercel.app/member-overview", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};


const MemberOverview = () => {
  const { user } = useContext(AuthContext); // Firebase user
  const token = user?.stsTokenManager?.accessToken; // Firebase accessToken

  console.log("User:", user);
  console.log("Token:", token);

  // React Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["memberOverview"],
    queryFn: () => fetchMemberOverview(token),
    enabled: !!token, 
    staleTime: 1000 * 60 * 5, 
  });

  
  if (!user) return <p>Loading user...</p>;

  // Loading / Error check
  if (isLoading) return <p>Loading data...</p>;
  if (isError || !data) return <p>Failed to load data</p>;

  
  const { totalClubs = 0, totalEvents = 0, upcomingEvents = [] } = data;

  return (
    <section className="p-6">
      <h2 className="text-xl font-semibold mb-4">Member Overview</h2>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow p-4 rounded-md">
          <p className="text-gray-500">Total Clubs Joined</p>
          <p className="text-2xl font-bold">{totalClubs}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-md">
          <p className="text-gray-500">Total Events Registered</p>
          <p className="text-2xl font-bold">{totalEvents}</p>
        </div>
      </div>

      {/* Upcoming Events */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Upcoming Events</h3>
        {upcomingEvents.length === 0 ? (
          <p>No upcoming events</p>
        ) : (
          <ul className="space-y-2">
            {upcomingEvents.map((event) => (
              <li
                key={event._id || event.id}
                className="bg-white shadow p-3 rounded-md flex justify-between"
              >
                <span>{event.title}</span>
                <span>{new Date(event.date).toLocaleDateString()}</span>
                <span>{event.clubName}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default MemberOverview;
