import { motion } from "framer-motion";

const summaryItems = [
  { label: "Total Users", value: 0 },
  { label: "Total Clubs", value: 0 },
  { label: "Total Memberships", value: 0 },
  { label: "Total Events", value: 0 },
];
console.log(motion)
const SummaryCards = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {summaryItems.map((item, index) => (
          <motion.div
          className="rounded-2xl text-center py-4 px-8 shadow hover:shadow-lg transition-shadow"
            key={index}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              type: "spring",
              stiffness: 120,
            }}
          >
            <h2 className="text-xl font-semibold mb-2">{item.label}</h2>

            {/* Animated Number Count */}
            <motion.p
              className="text-4xl font-extrabold text-blue-600"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
            >
              {item.value}
            </motion.p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SummaryCards;
