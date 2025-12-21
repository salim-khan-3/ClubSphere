import React from "react";

const SummaryCards = ({ stats = {} }) => {
  const {
    totalUsers = 0,
    totalClubs = 0,
    totalMembership = 0,
    totalPayments = 0,
  } = stats;

  const summaryData = [
    { title: "Total Users", value: totalUsers },
    { title: "Total Clubs", value: totalClubs },
    { title: "Total Memberships", value: totalMembership },
    { title: "Total Payments ($)", value: totalPayments },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {summaryData.map((item, index) => (
        <div key={index} className="p-6 rounded-lg shadow-lg bg-white">
          <h2 className="text-xl font-semibold">{item.title}</h2>
          <p className="text-3xl font-bold mt-2">{item.value}</p>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
