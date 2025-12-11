import React from 'react';
import { Link } from 'react-router';

const My_Clubs = () => {
    const myClubs = [
    {
      id: 1,
      name: "Chess Club",
      location: "Hall A",
      status: "Active",
      expiry: "2026-03-01",
    },
    {
      id: 2,
      name: "Art Club",
      location: "Hall B",
      status: "Active",
      expiry: "2026-05-15",
    },
  ];
    return (
 <section>
        <h2 className="text-xl font-semibold mb-4">My Clubs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myClubs.map((club) => (
            <div key={club.id} className="bg-white shadow p-4 rounded-md">
              <h3 className="font-bold text-lg">{club.name}</h3>
              <p>Location: {club.location}</p>
              <p>Status: {club.status}</p>
              <p>Membership Expiry: {club.expiry}</p>
              <Link to={`/dashboard/member/club-details/${club.id}`} className="mt-2 text-indigo-600 hover:underline">
                View Details
              </Link>
            </div>
          ))}
        </div>
      </section>
    );
};

export default My_Clubs;