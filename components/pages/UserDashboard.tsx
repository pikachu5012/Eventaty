"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileCard from "../ProfileCard";
import { Edit, Mail, Phone, User } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import AccountForm from "../forms/AccountForm";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { IBooking } from "@/types/booking";
import { useTranslations } from "next-intl";

import { motion, AnimatePresence } from "framer-motion";

export default function UserDashboard() {
  const t = useTranslations('Dashboard.User');
  const [isEditing, setIsEditing] = useState(false);
  const { user, token } = useAuth();
  const [myBookings, setMyBookings] = useState<IBooking[]>([]);
  const [activeTab, setActiveTab] = useState("Upcoming");

  const fetchMyBookings = async () => {
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
  };

  useEffect(() => {
    if (token) fetchMyBookings();
  }, [token]);

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
        <div className="w-full lg:w-1/4 p-5 lg:sticky lg:top-26 lg:self-start rounded-lg bg-card shadow-lg my-5">
          <div className="flex items-center justify-between p-5 text-2xl">
            <p className={`${isEditing && "w-full text-center"}`}>{t('myProfile')}</p>
            {!isEditing && (
              <Button
                variant="secondary"
                className="rounded-full cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                <Edit className="w-6 h-6" />
              </Button>
            )}
          </div>
          <div className="bg-violet-100 dark:bg-violet-900/30 rounded-full w-32 h-32 mx-auto mb-3 overflow-hidden">
            <User className="w-full h-full object-cover p-5" />
          </div>
          <div className="text-center mb-5">
            <p className=" font-semibold">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
          {isEditing ? (
            <AccountForm setIsEditing={setIsEditing} />
          ) : (
            <div className="bg-background p-4 rounded-lg space-y-4">
              <div className="flex gap-2">
                <Mail className="w-4 h-4 text-violet-500 dark:text-violet-400 mt-1" />
                <div>
                  <p className="text-muted-foreground text-sm">{t('email')}</p>
                  <p>{user?.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Phone className="w-4 h-4 text-violet-500 dark:text-violet-400 mt-1" />
                <div>
                  <p className="text-muted-foreground text-sm">{t('phone')}</p>
                  <p>{user?.phone || t('notProvided')}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <User className="w-4 h-4 text-violet-500 dark:text-violet-400 mt-1" />
                <div>
                  <p className="text-muted-foreground text-sm">{t('accountType')}</p>
                  <p>{user?.role}</p>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-around text-center p-5 my-5">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              <span className="block text-violet-600 dark:text-violet-400 text-3xl font-bold">
                {upcomingBookings.length}
              </span>
              {t('upcoming')}
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              <span className="block text-violet-600 dark:text-violet-400 text-3xl font-bold">{pastBookings.length}</span>
              {t('past')}
            </p>
          </div>
        </div>
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
