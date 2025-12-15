import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const axiosInstance = axios.create({ baseURL: "http://localhost:3000" });

const ClubDetailspage = () => {
  const { id } = useParams();
  console.log(typeof id);

  const {
    data: club,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["club", id],
    queryFn: async () => {
      const res = await axiosInstance.get(`/clubs/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading club.</p>;

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white shadow-lg rounded-2xl overflow-hidden">
      <div className="w-full h-64 overflow-hidden">
        <img
          src={club.bannerImage}
          alt={club.clubName}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6 space-y-4">
        <h1 className="text-3xl font-bold">{club.clubName}</h1>
        <p>{club.description}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>Category: {club.category}</div>
          <div>Location: {club.location}</div>
          <div>Manager Email: {club.managerEmail}</div>
          <div>Membership Fee: ${club.membershipFee}</div>
          <div>Status: {club.status}</div>
          <div>Members: {club.members.length}</div>
        </div>
        <p>Created At: {new Date(club.createdAt).toLocaleString()}</p>
        <p>Last Updated: {new Date(club.updatedAt).toLocaleString()}</p>
        <div className="w-full text-center">
          <button className="px-8 py-4 w-full bg-indigo-600 rounded-lg text-white font-bold cursor-pointer">Join Club</button>
        </div>
      </div>
    </div>
  );
};

export default ClubDetailspage;
