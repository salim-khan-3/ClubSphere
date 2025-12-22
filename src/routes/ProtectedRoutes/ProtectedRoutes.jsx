// src/components/ProtectedRoutes/ProtectedRoutes.jsx
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider"; 
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ModernLoader from "../ModernLoader/ModernLoader";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", 
});

const ProtectedRoutes = ({ children, allowedRoles = [] }) => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const location = useLocation();

  
  const {
    data: role = "member", 
    isLoading: roleLoading,
  } = useQuery({
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      if (!user?.email) return "member";
      const res = await axiosInstance.get(`/users/role-info?email=${user.email}`);
      return res.data.role || "member";
    },
    enabled: !!user?.email && !authLoading, 
    staleTime: 5 * 60 * 1000, 
  });


  if (authLoading || roleLoading) {
    return <ModernLoader />;
  }


  if (!user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    
    return <Navigate to="/dashboard" replace />;
  }

 
  return children;
};

export default ProtectedRoutes;