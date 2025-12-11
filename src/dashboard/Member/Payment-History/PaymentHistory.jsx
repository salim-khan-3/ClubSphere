import React from "react";

const PaymentHistory = () => {
  // Dummy Data (later replace with API)
  const payments = [
    {
      id: 1,
      amount: 500,
      type: "Membership Fee",
      club: "Chess Club",
      date: "2025-01-12",
      status: "Paid",
    },
    {
      id: 2,
      amount: 300,
      type: "Event Fee",
      club: "Art Club",
      date: "2025-02-03",
      status: "Pending",
    },
    {
      id: 3,
      amount: 700,
      type: "Membership Renewal",
      club: "Music Club",
      date: "2025-02-10",
      status: "Failed",
    },
  ];

  return (
    <section className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Payment History</h2>

      {payments.length === 0 ? (
        <div className="bg-white shadow p-6 rounded-xl text-center">
          <p className="text-gray-600 mb-2">No payment history found.</p>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-xl">
          <table className="min-w-full text-left">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Club</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              {payments.map((p) => (
                <tr
                  key={p.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 font-medium">৳{p.amount}</td>
                  <td className="py-3 px-4">{p.type}</td>
                  <td className="py-3 px-4">{p.club}</td>
                  <td className="py-3 px-4">{p.date}</td>

                  <td className="py-3 px-4">
                    {p.status === "Paid" && (
                      <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
                        Paid
                      </span>
                    )}

                    {p.status === "Pending" && (
                      <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                        Pending
                      </span>
                    )}

                    {p.status === "Failed" && (
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
