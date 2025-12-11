import React from "react";

const ClubMembers = () => {
  const clubs = [
    {
      id: 1,
      name: "Fitness Club",
      members: [
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          status: "Active",
          joinDate: "2025-01-15",
        },
        {
          id: 2,
          name: "Jane Smith",
          email: "jane@example.com",
          status: "Active",
          joinDate: "2025-02-10",
        },
      ],
    },
    {
      id: 2,
      name: "Book Lovers",
      members: [
        {
          id: 3,
          name: "Alice Brown",
          email: "alice@example.com",
          status: "Active",
          joinDate: "2025-03-05",
        },
      ],
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-6">Club Members</h2>

      {clubs.map((club) => (
        <div key={club.id} className="mb-8">
          <h3 className="text-xl font-semibold mb-4">{club.name}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border rounded-lg">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left px-4 py-2 border-b">Name</th>
                  <th className="text-left px-4 py-2 border-b">Email</th>
                  <th className="text-left px-4 py-2 border-b">
                    Membership Status
                  </th>
                  <th className="text-left px-4 py-2 border-b">Join Date</th>
                  <th className="text-left px-4 py-2 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {club.members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{member.name}</td>
                    <td className="px-4 py-2 border-b">{member.email}</td>
                    <td className="px-4 py-2 border-b">{member.status}</td>
                    <td className="px-4 py-2 border-b">{member.joinDate}</td>
                    <td className="px-4 py-2 border-b">
                      <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                        Set Expired
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClubMembers;
