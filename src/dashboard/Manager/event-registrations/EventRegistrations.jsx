import React, { useState, useEffect } from "react";
import axios from "axios";

const EventsRegistration = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        // ব্যাকেন্ডে আমরা যে নতুন এগ্রিগেশন রাউটটি তৈরি করেছি সেটি কল করা হচ্ছে
        const res = await axios.get("https://club-sphere-server-six.vercel.app/event-registrations");
        setRegistrations(res.data);
      } catch (err) {
        console.error("Error fetching registrations:", err);
        setError("ডেটা লোড করতে সমস্যা হচ্ছে। দয়া করে পরে চেষ্টা করুন।");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Event Registrations</h2>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          Total: {registrations.length}
        </span>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 border-b text-left text-xs font-semibold text-gray-600 uppercase">#</th>
              <th className="py-3 px-4 border-b text-left text-xs font-semibold text-gray-600 uppercase">User Email</th>
              <th className="py-3 px-4 border-b text-left text-xs font-semibold text-gray-600 uppercase">Event Name</th>
              <th className="py-3 px-4 border-b text-left text-xs font-semibold text-gray-600 uppercase text-center">Status</th>
              <th className="py-3 px-4 border-b text-left text-xs font-semibold text-gray-600 uppercase text-right">Registered At</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {registrations.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-500">
                  কোনো রেজিস্ট্রেশন পাওয়া যায়নি।
                </td>
              </tr>
            ) : (
              registrations.map((reg, index) => (
                <tr key={reg._id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-4 text-sm text-gray-500">{index + 1}</td>
                  <td className="py-4 px-4 text-sm font-medium text-gray-800">{reg.userEmail}</td>
                  {/* এখানে ব্যাকেন্ড থেকে আসা eventTitle দেখানো হচ্ছে */}
                  <td className="py-4 px-4 text-sm text-blue-600 font-semibold">
                    {reg.eventTitle}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      reg.status === 'registered' 
                      ? 'bg-yellow-100 text-yellow-700' 
                      : 'bg-green-100 text-green-700'
                    }`}>
                      {reg.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-500 text-right">
                    <div className="font-medium text-gray-700">
                      {new Date(reg.registeredAt).toLocaleDateString('en-GB')}
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(reg.registeredAt).toLocaleTimeString()}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsRegistration;


// import React, { useState } from "react";

// const EventRegistrations = () => {
//   const [registrations] = useState([
//     {
//       id: 1,
//       userEmail: "user1@example.com",
//       status: "registered",
//       registeredAt: "2025-01-01T10:30:00Z",
//     },
//     {
//       id: 2,
//       userEmail: "user2@example.com",
//       status: "cancelled",
//       registeredAt: "2025-01-02T14:10:00Z",
//     },
//   ]);
//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">Event Registrations</h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-2 px-4 border-b">#</th>
//               <th className="py-2 px-4 border-b text-left">User Email</th>
//               <th className="py-2 px-4 border-b text-left">Status</th>
//               <th className="py-2 px-4 border-b text-left">Registered At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {registrations.map((reg, index) => (
//               <tr key={reg.id} className="hover:bg-gray-50">
//                 <td className="py-2 px-4 border-b">{index + 1}</td>
//                 <td className="py-2 px-4 border-b">{reg.userEmail}</td>
//                 <td
//                   className={`py-2 px-4 border-b font-medium ${
//                     reg.status === "cancelled"
//                       ? "text-red-500"
//                       : "text-green-600"
//                   }`}
//                 >
//                   {reg.status}
//                 </td>
//                 <td className="py-2 px-4 border-b">
//                   {new Date(reg.registeredAt).toLocaleString()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EventRegistrations;



