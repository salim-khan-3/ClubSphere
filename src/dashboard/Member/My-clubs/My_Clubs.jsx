import React, { useContext } from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import Loader from "../../../Components/Loader/Loader";

const My_Clubs = () => {
  const { user } = useContext(AuthContext);

  const {
    data: myClubs = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["my-clubs", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const token = await user.getIdToken();

      const res = await axios.get(
        "http://localhost:3000/dashboard/member/my-clubs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError) return <p className="text-red-500">Failed to load clubs</p>;

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">My Clubs</h2>

      {myClubs.length === 0 ? (
        <p>You have not joined any club yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myClubs.map((club) => (
            <div key={club.clubId} className="bg-white shadow p-4 rounded-md">
              <h3 className="font-bold text-lg">{club.clubName}</h3>
              <p>Location: {club.location}</p>
              <p>Status: {club.status}</p>
              <p>
                Membership Expiry:{" "}
                {club.expiryDate
                  ? new Date(club.expiryDate).toLocaleDateString()
                  : "N/A"}
              </p>

              {/* ✅ Correct Redirect Route */}
              <Link
                to={`/club_details/${club.clubId}`}
                className="
    group inline-flex items-center gap-2 mt-4
    px-4 py-2
    text-sm font-semibold
    text-indigo-600
    border border-indigo-600
    rounded-md
    hover:bg-indigo-600
    hover:text-white
    transition-all
    duration-300
  "
              >
                View Details
                <span className="transform group-hover:translate-x-1 transition">
                  →
                </span>
              </Link>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default My_Clubs;
