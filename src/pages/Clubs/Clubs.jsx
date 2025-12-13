import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Link } from "react-router";
import Loader from "../../Components/Loader/Loader"

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

const Clubs = () => {
  const queryClient = useQueryClient();
  // FETCH clubs (all)
  const { data: clubs = [], isLoading  } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosInstance.get("/clubs/all");
      return res.data;
    },
  });
  console.log(clubs);
  if(isLoading ) {
    return <Loader></Loader>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {clubs
        .filter((club) => club.status === "approved") // sudhu approved clubs
        .map((club) => (
          <div
            key={club._id}
            className="bg-white flex flex-col gap-5 shadow-md rounded-lg p-5 hover:shadow-xl transition duration-300"
          >
            <div>
              <img className="h-[150px] w-full" src={club.bannerImage} alt="" />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-bold mb-2">
                Club Name:{club.clubName}
              </h2>
              <p>Club Category: {club.category}</p>
              <p>
                Created At:{" "}
                {new Date(club.createdAt).toLocaleString("en-BD", {
                  timeZone: "Asia/Dhaka",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </p>

              <p>Location:{club.location}</p>
            </div>

            {/* <p className="text-gray-600 mb-4 break-words">{club.description}</p> */}
            <Link to={`/club_details/${club._id}`} className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              View Club
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Clubs;
