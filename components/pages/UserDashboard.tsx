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

export default function UserDashboard() {
  const t = useTranslations('Dashboard.User');
  const [isEditing, setIsEditing] = useState(false);
  const { user, token } = useAuth();
  const [myBookings, setMyBookings] = useState<IBooking[]>([]);

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
          <div className="bg-secondary rounded-full w-32 h-32 mx-auto mb-3 overflow-hidden">
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
                <Mail className="w-4 h-4 text-secondary mt-1" />
                <div>
                  <p className="text-muted-foreground text-sm">{t('email')}</p>
                  <p>{user?.email}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Phone className="w-4 h-4 text-secondary mt-1" />
                <div>
                  <p className="text-muted-foreground text-sm">{t('phone')}</p>
                  <p>{user?.phone || t('notProvided')}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <User className="w-4 h-4 text-secondary mt-1" />
                <div>
                  <p className="text-muted-foreground text-sm">{t('accountType')}</p>
                  <p>{user?.role}</p>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-around text-center p-5 my-5">
            <p className="text-muted-foreground">
              <span className="block text-secondary text-3xl">
                {upcomingBookings.length}
              </span>
              {t('upcoming')}
            </p>
            <p className="text-muted-foreground">
              <span className="block text-3xl">{pastBookings.length}</span>{t('past')}
            </p>
          </div>
        </div>
        <div className="w-full lg:w-3/4 p-5">
          <Tabs defaultValue="Upcoming" className="w-full">
            <TabsList className="w-full rounded-b-none border-b-0 overflow-hidden p-0 bg-background">
              <TabsTrigger
                value="Upcoming"
                className="text-muted-foreground data-[state=active]:text-secondary/80 border-0 data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-secondary bg-foreground/10 data-[state=active]:shadow-none"
              >
                {t('upcomingEvents')} ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger
                value="Past"
                className="text-muted-foreground data-[state=active]:text-secondary/80 border-0 data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-secondary bg-foreground/10 data-[state=active]:shadow-none"
              >
                {t('pastEvents')} ({pastBookings.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Upcoming">
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
                <div className="p-5 m-5 rounded-lg shadow-lg bg-eventaty-cream">
                  <p className="text-center text-lg font-semibold text-eventaty-gold my-10 ">
                    {t('noUpcoming')}
                  </p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="Past">
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
                <div className="p-5 m-5 rounded-lg shadow-lg bg-eventaty-cream">
                  <p className="text-center text-lg font-semibold text-eventaty-gold my-10 ">
                    {t('noPast')}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
