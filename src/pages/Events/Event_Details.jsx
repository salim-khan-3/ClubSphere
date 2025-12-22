import React, { useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router"; // useLocation যোগ করা হয়েছে
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "../../Stripe/Stripe";
import CheckoutForm from "../../Stripe/CheckOutForm/CheckOutForm";
import { AuthContext } from "../../Context/AuthContext";
import { toast } from "react-hot-toast";

const axiosInstance = axios.create({
  baseURL: "https://club-sphere-server-six.vercel.app/",
});

const Event_Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation(); // বর্তমান লোকেশন ট্র্যাক করার জন্য
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
      const res = await axiosInstance.get(`events/${id}`);
      return res.data;
    },
  });

  // ✅ লগইন চেক করার জন্য কমন ফাংশন
  const checkUserAuth = () => {
    if (!user) {
      toast.error("Please login to register for this event!");
      // লগইন পেজে পাঠানোর সময় বর্তমান পেজের লোকেশন state হিসেবে পাঠিয়ে দেওয়া
      navigate("/auth/login", { state: { from: location } });
      return false;
    }
    return true;
  };

  // ✅ FIXED FREE REGISTRATION WITH AUTH CHECK
  const handleFreeRegister = async () => {
    // আগে চেক করবে ইউজার লগইন করা আছে কি না
    if (!checkUserAuth()) return;

    try {
      const token = await user.getIdToken();

      await axiosInstance.post(
        "register-event",
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

  // ✅ PAID REGISTRATION WITH AUTH CHECK
  const handlePaidRegisterClick = () => {
    if (!checkUserAuth()) return;
    setShowPayment(true);
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10">Error loading event.</p>;

  const isPaid = event.isPaid && event.eventFee > 0;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-2xl rounded-xl my-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-gray-600 cursor-pointer hover:text-gray-800 flex items-center gap-2"
      >
        <span>←</span> Go Back
      </button>

      <h1 className="text-4xl font-bold text-indigo-700 mb-4">
        {event.title}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 bg-gray-50 p-6 rounded-xl border border-gray-100">
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
              onClick={handlePaidRegisterClick}
              className="w-full py-4 cursor-pointer bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-xl font-bold text-lg shadow-lg"
            >
              Register Now - Pay ৳{event.eventFee}
            </button>
          ) : (
            <button
              onClick={handleFreeRegister} 
              className="w-full py-4 cursor-pointer bg-green-600 hover:bg-green-700 transition text-white rounded-xl font-bold text-lg shadow-lg"
            >
              Register for Free
            </button>
          )}
        </div>
      )}

      {showPayment && isPaid && user && (
        <div className="mt-10 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Secure Payment</h2>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              event={event}
              onSuccess={() => {
                toast.success("Registration complete!");
                setShowPayment(false);
                refetch();
              }}
            />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default Event_Details;

