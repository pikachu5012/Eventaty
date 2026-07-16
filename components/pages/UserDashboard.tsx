"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileCard from "../ProfileCard";
import { Edit, Mail, Phone, User } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import AccountForm from "../forms/AccountForm";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { IBooking } from "@/types/booking";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

import { motion, AnimatePresence } from "framer-motion";

export default function UserDashboard() {
  const t = useTranslations('Dashboard.User');
  const [isEditing, setIsEditing] = useState(false);
  const { user, token } = useAuth();
  const [myBookings, setMyBookings] = useState<IBooking[]>([]);
  const [activeTab, setActiveTab] = useState("Upcoming");

  const fetchMyBookings = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axios.get(`/api/booking/me`, {
        headers: {
          Authorization: token,
        },
      });
      setMyBookings(response.data.data.bookings);
    } catch (error) {
      console.error("Error fetching my bookings:", error);
    }
  }, [token]);

  useEffect(() => {
    let active = true;
    const load = async () => {
      await Promise.resolve();
      if (active) {
        fetchMyBookings();
      }
    };
    load();
    return () => {
      active = false;
    };
  }, [fetchMyBookings]);

  const upcomingBookings = myBookings.filter(
    (booking: IBooking) =>
      booking.status !== "cancelled" &&
      booking.eventId &&
      new Date(booking.eventId.startDateTime) >= new Date(),
  );
  const pastBookings = myBookings.filter(
    (booking: IBooking) =>
      booking.status === "cancelled" ||
      !booking.eventId ||
      new Date(booking.eventId.startDateTime) < new Date(),
  );

  return (
    <div className="container-fluid bg-background py-10">
      <div className="flex flex-col lg:flex-row container mx-auto min-h-screen">
        <motion.div
          layout
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="w-full lg:w-1/4 lg:sticky lg:top-26 lg:self-start my-5 [perspective:2000px]"
        >
          <div
            className={cn(
              "relative w-full transition-all duration-700 [transform-style:preserve-3d]",
              isEditing ? "[transform:rotateY(180deg)]" : "[transform:rotateY(0deg)]"
            )}
          >
            {/* FRONT SIDE (Read-only Profile Card) */}
            <div
              className={cn(
                "w-full rounded-2xl bg-card p-6 shadow-xl border border-zinc-200 dark:border-zinc-800/80 [backface-visibility:hidden] [transform:rotateY(0deg)] transition-all duration-700 flex flex-col",
                isEditing ? "absolute inset-0 opacity-0 pointer-events-none" : "relative opacity-100"
              )}
            >
              {/* Profile Card Header */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-bold tracking-tight text-foreground">{t('myProfile')}</span>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 hover:bg-violet-700 text-white cursor-pointer transition-all duration-200 shadow-md hover:shadow-lg shadow-violet-600/20"
                  aria-label="Edit Profile"
                >
                  <Edit className="w-4 h-4" />
                </button>
              </div>

              {/* Avatar section */}
              <div className="flex flex-col items-center mb-6">
                <div className="flex items-center justify-center bg-violet-100 dark:bg-violet-900/30 rounded-full w-24 h-24 mb-3 overflow-hidden shadow-inner">
                  <User className="w-12 h-12 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground tracking-tight">
                  {user?.firstName + " " + user?.lastName}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                  {user?.email}
                </p>
              </div>

              {/* Details list */}
              <div className="bg-muted/40 border border-border/50 p-4 rounded-xl space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-950/30 border border-violet-200/50 dark:border-violet-800/20 text-violet-600 dark:text-violet-400 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="text-start">
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{t('email')}</p>
                    <p className="text-sm text-foreground font-medium mt-0.5">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-950/30 border border-violet-200/50 dark:border-violet-800/20 text-violet-600 dark:text-violet-400 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div className="text-start">
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{t('phone')}</p>
                    <p className="text-sm text-foreground font-medium mt-0.5">{user?.phone || t('notProvided')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-violet-100 dark:bg-violet-950/30 border border-violet-200/50 dark:border-violet-800/20 text-violet-600 dark:text-violet-400 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                  <div className="text-start">
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">{t('accountType')}</p>
                    <p className="text-sm text-foreground font-medium mt-0.5 capitalize">{user?.role}</p>
                  </div>
                </div>
              </div>

              {/* Stats at bottom */}
              <div className="flex justify-around text-center mt-6 pt-5 border-t border-border/80">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-violet-600 dark:text-violet-400 leading-none">
                    {upcomingBookings.length}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold uppercase mt-2 tracking-wider">
                    {t('upcoming')}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-violet-600 dark:text-violet-400 leading-none">
                    {pastBookings.length}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold uppercase mt-2 tracking-wider">
                    {t('past')}
                  </span>
                </div>
              </div>
            </div>

            {/* BACK SIDE (Edit Profile Card) */}
            <div
              className={cn(
                "w-full rounded-2xl bg-card p-6 shadow-xl border border-zinc-200 dark:border-zinc-800/80 [backface-visibility:hidden] [transform:rotateY(180deg)] transition-all duration-700 flex flex-col",
                isEditing ? "relative opacity-100" : "absolute inset-0 opacity-0 pointer-events-none"
              )}
            >
              {/* Back Header */}
              <div className="flex items-center justify-center mb-6">
                <span className="text-xl font-bold tracking-tight text-foreground">{t('myProfile')}</span>
              </div>

              {/* Back Avatar section */}
              <div className="flex flex-col items-center mb-4">
                <div className="flex items-center justify-center bg-violet-100 dark:bg-violet-900/30 rounded-full w-24 h-24 mb-3 overflow-hidden shadow-inner">
                  <User className="w-12 h-12 text-violet-600 dark:text-violet-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground tracking-tight">
                  {user?.firstName + " " + user?.lastName}
                </h3>
                <p className="text-sm text-muted-foreground font-medium">
                  {user?.email}
                </p>
              </div>

              {/* Edit form */}
              <AccountForm setIsEditing={setIsEditing} />

              {/* Stats at bottom */}
              <div className="flex justify-around text-center mt-6 pt-5 border-t border-border/80">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-violet-600 dark:text-violet-400 leading-none">
                    {upcomingBookings.length}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold uppercase mt-2 tracking-wider">
                    {t('upcoming')}
                  </span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-violet-600 dark:text-violet-400 leading-none">
                    {pastBookings.length}
                  </span>
                  <span className="text-xs text-muted-foreground font-semibold uppercase mt-2 tracking-wider">
                    {t('past')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="w-full lg:w-3/4 p-5">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full rounded-b-none border-b border-gray-200 dark:border-slate-800 overflow-hidden p-0 bg-background flex">
              <TabsTrigger
                value="Upcoming"
                className="flex-1 text-center py-3 relative text-muted-foreground data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 border-0 data-[state=active]:rounded-none bg-foreground/10 data-[state=active]:bg-transparent data-[state=active]:shadow-none cursor-pointer transition-colors"
              >
                <span className="relative z-10 font-medium">
                  {t('upcomingEvents')} ({upcomingBookings.length})
                </span>
                {activeTab === "Upcoming" && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-violet-500"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </TabsTrigger>
              <TabsTrigger
                value="Past"
                className="flex-1 text-center py-3 relative text-muted-foreground data-[state=active]:text-violet-600 dark:data-[state=active]:text-violet-400 border-0 data-[state=active]:rounded-none bg-foreground/10 data-[state=active]:bg-transparent data-[state=active]:shadow-none cursor-pointer transition-colors"
              >
                <span className="relative z-10 font-medium">
                  {t('pastEvents')} ({pastBookings.length})
                </span>
                {activeTab === "Past" && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-violet-500"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </TabsTrigger>
            </TabsList>
            <div className="mt-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                >
                  {activeTab === "Upcoming" ? (
                    <div>
                      {upcomingBookings.length > 0 ? (
                        upcomingBookings.map((booking: IBooking) => (
                          <ProfileCard
                            key={booking._id}
                            data={booking}
                            isPast={false}
                            onAction={fetchMyBookings}
                          />
                        ))
                      ) : (
                        <div className="p-5 m-5 rounded-lg shadow-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800">
                          <p className="text-center text-lg font-semibold text-gray-500 dark:text-gray-400 my-10">
                            {t('noUpcoming')}
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      {pastBookings.length > 0 ? (
                        pastBookings.map((booking: IBooking) => (
                          <ProfileCard
                            key={booking._id}
                            data={booking}
                            isPast={true}
                            onAction={fetchMyBookings}
                          />
                        ))
                      ) : (
                        <div className="p-5 m-5 rounded-lg shadow-lg bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-800">
                          <p className="text-center text-lg font-semibold text-gray-500 dark:text-gray-400 my-10">
                            {t('noPast')}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
