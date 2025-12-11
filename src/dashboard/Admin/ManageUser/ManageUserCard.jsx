import React from "react";

const ManageUserCard = () => {
  return (
    
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500">
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Joined</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* {users.map((u) => ( */}
              <tr  className="border-t">
                <td className="p-2">salim</td>
                <td className="p-2">salim@gmail.com</td>
                <td className="p-2 capitalize">member</td>
                <td className="p-2">10:20</td>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    {/* {u.role !== "admin" && ( */}
                      <button
                        // onClick={() => handleRoleChange(u.id, "admin")}
                        className="px-3 py-1 bg-blue-600 text-white rounded text-xs"
                      >
                        Make Admin
                      </button>
                    {/* )} */}
                    {/* {u.role !== "clubManager" && ( */}
                      <button
                        // onClick={() => handleRoleChange(u.id, "clubManager")}
                        className="px-3 py-1 bg-green-600 text-white rounded text-xs"
                      >
                        Make Manager
                      </button>
                    {/* )} */}
                    {/* {u.role !== "member" && ( */}
                      <button
                        // onClick={() => handleRoleChange(u.id, "member")}
                        className="px-3 py-1 bg-gray-600 text-white rounded text-xs"
                      >
                        Make Member
                      </button>
                    {/* )} */}
                  </div>
                </td>
              </tr>
            {/* ))} */}
          </tbody>
        </table>

  );
};

export default ManageUserCard;
