"use client";
import { CircleChevronRight } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomeVenuesCard() {
  return (
    <button
      className="group w-2/3 md:w-1/3 lg:w-1/5 mx-auto"
      onClick={() => {
        console.log("pls?");
      }}
    >
      <Card className="p-2 rounded-xl overflow-hidden my-4 bg-navFooter hover:bg-eventaty-cream cursor-pointer">
        <CardHeader className="p-0 relative">
          <img
            src="/ekko.png"
            alt="Event Image"
            className="w-full h-48 object-fit rounded-xl"
          />
          <CardTitle className="text-2xl font-normal text-secondary group-hover:text-black text-center flex justify-around items-center">
            Venue Name
            <CircleChevronRight className="inline-block mt-1 w-5 h-5" />
          </CardTitle>
        </CardHeader>
      </Card>
    </button>
  );
}
