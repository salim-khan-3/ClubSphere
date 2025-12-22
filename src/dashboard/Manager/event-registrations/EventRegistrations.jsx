// import React, { useContext } from "react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { AuthContext } from "../../../Context/AuthContext";

// const EventsRegistration = () => {
//   const { user, loading } = useContext(AuthContext);

//   const { data: registrations = [], isLoading } = useQuery({
//     queryKey: ["my-event-registrations", user?.email],
//     enabled: !loading && !!user?.email,
//     queryFn: async () => {
//       const token = await user.getIdToken(); // 🔥 Firebase token

//       const res = await axios.get(
//         "http://localhost:3000/my-event-registrations",
//         {
//           headers: {
//             authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       return res.data;
//     },
//   });

//   if (loading || isLoading) {
//     return <p className="text-center mt-10">Loading...</p>;
//   }

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-5xl mx-auto">
//       <h2 className="text-2xl font-semibold mb-4">
//         My Event Registrations
//       </h2>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border border-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="py-2 px-4 border">#</th>
//               <th className="py-2 px-4 border text-left">Event Title</th>
//               <th className="py-2 px-4 border text-left">Club</th>
//               <th className="py-2 px-4 border text-left">Date</th>
//               <th className="py-2 px-4 border text-left">Location</th>
//               <th className="py-2 px-4 border text-left">Status</th>
//               <th className="py-2 px-4 border text-left">Registered At</th>
//             </tr>
//           </thead>

//           <tbody>
//             {registrations.map((reg, index) => (
//               <tr key={reg._id} className="hover:bg-gray-50">
//                 <td className="py-2 px-4 border">{index + 1}</td>
//                 <td className="py-2 px-4 border">
//                   {reg.eventInfo.title}
//                 </td>
//                 <td className="py-2 px-4 border">
//                   {reg.eventInfo.clubName}
//                 </td>
//                 <td className="py-2 px-4 border">
//                   {new Date(reg.eventInfo.date).toLocaleDateString()}
//                 </td>
//                 <td className="py-2 px-4 border">
//                   {reg.eventInfo.location}
//                 </td>
//                 <td
//                   className={`py-2 px-4 border font-medium ${
//                     reg.status === "cancelled"
//                       ? "text-red-500"
//                       : "text-green-600"
//                   }`}
//                 >
//                   {reg.status}
//                 </td>
//                 <td className="py-2 px-4 border">
//                   {new Date(reg.registeredAt).toLocaleString()}
//                 </td>
//               </tr>
//             ))}

//             {registrations.length === 0 && (
//               <tr>
//                 <td
//                   colSpan="7"
//                   className="text-center py-6 text-gray-500"
//                 >
//                   You have not registered for any events yet.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default EventsRegistration;



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





// import React, { useState, useEffect } from "react";
// import { auth } from "../../../firebase/firebase.init"; 

// const EventRegistrations = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // Events ফেচ করা (manager/admin এর জন্য)
//   const fetchEvents = async () => {
//     try {
//       const user = auth.currentUser;
//       if (!user) {
//         setError("You must be logged in.");
//         setLoading(false);
//         return;
//       }

//       const token = await user.getIdToken();

//       const response = await fetch("/manager/events", {
//         // অথবা "/events" যদি admin হয়
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error("Failed to fetch events");
//       }

//       const data = await response.json();
//       setEvents(data);
//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError(err.message || "Failed to load events");
//       setLoading(false);
//     }
//   };

//   // Event ডিলিট ফাংশন
//   const deleteEvent = async (eventId) => {
//     if (!confirm("Are you sure you want to delete this event? All registrations and payments will also be deleted. This cannot be undone.")) {
//       return;
//     }

//     try {
//       const user = auth.currentUser;
//       if (!user) {
//         alert("You must be logged in.");
//         return;
//       }

//       const token = await user.getIdToken();

//       const response = await fetch(`/events/${eventId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Event deleted successfully!");
//         // List থেকে remove করো
//         setEvents(events.filter((event) => event._id !== eventId));
//       } else {
//         alert(data.message || "Failed to delete event");
//       }
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("Something went wrong. Please try again.");
//     }
//   };

//   // Component mount হলে events লোড করো
//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   if (loading) {
//     return <div className="p-6 text-center">Loading events...</div>;
//   }

//   if (error) {
//     return <div className="p-6 text-center text-red-600">{error}</div>;
//   }

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-6xl mx-auto">
//       <h2 className="text-3xl font-bold mb-6 text-gray-800">My Events</h2>

//       {events.length === 0 ? (
//         <p className="text-center text-gray-600">No events found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border border-gray-200">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-3 px-4 border-b text-left">#</th>
//                 <th className="py-3 px-4 border-b text-left">Event Title</th>
//                 <th className="py-3 px-4 border-b text-left">Date</th>
//                 <th className="py-3 px-4 border-b text-left">Location</th>
//                 <th className="py-3 px-4 border-b text-left">Fee</th>
//                 <th className="py-3 px-4 border-b text-left">Registrations</th>
//                 <th className="py-3 px-4 border-b text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {events.map((event, index) => (
//                 <tr key={event._id} className="hover:bg-gray-50">
//                   <td className="py-3 px-4 border-b">{index + 1}</td>
//                   <td className="py-3 px-4 border-b font-medium">{event.title}</td>
//                   <td className="py-3 px-4 border-b">
//                     {new Date(event.date).toLocaleDateString()}
//                   </td>
//                   <td className="py-3 px-4 border-b">{event.location}</td>
//                   <td className="py-3 px-4 border-b">
//                     {event.isPaid ? `$${event.eventFee}` : "Free"}
//                   </td>
//                   <td className="py-3 px-4 border-b text-center">
//                     {event.registrationCount || 0} {/* যদি backend থেকে না আসে */}
//                   </td>
//                   <td className="py-3 px-4 border-b text-center">
//                     <button
//                       onClick={() => deleteEvent(event._id)}
//                       className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventRegistrations;