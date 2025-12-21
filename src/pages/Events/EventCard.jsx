import React from "react";
import {
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router";

const EventCard = ({ event }) => {
  const dateObj = new Date(event.eventDate || event.date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const feeText = event.eventFee > 0 ? `$${event.eventFee.toFixed(2)}` : "Free";
  const feeColor =
    event.eventFee > 0 ? "text-green-600 font-bold" : "text-blue-600 font-bold";

  return (
    <div
      className="
            bg-white 
            p-6 
            rounded-xl 
            shadow-lg                 
            hover:shadow-2xl          
            transition-all duration-300 
            transform hover:-translate-y-1 
            border border-gray-100
            max-w-sm w-full
        "
    >
      {/* Club Name (Secondary Info) */}
      <h4 className="text-sm font-medium text-blue-500 mb-1 uppercase tracking-wide">
        {event.clubName || "ClubSphere Club"}
      </h4>

      {/* Event Title (Primary Info) */}
      <h2
        className="text-xl font-extrabold text-gray-900 mb-3 truncate"
        title={event.title}
      >
        {event.title}
      </h2>

      <div className="space-y-2 mb-4 text-gray-600">
        {/* Date */}
        <div className="flex items-center text-sm">
          <ClockIcon className="w-4 h-4 mr-2 text-gray-400" />
          <span>{formattedDate || event.date || "Date TBA"}</span>
        </div>

        {/* Location */}
        <div className="flex items-start text-sm">
          <MapPinIcon className="w-4 h-4 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
          <span className="truncate">{event.location || "Location TBA"}</span>
        </div>
      </div>

      {/* Fee and CTA */}
      <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
        {/* Event Fee */}
        <div className="flex items-center">
          <CurrencyDollarIcon
            className={`w-5 h-5 mr-1 ${
              feeColor.includes("green") ? "text-green-500" : "text-blue-500"
            }`}
          />
          <p className={`text-lg ${feeColor}`}>{feeText}</p>
        </div>

        {/* Action Button (Register/View Details) */}
        <Link
          to={`/events_details/${event._id}`}
          className="
                        px-4 py-2 
                        bg-blue-600 text-white 
                        text-sm font-semibold 
                        rounded-lg 
                        hover:bg-blue-700 
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                        transition-colors duration-200
                    "
          onClick={() => console.log("View details clicked for:", event.title)}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
