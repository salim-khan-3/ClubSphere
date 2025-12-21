import React, { useContext } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import Loader from "../../../Components/Loader/Loader";

const MyEvents = () => {
  const { user } = useContext(AuthContext);

  const {
    data: myEvents = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-events", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const token = await user.getIdToken();

      const res = await axios.get(
        "http://localhost:3000/dashboard/member/my-events",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError)
    return <p className="text-red-500">Failed to load events</p>;

  return (
    <section className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Events</h2>

      {myEvents.length === 0 ? (
        <div className="bg-white shadow p-6 rounded-xl text-center">
          <p className="text-gray-600 mb-3">
            You haven’t registered for any events.
          </p>
          <Link
            to="/events"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Browse Events
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="py-3 px-4">Event Title</th>
                <th className="py-3 px-4">Club</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {myEvents.map((event) => (
                <tr
                  key={event._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 font-medium">
                    {event.eventInfo.title}
                  </td>
                  <td className="py-3 px-4">
                    {event.eventInfo.clubName}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(event.eventInfo.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="py-1 px-3 bg-green-100 text-green-700 text-xs rounded-full">
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default MyEvents;
