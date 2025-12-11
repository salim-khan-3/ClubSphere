import React from "react";

const PaymentsTable = () => {
  const payments = [
    {
      user: "rahim@example.com",
      amount: "$10",
      type: "Membership",
      club: "Photography Club",
      date: "2025-11-20",
      txId: "pi_1",
    },
    {
      user: "salma@example.com",
      amount: "$15",
      type: "Membership",
      club: "Techies",
      date: "2025-11-18",
      txId: "pi_2",
    },
  ];

  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Payments</h2>
            <div className="text-right">
              <span className="text-sm text-gray-500 block">Total:</span>
              <span className="text-xl font-bold text-gray-900">$12450</span>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Club
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Tx ID
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr
                    key={index}
                    className={
                      index !== payments.length - 1
                        ? "border-b border-gray-100"
                        : ""
                    }
                  >
                    <td className="px-8 py-5 text-sm text-blue-600 font-medium">
                      {payment.user}
                    </td>
                    <td className="px-8 py-5 text-sm font-semibold text-gray-900">
                      {payment.amount}
                    </td>
                    <td className="px-8 py-5 text-sm text-gray-700">
                      {payment.type}
                    </td>
                    <td className="px-8 py-5 text-sm text-gray-800 font-medium">
                      {payment.club}
                    </td>
                    <td className="px-8 py-5 text-sm text-gray-600">
                      {payment.date}
                    </td>
                    <td className="px-8 py-5 text-sm font-mono text-gray-500">
                      {payment.txId}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentsTable;
