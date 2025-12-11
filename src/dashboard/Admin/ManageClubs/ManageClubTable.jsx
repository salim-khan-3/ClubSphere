import React from 'react';
import { Eye, Check, X } from 'lucide-react';
const ManageClubTable = () => {
   const clubs = [
    {
      name: "Photography Club",
      managerEmail: "karim@example.com",
      fee: "$10",
      status: "Approved",
      created: "2025-02-10",
      isPending: false,
    },
    {
      name: "Hikers United",
      managerEmail: "hiker@example.com",
      fee: "Free",
      status: "Pending",
      created: "2025-10-01",
      isPending: true,
    },
    {
      name: "Techies",
      managerEmail: "techie@example.com",
      fee: "$15",
      status: "Approved",
      created: "2025-03-12",
      isPending: false,
    },
  ];

  return (
    <>
      <div className=" ">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">All Clubs</h2>
          </div>

          {/* Table */}
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
                    Created
                  </th>
                  <th className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {clubs.map((club, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-6 text-sm font-medium text-gray-900">
                      {club.name}
                    </td>
                    <td className="px-4 py-6 text-sm text-gray-600">
                      {club.managerEmail}
                    </td>
                    <td className="px-4 py-6 text-sm text-gray-900 font-medium">
                      {club.fee}
                    </td>
                    <td className="px-4 py-6">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${
                          club.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {club.status}
                      </span>
                    </td>
                    <td className="px-4 py-6 text-sm text-gray-600">
                      {club.created}
                    </td>
                    <td className="px-4 py-6">
                      <div className="flex items-center gap-2">
                        {club.isPending ? (
                          <>
                            <button className="flex items-center gap-1 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition shadow-sm">
                              <Check size={16} />
                              Approve
                            </button>
                            <button className="flex items-center gap-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition shadow-sm">
                              <X size={16} />
                              Reject
                            </button>
                          </>
                        ) : null}
                        <button className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-300 transition">
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
    </>
  );
};

export default ManageClubTable;