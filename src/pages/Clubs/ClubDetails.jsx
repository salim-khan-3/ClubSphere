
// import React, { useState, useContext } from "react";
// import { useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Elements } from "@stripe/react-stripe-js";
// import { stripePromise } from "../../Stripe/Stripe";
// import CheckoutForm from "../../Stripe/CheckOutForm/CheckOutForm";
// import { AuthContext } from "../../Context/AuthContext";
// import { toast } from "react-hot-toast";

// const axiosInstance = axios.create({ baseURL: "http://localhost:3000" });

// const ClubDetailsPage = () => {
//   const { id } = useParams();
//   const { user } = useContext(AuthContext);
//   const [showPayment, setShowPayment] = useState(false);

//   const {
//     data: club,
//     isLoading,
//     error,
//     refetch,
//   } = useQuery({
//     queryKey: ["club", id],
//     queryFn: async () => {
//       const res = await axiosInstance.get(`/clubs/${id}`);
//       return res.data;
//     },
//   });

//   const handleFreeJoin = async () => {
//     try {
//       await axios.post(
//         "/join-club",
//         {
//           clubId: club._id,
//           paymentId: null, // free join
//           amount: 0,
//         },
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }, // adjust if you store token differently
//         }
//       );
//       toast.success("🎉 Successfully joined the club for free!");
//       refetch(); // update club data to show updated members count
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to join club");
//     }
//   };

//   if (isLoading) return <p className="text-center mt-10">Loading...</p>;
//   if (error) return <p className="text-center mt-10">Error loading club.</p>;

//   const isPaid = club.membershipFee > 0;

//   return (
//     <div className="max-w-4xl mx-auto my-10 bg-white shadow-xl rounded-2xl overflow-hidden">
//       {/* Banner */}
//       <div className="w-full h-64 overflow-hidden">
//         <img
//           src={club.bannerImage}
//           alt={club.clubName}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Details */}
//       <div className="p-6 space-y-4">
//         <h1 className="text-3xl font-bold">{club.clubName}</h1>
//         <p className="text-gray-600">{club.description}</p>

//         <div className="grid grid-cols-2 gap-4 text-sm">
//           <div><b>Category:</b> {club.category}</div>
//           <div><b>Location:</b> {club.location}</div>
//           <div><b>Manager:</b> {club.managerEmail}</div>
//           <div><b>Membership Fee:</b> ${club.membershipFee}</div>
//           <div><b>Status:</b> {club.status}</div>
//           <div><b>Members:</b> {club.members?.length || 0}</div>
//         </div>

//         <p className="text-xs text-gray-400">
//           Created: {new Date(club.createdAt).toLocaleString()}
//         </p>

//         {/* Join Section */}
//         {!showPayment && (
//           <>
//             {isPaid ? (
//               <button
//                 onClick={() => setShowPayment(true)}
//                 className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 transition text-white py-4 rounded-xl font-bold"
//               >
//                 Join Club - Pay ${club.membershipFee}
//               </button>
//             ) : (
//               <button
//                 onClick={handleFreeJoin}
//                 className="w-full mt-4 bg-green-600 hover:bg-green-700 transition text-white py-4 rounded-xl font-bold"
//               >
//                 Join Club for Free
//               </button>
//             )}
//           </>
//         )}

//         {/* Stripe Checkout - Only for paid clubs */}
//         {showPayment && isPaid && (
//           <Elements stripe={stripePromise}>
//             <CheckoutForm club={club} onSuccess={() => refetch()} />
//           </Elements>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClubDetailsPage;














// import React, { useState } from "react";
// import { useParams } from "react-router";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Elements } from "@stripe/react-stripe-js";
// import { stripePromise } from "../../Stripe/Stripe";
// import CheckoutForm from "../../Stripe/CheckOutForm/CheckOutForm";

// const axiosInstance = axios.create({ baseURL: "https://club-sphere-server-six.vercel.app/" });

// const ClubDetailspage = () => {
//   const { id } = useParams();
//   const [showPayment, setShowPayment] = useState(false);

