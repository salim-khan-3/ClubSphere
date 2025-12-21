import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loader from "../../Components/Loader/Loader";
import EventCard from "./EventCard";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});


const Events = () => {
  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosInstance.get("/events");
      return res.data;
    },
  });
  console.log(events);
  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <div className="max-w-7xl px-8 mx-auto py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {
            events.map((event) => <EventCard event={event} key={event._id}></EventCard>)
        }
      </div>
    </div>
  );
};

export default Events;
