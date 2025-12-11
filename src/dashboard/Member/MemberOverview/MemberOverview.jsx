import React from "react";

const MemberOverview = () => {
  const totalClubsJoined = 5;
  const totalEventsRegistered = 12;

  

  const myEvents = [
    {
      id: 1,
      title: "Chess Tournament",
      club: "Chess Club",
      date: "2025-12-20",
      status: "Registered",
    },
    {
      id: 2,
      title: "Painting Workshop",
      club: "Art Club",
      date: "2026-01-10",
      status: "Registered",
    },
  ];

  const paymentHistory = [
    {
      id: 1,
      amount: "$50",
      type: "Membership",
      club: "Chess Club",
      date: "2025-06-01",
      status: "Paid",
    },
    {
      id: 2,
      amount: "$30",
      type: "Membership",
      club: "Art Club",
      date: "2025-07-15",
      status: "Paid",
    },
  ];
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Member Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow p-4 rounded-md">
          <p className="text-gray-500">Total Clubs Joined</p>
          <p className="text-2xl font-bold">{totalClubsJoined}</p>
        </div>
        <div className="bg-white shadow p-4 rounded-md">
          <p className="text-gray-500">Total Events Registered</p>
          <p className="text-2xl font-bold">{totalEventsRegistered}</p>
        </div>
      </div>
    </section>
  );
};

export default MemberOverview;
