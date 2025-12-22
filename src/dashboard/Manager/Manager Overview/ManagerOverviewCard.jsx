import { Building2, Calendar, CreditCard, Users } from "lucide-react";

const ManagerOverviewCard = ({ stats }) => {
  const cards = [
    {
      id: "clubs",
      label: "Clubs Managed",
      value: stats.clubsManaged,
      icon: <Building2 className="w-6 h-6" />,
    },
    {
      id: "members",
      label: "Total Members",
      value: stats.totalMembers,
      icon: <Users className="w-6 h-6" />,
    },
    {
      id: "events",
      label: "Total Events",
      value: stats.totalEvents,
      icon: <Calendar className="w-6 h-6" />,
    },
    {
      id: "payments",
      label: "Total Payments",
      value: `$${stats.totalPayments}`,
      icon: <CreditCard className="w-6 h-6" />,
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-8">
      <h2 className="text-2xl font-semibold mb-6">Manager Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="p-5 bg-white rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
                {card.icon}
              </div>
              <div>
                <p className="text-gray-500 text-sm">{card.label}</p>
                <p className="text-2xl font-bold mt-1">{card.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagerOverviewCard;
