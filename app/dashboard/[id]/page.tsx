import UserDashboard from "@/components/pages/UserDashboard";
import React from "react";

export default function Dashboard({ id }: { id: string }) {
  const isAdmin = false; // This would typically come from user authentication logic
  return <div>{isAdmin ? <h1>Admin Dashboard</h1> : <UserDashboard />}</div>;
}
