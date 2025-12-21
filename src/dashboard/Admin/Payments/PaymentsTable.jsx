import React from "react";

const PaymentsTable = ({ payments }) => {
  // total amount calculate
  const totalAmount = payments.reduce((sum, p) => sum + (p.amount || 0), 0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Payments</h2>
          <div className="text-right">
            <span className="text-sm text-gray-500 block">Total:</span>
            <span className="text-xl font-bold text-gray-900">
              ${totalAmount}
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  User
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Club/Event
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-8 py-4 text-left text-xs font-semibold text-gray-500 uppercase">
                  Date
                </th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment, index) => (
                <tr
                  key={payment._id}
                  className={
                    index !== payments.length - 1
                      ? "border-b border-gray-100"
                      : ""
                  }
                >
                  <td className="px-8 py-5 text-sm text-blue-600 font-medium">
                    {payment.userEmail}
                  </td>

                  <td className="px-8 py-5 text-sm font-semibold text-gray-900">
                    ${payment.amount}
                  </td>

                  <td className="px-8 py-5 text-sm text-gray-700 capitalize">
                    {payment.type}
                  </td>

                  <td className="px-8 py-5 text-sm text-gray-800">
                    {payment.type === "membership" ? "Membership" : "Event"}
                  </td>

                  <td className="px-8 py-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        payment.status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>

                  <td className="px-8 py-5 text-sm text-gray-600">
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}

              {payments.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-10 text-gray-500">
                    No payments found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentsTable;
