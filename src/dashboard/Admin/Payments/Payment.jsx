import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import PaymentsTable from "./PaymentsTable";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";

const Payment = () => {
  const { user, loading } = useContext(AuthContext);

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["admin-payments"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const token = await user.getIdToken();

      const res = await axios.get("http://localhost:3000/admin/payments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading payments...</div>;
  }
  return (
    <div>
      <PaymentsTable payments={payments}></PaymentsTable>
    </div>
  );
};

export default Payment;
