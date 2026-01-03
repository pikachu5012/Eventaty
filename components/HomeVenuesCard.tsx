"use client";
import { CircleChevronRight } from "lucide-react";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { IVenue } from "@/types/venue";
import { useRouter } from "next/navigation";

export default function HomeVenuesCard({ venue }: { venue: IVenue }) {
  const router = useRouter();
  return (
    <button
      className="group w-2/3 md:w-1/3 lg:w-1/5 mx-auto"
      onClick={() => {
        router.push(`/venues/${venue._id}`);
      }}
    >
      <Card className="p-2 rounded-xl overflow-hidden my-4 bg-navFooter hover:bg-eventaty-cream cursor-pointer">
        <CardHeader className="p-0 relative">
          <img
            src={venue.images[0]}
            alt="Venue Image"
            className="w-full h-48 object-fit rounded-xl"
          />
          <CardTitle className="text-lg font-normal text-secondary group-hover:text-black text-center flex justify-around items-center">
            {venue.name}
            <CircleChevronRight className="inline-block mt-1 w-5 h-5" />
          </CardTitle>
        </CardHeader>
      </Card>
    </button>
  );
}
