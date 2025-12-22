import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import Loader from "../../../Components/Loader/Loader";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);

  const {
    data: payments = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const token = await user.getIdToken();

      const res = await axios.get(
        "https://club-sphere-server-six.vercel.app/dashboard/member/payments",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <p className="text-red-500 p-6">Failed to load payment history</p>
    );

  return (
    <section className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>

      {payments.length === 0 ? (
        <div className="bg-white shadow p-6 rounded-xl text-center">
          <p className="text-gray-600">No payment history found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Club / Event</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {payments.map((p) => (
                <tr
                  key={p._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  {/* Amount */}
                  <td className="py-3 px-4 font-medium">
                    ${p.amount}
                  </td>

                  {/* Type */}
                  <td className="py-3 px-4 capitalize">
                    {p.type === "membership"
                      ? "Membership Fee"
                      : "Event Fee"}
                  </td>

                  {/* Club / Event */}
                  <td className="py-3 px-4">
                    {p.clubName || p.eventTitle || "—"}
                  </td>

                  {/* Date */}
                  <td className="py-3 px-4">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>

                  {/* Status */}
                  <td className="py-3 px-4">
                    {p.status === "paid" && (
                      <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        Paid
                      </span>
                    )}

                    {p.status === "pending" && (
                      <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                        Pending
                      </span>
                    )}

                    {p.status === "failed" && (
                      <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">
                        Failed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default PaymentHistory;
