import React, { useState } from "react";

const EventRegistrations = () => {
  const [registrations] = useState([
    {
      id: 1,
      userEmail: "user1@example.com",
      status: "registered",
      registeredAt: "2025-01-01T10:30:00Z",
    },
    {
      id: 2,
      userEmail: "user2@example.com",
      status: "cancelled",
      registeredAt: "2025-01-02T14:10:00Z",
    },
  ]);
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Event Registrations</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">#</th>
              <th className="py-2 px-4 border-b text-left">User Email</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Registered At</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg, index) => (
              <tr key={reg.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{reg.userEmail}</td>
                <td
                  className={`py-2 px-4 border-b font-medium ${
                    reg.status === "cancelled"
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {reg.status}
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(reg.registeredAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventRegistrations;
