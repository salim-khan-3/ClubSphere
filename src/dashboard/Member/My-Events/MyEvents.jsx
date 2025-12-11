import React from "react";
import { Link } from "react-router";

const MyEvents = () => {
  // Dummy data (later replace with API data)
  const registeredEvents = [
    {
      id: 1,
      title: "Chess Tournament",
      club: "Chess Club",
      date: "2025-12-20",
      status: "Registered",
    },
    {
      id: 2,
      title: "Art Workshop",
      club: "Art Club",
      date: "2025-11-15",
      status: "Registered",
    },
  ];

  return (
    <section className="p-6">
      <h2 className="text-2xl font-semibold mb-4">My Events</h2>

      {registeredEvents.length === 0 ? (
        <div className="bg-white shadow p-6 rounded-xl text-center">
          <p className="text-gray-600 mb-3">You haven’t registered for any events.</p>
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
              {registeredEvents.map((event) => (
                <tr
                  key={event.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 font-medium">{event.title}</td>
                  <td className="py-3 px-4">{event.club}</td>
                  <td className="py-3 px-4">{event.date}</td>
                  <td>
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
