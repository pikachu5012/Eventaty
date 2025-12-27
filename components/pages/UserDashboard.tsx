"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileCard from "../ProfileCard";
import { Edit, Mail, Phone, User } from "lucide-react";
import { Button } from "../ui/button";
import Image from "next/image";
import { useState } from "react";
import AccountForm from "../forms/AccountForm";

export default function UserDashboard() {
  const imag = "";
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="container-fluid bg-muted py-10">
      <div className="flex flex-col lg:flex-row container mx-auto min-h-screen">
        <div className="w-full lg:w-1/4 p-5 lg:sticky lg:top-12 lg:self-start rounded-lg bg-background shadow-lg my-5">
          <div className="flex items-center justify-between p-5 text-2xl">
            <p className={`${isEditing && "w-full text-center"}`}>My Profile</p>
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
            {imag ? (
              <Image
                src="/ekko.png"
                alt="ekko"
                className="w-full h-full object-cover"
                width={128}
                height={128}
              />
            ) : (
              <User className="w-full h-full object-cover p-5" />
            )}
          </div>
          <div className="text-center mb-5">
            <p className=" font-semibold">Ahmed</p>
            <p className="text-muted-foreground">ahmed@example.com</p>
          </div>
          {isEditing ? (
            <AccountForm setIsEditing={setIsEditing} />
          ) : (
            <div className="bg-muted p-4 rounded-lg space-y-4">
              <div className="flex gap-2">
                <Mail className="w-4 h-4 text-secondary mt-1" />
                <div>
                  <p className="text-muted-foreground text-sm">Email</p>
                  <p>ahmed@example.com</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Phone className="w-4 h-4 text-secondary mt-1" />
                <div>
                  <p className="text-muted-foreground text-sm">Phone</p>
                  <p>010123456789</p>
                </div>
              </div>
              <div className="flex gap-2">
                <User className="w-4 h-4 text-secondary mt-1" />
                <div>
                  <p className="text-muted-foreground text-sm">Account Type</p>
                  <p>User</p>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-around text-center p-5 my-5">
            <p className="text-muted-foreground">
              <span className="block text-secondary text-3xl">0</span>Upcoming
            </p>
            <p className="text-muted-foreground">
              <span className="block text-3xl">0</span>Past
            </p>
          </div>
        </div>
        <div className="w-full lg:w-3/4 p-5">
          <Tabs defaultValue="Upcoming" className="w-full">
            <TabsList className="w-full rounded-b-none border-b-0 overflow-hidden p-0 bg-background">
              <TabsTrigger
                value="Upcoming"
                className="text-muted-foreground data-[state=active]:text-secondary/80 border-0 data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-secondary bg-background data-[state=active]:shadow-none"
              >
                Upcoming Events (0)
              </TabsTrigger>
              <TabsTrigger
                value="Past"
                className="text-muted-foreground data-[state=active]:text-secondary/80 border-0 data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-secondary bg-background data-[state=active]:shadow-none"
              >
                Past Events (0)
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Upcoming">
              <ProfileCard />
              <ProfileCard />
              <ProfileCard />
            </TabsContent>
            <TabsContent value="Past">
              <ProfileCard isPast />
              <ProfileCard isPast />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
