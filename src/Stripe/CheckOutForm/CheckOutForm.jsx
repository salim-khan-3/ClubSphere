// import React, { useState, useContext } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { AuthContext } from "../../Context/AuthContext";
// import { toast } from "react-hot-toast";

// const CheckOutForm = ({ club, event, onSuccess }) => {
//   const { user, token } = useContext(AuthContext);
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   // club বা event — যেকোনো একটা থাকবে
//   const item = club || event;
//   const isEvent = !!event; // true হলে event, false হলে club

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!stripe || !elements) {
//       setLoading(false);
//       return;
//     }

//     if (!token) {
//       toast.error("You are not logged in. Please login again.");
//       setLoading(false);
//       return;
//     }

//     try {
//       // 1. Create PaymentIntent on server
//       const { data } = await axios.post(
//         "/create-payment-intent",
//         { amount: isEvent ? item.eventFee : item.membershipFee },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // 2. Confirm card payment
//       const result = await stripe.confirmCardPayment(data.clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: user?.displayName || "Member",
//             email: user?.email,
//           },
//         },
//       });

//       if (result.error) {
//         toast.error(result.error.message || "Payment failed");
//         setLoading(false);
//         return;
//       }

//       if (result.paymentIntent.status === "succeeded") {
//         // 3. Send success data to backend — club বা event অনুযায়ী রুট চেঞ্জ
//         await axios.post(
//           isEvent ? "/register-event" : "/join-club",
//           {
//             [isEvent ? "eventId" : "clubId"]: item._id,
//             paymentId: result.paymentIntent.id,
//             amount: isEvent ? item.eventFee : item.membershipFee,
//           },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         // Success message
//         toast.success(
//           isEvent
//             ? "🎉 Event registration & payment successful!"
//             : "🎉 Payment successful! Welcome to the club!"
//         );

//         // Callback for refetch or redirect
//         onSuccess?.();
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       console.error("Response:", error.response?.data);

//       if (error.response?.status === 401) {
//         toast.error("Session expired. Please login again.");
//       } else {
//         toast.error("Payment failed. Please try again.");
//       }
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//       <div className="p-5 bg-gray-50 border border-gray-200 rounded-xl">
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#424770",
//                 "::placeholder": {
//                   color: "#aab7c4",
//                 },
//               },
//               invalid: {
//                 color: "#9e2146",
//               },
//             },
//           }}
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-bold rounded-xl disabled:opacity-50 transition"
//       >
//         {loading
//           ? "Processing..."
//           : `Pay $${isEvent ? item.eventFee : item.membershipFee}`}
//       </button>

//       <button
//         type="button"
//         onClick={() => window.history.back()}
//         className="w-full text-center text-sm text-gray-500 hover:text-gray-700 underline mt-4"
//       >
//         Cancel
//       </button>
//     </form>
//   );
// };

// export default CheckOutForm;
























// import React, { useState, useContext } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { AuthContext } from "../../Context/AuthContext"; // adjust path
// import { toast } from "react-hot-toast";

// const CheckOutForm = ({ club }) => {
//   const { user, token } = useContext(AuthContext); // assuming you have token in context
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // 1. Create PaymentIntent on the server
//       const { data: clientSecretData } = await axios.post(
//         "http://localhost:3000/create-payment-intent",
//         { amount: club.membershipFee },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const clientSecret = clientSecretData.clientSecret;

//       // 2. Confirm card payment
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: user.name,
//             email: user.email,
//           },
//         },
//       });

//       if (result.error) {
//         toast.error(result.error.message);
//       } else {
//         if (result.paymentIntent.status === "succeeded") {
//           // 3. Save payment + club join info to backend
//           await axios.post(
//             "http://localhost:3000/join-club",
//             {
//               clubId: club._id,
//               paymentId: result.paymentIntent.id,
//               amount: club.membershipFee,
//             },
//             {
//               headers: { Authorization: `Bearer ${token}` },
//             }
//           );

//           toast.success("🎉 Payment successful & data saved!");
//         }
//       }
//     } catch (error) {
//       console.error(error);
//       toast.error("Something went wrong. Please try again.");
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <CardElement className="p-4 border rounded" />
//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="bg-blue-500 text-white px-6 py-2 rounded disabled:opacity-50"
//       >
//         {loading ? "Processing..." : `Pay $${club.membershipFee}`}
//       </button>
//     </form>
//   );
// };

// export default CheckOutForm;
























// import React, { useState, useContext } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import axios from "axios";
// import { AuthContext } from "../../Context/AuthContext";
// import { toast } from "react-hot-toast";

// const CheckOutForm = ({ club, event, onSuccess }) => {
//   const { user, token } = useContext(AuthContext);
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   // club বা event — যেকোনো একটা থাকবে
//   const item = club || event;

//   // যদি কোনো ডাটা না আসে — তাহলে error দেখাবে (crash হবে না)
//   if (!item) {
//     return (
//       <div className="text-center py-10 text-red-600">
//         <p>Error: Club or Event data not found!</p>
//         <button
//           onClick={() => window.history.back()}
//           className="mt-4 text-blue-600 underline"
//         >
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   const isEvent = !!event;
//   const amount = isEvent ? item.eventFee : item.membershipFee;

//   // যদি amount না থাকে বা 0 হয় — error দেখাবে
//   if (!amount || amount <= 0) {
//     return (
//       <div className="text-center py-10 text-red-600">
//         <p>Invalid payment amount!</p>
//       </div>
//     );
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     if (!stripe || !elements || !token) {
//       toast.error("Payment system not ready or not logged in.");
//       setLoading(false);
//       return;
//     }

//     try {
//       // 1. Create PaymentIntent
//       const { data } = await axios.post(
//         "/create-payment-intent",
//         { amount },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       // 2. Confirm payment
//       const result = await stripe.confirmCardPayment(data.clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             name: user?.displayName || "Member",
//             email: user?.email,
//           },
//         },
//       });

//       if (result.error) {
//         toast.error(result.error.message || "Payment failed");
//         setLoading(false);
//         return;
//       }

//       if (result.paymentIntent.status === "succeeded") {
//         // 3. Success → backend এ পাঠাও (club বা event অনুযায়ী)
//         await axios.post(
//           isEvent ? "/register-event" : "/join-club",
//           {
//             [isEvent ? "eventId" : "clubId"]: item._id,
//             paymentId: result.paymentIntent.id,
//             amount,
//           },
//           { headers: { Authorization: `Bearer ${token}` } }
//         );

//         toast.success(
//           isEvent
//             ? "Event registration & payment successful!"
//             : "Payment successful! Welcome to the club!"
//         );

//         onSuccess?.();
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       toast.error(
//         error.response?.data?.message ||
//           "Payment failed. Please try again."
//       );
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-8 space-y-6">
//       <div className="p-5 bg-gray-50 border border-gray-300 rounded-xl">
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#424770",
//                 "::placeholder": { color: "#aab7c4" },
//               },
//             },
//           }}
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={!stripe || loading}
//         className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl rounded-xl disabled:opacity-50 transition"
//       >
//         {loading ? "Processing..." : `Pay $${amount}`}
//       </button>

//       <button
//         type="button"
//         onClick={() => window.history.back()}
//         className="w-full text-center text-sm text-gray-500 hover:text-gray-700 underline"
//       >
//         Cancel
//       </button>
//     </form>
//   );
// };

// export default CheckOutForm;












import React, { useState, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-hot-toast";

const CheckoutForm = ({ club, event, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user, token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const amount = club
    ? club.membershipFee
    : event
    ? event.eventFee
    : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    if (amount <= 0) return toast.error("Invalid payment amount");

    setLoading(true);

    try {
      // 1️⃣ Create PaymentIntent
      const { data } = await axios.post(
        "https://club-sphere-server-six.vercel.app/create-payment-intent",
        { amount },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // 2️⃣ Confirm card payment
      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.displayName || "Guest",
            email: user?.email,
          },
        },
      });

      if (result.error) {
        toast.error(result.error.message);
        setLoading(false);
        return;
      }

      // 3️⃣ Save data in backend
      if (result.paymentIntent.status === "succeeded") {
        if (club) {
          await axios.post(
            "https://club-sphere-server-six.vercel.app/join-club",
            {
              clubId: club._id,
              paymentId: result.paymentIntent.id,
              amount,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }

        if (event) {
          await axios.post(
            "https://club-sphere-server-six.vercel.app/register-event",
            {
              eventId: event._id,
              paymentId: result.paymentIntent.id,
              amount,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        }

        toast.success("🎉 Payment Successful!");
        onSuccess && onSuccess();
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-6">
      <CardElement className="p-4 border rounded-lg" />

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold disabled:opacity-50"
      >
        {loading ? "Processing..." : `Pay $${amount}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
