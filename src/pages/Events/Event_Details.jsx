// import React, { useState, useContext } from "react";
// import { useParams, useNavigate } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Elements } from "@stripe/react-stripe-js";
// import { stripePromise } from "../../Stripe/Stripe";
// import CheckoutForm from "../../Stripe/CheckOutForm/CheckOutForm";
// import { AuthContext } from "../../Context/AuthContext";
// import { toast } from "react-hot-toast";

// const axiosInstance = axios.create({ baseURL: "http://localhost:3000" });

// const Event_Details = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { token } = useContext(AuthContext);
//   const [showPayment, setShowPayment] = useState(false);

//   const {
//     data: event,
//     isLoading,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["event", id],
//     queryFn: async () => {
//       const res = await axiosInstance.get(`/events/${id}`);
//       return res.data;
//     },
//   });

//   const handleFreeRegister = async () => {
//     try {
//       await axios.post(
//         "/register-event",
//         {
//           eventId: event._id,
//           paymentId: null,
//           amount: 0,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success("🎉 Successfully registered for the event (Free)!");
//       refetch();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Registration failed");
//     }
//   };

//   if (isLoading) return <p className="text-center mt-10">Loading...</p>;
//   if (error) return <p className="text-center mt-10">Error loading event.</p>;

//   const isPaid = event.isPaid && event.eventFee > 0;

//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-xl my-10 border border-gray-100">
//       {/* Back Button */}
//       <button
//         onClick={() => navigate(-1)}
//         className="mb-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800"
//       >
//         ← Go Back
//       </button>

//       <h1 className="text-4xl font-bold text-indigo-700 mb-4">{event.title}</h1>

//       {/* Details Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         <div>
//           <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
//         </div>
//         <div>
//           <strong>Location:</strong> {event.location}
//         </div>
//         <div>
//           <strong>Organized by:</strong> {event.clubName}
//         </div>
//         <div>
//           <strong>Max Attendees:</strong> {event.maxAttendees || "Unlimited"}
//         </div>
//         <div>
//           <strong>Type:</strong> {isPaid ? "Paid Event" : "Free Event"}
//         </div>
//         <div>
//           <strong>Fee:</strong> {isPaid ? `$${event.eventFee}` : "Free"}
//         </div>
//       </div>

//       <div className="mb-8">
//         <strong>Description:</strong>
//         <p className="mt-2 text-gray-700">{event.description}</p>
//       </div>

//       {/* Register Section */}
//       {!showPayment && (
//         <div className="mt-10">
//           {isPaid ? (
//             <button
//               onClick={() => setShowPayment(true)}
//               className="w-full py-4 bg-indigo-600 text-white text-xl font-bold rounded-xl hover:bg-indigo-700"
//             >
//               Register Now - Pay ${event.eventFee}
//             </button>
//           ) : (
//             <button
//               onClick={handleFreeRegister}
//               className="w-full py-4 bg-green-600 text-white text-xl font-bold rounded-xl hover:bg-green-700"
//             >
//               Register for Free
//             </button>
//           )}
//         </div>
//       )}

//       {/* Stripe Payment for Paid Events */}
//       {showPayment && isPaid && (
//         <Elements stripe={stripePromise}>
//           <CheckoutForm
//             event={event}
//             onSuccess={() => {
//               toast.success("Registration complete!");
//               refetch();
//             }}
//           />
//         </Elements>
//       )}
//     </div>
//   );
// };

// export default Event_Details;












