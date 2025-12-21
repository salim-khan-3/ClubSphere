// import React from 'react';
// import ManagerOverviewCard from './ManagerOverviewCard';

// const ManagerOverview = () => {
//     return (
//         <div>
//             <ManagerOverviewCard></ManagerOverviewCard>
//         </div>
//     );
// };

// export default ManagerOverview;



import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { auth } from "../../../firebase/firebase.init";
import ManagerOverviewCard from "./ManagerOverviewCard";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
});

const ManagerOverview = () => {
  const { data = {}, isLoading, isError, error } = useQuery({
    queryKey: ["manager-overview"],
    queryFn: async () => {
      const user = auth.currentUser;

      if (!user) {
        throw new Error("User not logged in");
      }

      // 🔐 Firebase ID Token (REAL token)
      const token = await user.getIdToken();

      const res = await axiosSecure.get("/manager/overview-stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
  });

  if (isLoading) return <p>Loading manager stats...</p>;
  if (isError) return <p>{error.message}</p>;

  return <ManagerOverviewCard stats={data} />;
};

export default ManagerOverview;
