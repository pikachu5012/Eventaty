"use client";
import UserDashboard from "@/components/pages/UserDashboard";
import { useAuth } from "@/context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  return <div>{isAdmin ? <h1>Admin Dashboard</h1> : <UserDashboard />}</div>;
}