//   const {
//     data: club,
//     isLoading,
//     error,
//   } = useQuery({
//     queryKey: ["club", id],
//     queryFn: async () => {
//       // const res = await axiosInstance.get(`/clubs/${id}`);
//       const res = await axiosInstance.get(`clubs/${id}`);
//       return res.data;
//     },
//   });

//   if (isLoading) return <p className="text-center mt-10">Loading...</p>;
//   if (error)
//     return <p className="text-center mt-10">Error loading club.</p>;

//   return (
//     <div className="max-w-4xl mx-auto my-10 bg-white shadow-xl rounded-2xl overflow-hidden">
//       {/* Banner */}
//       <div className="w-full h-64 overflow-hidden">
//         <img
//           src={club.bannerImage}
//           alt={club.clubName}
//           className="w-full h-full object-cover"
//         />
//       </div>

//       {/* Details */}
//       <div className="p-6 space-y-4">
//         <h1 className="text-3xl font-bold">{club.clubName}</h1>
//         <p className="text-gray-600">{club.description}</p>

//         <div className="grid grid-cols-2 gap-4 text-sm">
//           <div><b>Category:</b> {club.category}</div>
//           <div><b>Location:</b> {club.location}</div>
//           <div><b>Manager:</b> {club.managerEmail}</div>
//           <div><b>Membership Fee:</b> ${club.membershipFee}</div>
//           <div><b>Status:</b> {club.status}</div>
//           <div><b>Members:</b> {club.members.length}</div>
//         </div>

//         <p className="text-xs text-gray-400">
//           Created: {new Date(club.createdAt).toLocaleString()}
//         </p>

//         {/* Join Button */}
//         {!showPayment && (
//           <button
//             onClick={() => setShowPayment(true)}
//             className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 transition text-white py-4 rounded-xl font-bold"
//           >
//             Join Club
//           </button>
//         )}

//         {/* Stripe Checkout */}
//         {showPayment && (
//           <Elements stripe={stripePromise}>
//             <CheckoutForm club={club} />
//           </Elements>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ClubDetailspage;




import React, { use, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router"; 
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../Stripe/Stripe";
import CheckoutForm from "../../Stripe/CheckOutForm/CheckOutForm";
import { AuthContext } from "../../Context/AuthContext";

const axiosInstance = axios.create({ baseURL: "https://club-sphere-server-six.vercel.app/" });

const ClubDetailspage = () => {
  const { id } = useParams();
  const { user } = use(AuthContext); 
  const navigate = useNavigate();
  const location = useLocation();
  const [showPayment, setShowPayment] = useState(false);

  const {
    data: club,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`clubs/${id}`);
      return res.data;
    },
  });

  
  const handleJoinClub = () => {
    if (!user) {
     
      return navigate("/auth/login", { state: { from: location } });
    }
    setShowPayment(true);
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10">Error loading club.</p>;

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white shadow-xl rounded-2xl overflow-hidden">
      {/* Banner */}
      <div className="w-full h-64 overflow-hidden">
        <img
          src={club.bannerImage}
          alt={club.clubName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="p-6 space-y-4">
        <h1 className="text-3xl font-bold">{club.clubName}</h1>
        <p className="text-gray-600">{club.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><b>Category:</b> {club.category}</div>
          <div><b>Location:</b> {club.location}</div>
          <div><b>Manager:</b> {club.managerEmail}</div>
          <div><b>Membership Fee:</b> ${club.membershipFee}</div>
          <div><b>Status:</b> {club.status}</div>
          <div><b>Members:</b> {club.members?.length || 0}</div>
        </div>

        <p className="text-xs text-gray-400">
          Created: {new Date(club.createdAt).toLocaleString()}
        </p>

        {/* Join Button */}
        {!showPayment && (
          <button
            onClick={handleJoinClub} 
            className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 transition text-white py-4 rounded-xl font-bold"
          >
            Join Club
          </button>
        )}

      
        {showPayment && user && (
          <Elements stripe={stripePromise}>
            <CheckoutForm club={club} />
          </Elements>
        )}
      </div>
    </div>
  );
};

export default ClubDetailspage;