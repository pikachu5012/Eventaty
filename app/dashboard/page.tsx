"use client";
import UserDashboard from "@/components/pages/UserDashboard";
import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AuthOverlay } from "@/components/AuthOverlay";
import AdminDashboard from "@/components/pages/AdminDashboard";
import { useState } from "react";
import AccountTypeOverlay from "@/components/AccountTypeOverlay";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const isAdmin = user?.role === "admin";
  const [asUser, setAsUser] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-muted/20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Login Required</h1>
          <p className="text-muted-foreground mb-4">
            Please log in to access your dashboard.
          </p>
        </div>
        <AuthOverlay
          open={true}
          noTrigger
          onOpenChange={(open: boolean) => {
            if (!open && !user) {
              router.push("/");
            }
          }}
        />
      </div>
    );
  }

  return (
    <div>
      {isAdmin && <AccountTypeOverlay asUser={asUser} setAsUser={setAsUser} />}
      {isAdmin ? (
        asUser ? (
          <UserDashboard />
        ) : (
          <AdminDashboard />
        )
      ) : (
        <UserDashboard />
      )}
    </div>
  );
}