import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../Stripe/Stripe";
import CheckoutForm from "../../Stripe/CheckOutForm/CheckOutForm";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const Event_Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [showPayment, setShowPayment] = useState(false);

  const {
    data: event,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/events/${id}`);
      return res.data;
    },
  });

  // ✅ FIXED FREE REGISTRATION
  const handleFreeRegister = async () => {
    try {
      const token = await user.getIdToken();

      await axiosInstance.post(
        "/register-event",
        {
          eventId: event._id,
          paymentId: null,
          amount: 0,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("🎉 Successfully registered for the event!");
      refetch();
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed"
      );
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10">Error loading event.</p>;

  const isPaid = event.isPaid && event.eventFee > 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-xl my-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-600 hover:text-gray-800"
      >
        ← Go Back
      </button>

      <h1 className="text-4xl font-bold text-indigo-700 mb-4">
        {event.title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</div>
        <div><strong>Location:</strong> {event.location}</div>
        <div><strong>Organized by:</strong> {event.clubName}</div>
        <div><strong>Type:</strong> {isPaid ? "Paid Event" : "Free Event"}</div>
        <div><strong>Fee:</strong> {isPaid ? `৳${event.eventFee}` : "Free"}</div>
      </div>

      {!showPayment && (
        <div className="mt-10">
          {isPaid ? (
            <button
              onClick={() => setShowPayment(true)}
              className="w-full py-4 bg-indigo-600 text-white rounded-xl"
            >
              Register Now - Pay ৳{event.eventFee}
            </button>
          ) : (
            <button
              onClick={handleFreeRegister}
              className="w-full py-4 bg-green-600 text-white rounded-xl"
            >
              Register for Free
            </button>
          )}
        </div>
      )}

      {showPayment && isPaid && (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            event={event}
            onSuccess={() => {
              toast.success("Registration complete!");
              refetch();
            }}
          />
        </Elements>
      )}
    </div>
  );
};

export default Event_Details;













// this is main
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import React from "react";
// import { Navigate, useNavigate, useParams } from "react-router";

// const formatDateTime = (isoString) => {
//   if (!isoString) return "N/A";
//   try {
//     const date = new Date(isoString);
//     if (isNaN(date)) return "Invalid Date";

//     const options = {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     };

//     return date.toLocaleString("en-US", options);
//   } catch (e) {
//     console.log(e);
//     return "Error Formatting Date";
//   }
// };

// const axiosInstance = axios.create({ baseURL: "http://localhost:3000" });

// const Event_Details = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const {
//     data: events_details,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["events_details", id],
//     queryFn: async () => {
//       const res = await axiosInstance.get(`/events/${id}`);
//       return res.data;
//     },
//   });

//   console.log(events_details);

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading club.</p>;
//   return (
//     <div className="max-w-4xl mx-auto p-6  bg-white shadow-2xl rounded-xl my-10 border border-gray-100">
//       {/* Action Buttons Section */}
//       <div className="flex justify-between items-center mb-6 border-b pb-4">
//         {/* Go Back Button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center space-x-2 px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out shadow-md"
//         >
//           <svg
//             className="w-5 h-5"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="2"
//               d="M10 19l-7-7m0 0l7-7m-7 7h18"
//             ></path>
//           </svg>
//           <span>Go Back</span>
//         </button>

//         {/* Register Button */}
//         <button
//           onClick={() => alert(`Registering for: ${events_details.title}`)}
//           className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
//         >
//           Register Now!
//         </button>
//       </div>

//       {/* Header Section */}
//       <h1 className="text-3xl font-extrabold text-blue-800 mb-2 pb-2">
//         ⚽ Event Details
//       </h1>
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//         {events_details.title}
//       </h2>

//       {/* Main Details Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-8">
//         {/* Date & Time */}
//         <div>
//           <p className="text-sm font-medium text-gray-500">Date & Time</p>
//           <p className="text-lg font-medium text-gray-900">
//             {formatDateTime(events_details.date)}
//           </p>
//         </div>

//         {/* Location */}
//         <div>
//           <p className="text-sm font-medium text-gray-500">Location</p>
//           <p className="text-lg font-medium text-gray-900">
//             {events_details.location}
//           </p>
//         </div>

//         {/* Club Name */}
//         <div>
//           <p className="text-sm font-medium text-gray-500">Organized By</p>
//           <p className="text-lg font-medium text-blue-700">
//             {events_details.clubName}
//           </p>
//         </div>

//         {/* Attendance */}
//         <div>
//           <p className="text-sm font-medium text-gray-500">Max Attendees</p>
//           <p className="text-lg font-medium text-gray-900">
//             {events_details.maxAttendees?.toLocaleString() || "N/A"}
//           </p>
//         </div>

//         {/* Fee Status */}
//         <div
//           className={events_details.isPaid ? "text-green-700" : "text-red-700"}
//         >
//           <p className="text-sm font-medium text-gray-500">Fee Status</p>
//           <p className="text-lg font-bold">
//             {events_details.isPaid ? "Paid Event" : "Free Event"}
//           </p>
//         </div>

//         {/* Event Fee */}
//         <div>
//           <p className="text-sm font-medium text-gray-500">Event Fee</p>
//           <p className="text-lg font-bold text-green-600">
//             {events_details.isPaid ? `$${events_details.eventFee}` : "N/A"}
//           </p>
//         </div>
//       </div>

//       {/* Description Section */}
//       <div className="mb-8 p-4 bg-gray-50 rounded-lg border">
//         <h3 className="text-xl font-semibold text-gray-700 mb-2">
//           Description
//         </h3>
//         <p className="text-gray-600 italic">"{events_details.description}"</p>
//       </div>

//       {/* Technical Information (Footer) */}
//       <div className="pt-4 border-t text-xs text-gray-400">
//         <p>
//           <span className="font-semibold">Event ID:</span>{" "}
//           {events_details._id?.replace("ObjectId('", "")?.replace("')", "") ||
//             "N/A"}
//         </p>
//         <p>
//           <span className="font-semibold">Club ID:</span>{" "}
//           {events_details.clubId || "N/A"}
//         </p>
//         <p>
//           <span className="font-semibold">Created At:</span>{" "}
//           {formatDateTime(events_details.createdAt)}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Event_Details;
