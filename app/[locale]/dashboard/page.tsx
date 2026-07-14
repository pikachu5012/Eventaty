"use client";
import UserDashboard from "@/components/pages/UserDashboard";
import { useAuth } from "@/context/AuthContext";

import { useRouter } from "@/navigation";
import { Loader2 } from "lucide-react";
import { AuthOverlay } from "@/components/AuthOverlay";
import AdminDashboard from "@/components/pages/AdminDashboard";
import { useState, useEffect } from "react";
import AccountTypeOverlay from "@/components/AccountTypeOverlay";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Dashboard() {
  const t = useTranslations('Dashboard');
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAdmin = user?.role === "admin";

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
          <h1 className="text-2xl font-bold mb-4">{t('loginRequired')}</h1>
          <p className="text-muted-foreground mb-4">
            {t('loginRequiredDesc')}
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
      {isAdmin ? <AdminDashboard /> : <UserDashboard />}
    </div>
  );
}
