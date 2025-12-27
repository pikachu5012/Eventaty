import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "./ui/button";

export default function CardComponent({
  data,
  isEvent,
}: {
  data?: any;
  isEvent?: boolean;
}) {
  const title = isEvent
    ? data?.title || "Blue Note Jazz Club"
    : data?.name || "Summer Music Festival 2025";
  const sub = isEvent ? "Featured" : data?.category || "Venue";

  let dateAndTime = data?.date || "Will be announced";
  if (data?.time || !data) {
    dateAndTime = `${dateAndTime} at ${data?.time || "10:00 PM"}`;
  }

  const locationOrCapacity =
    data?.location ||
    (isEvent ? "Grand Arena, Downtown" : "Capacity: 500 people");
  const price = data?.price || 99.99;
  // const description = data?.description || "Intimate jazz club with excellent acoustics and a cozy atmosphere. Perfect for live music performances.";
  const capacity = data?.capacity || 500;

  return (
    <Card className="pt-0 rounded-xl overflow-hidden group bg-white border-none shadow-sm h-full flex flex-col">
      <CardHeader className="p-0 relative">
        <img
          src={data?.image || "/ekko.png"}
          alt="Event Image"
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Badge
          variant="secondary"
          className="absolute top-0 right-0 m-4 bg-[#d4af37] text-white hover:bg-[#b5952f] border-none"
        >
          {sub}
        </Badge>
        {isEvent && data?.isFeatured && (
          <Badge className="absolute top-0 left-0 m-4 bg-black/70 text-white hover:bg-black/80 border-none">
            Hot
          </Badge>
        )}
      </CardHeader>
      <CardContent className="flex-grow pt-5">
        <h3 className="text-lg font-bold mb-3 group-hover:text-[#d4af37] transition-colors line-clamp-1">
          {title}
        </h3>
        {/* {!isEvent && (
          <CardDescription className="line-clamp-2 mb-4">
            {description}
          </CardDescription>
        )} */}
        <div className="text-sm text-muted-foreground mb-2 flex gap-2 items-center">
          {isEvent ? (
            <Calendar className="w-4 h-4 text-[#d4af37]" />
          ) : (
            <MapPin className="w-4 h-4 text-[#d4af37]" />
          )}
          <p className="text-xs">
            {isEvent ? dateAndTime : data?.location || "Unknown Location"}
          </p>
        </div>
        <div className="text-sm text-muted-foreground flex gap-2 items-center">
          {isEvent ? (
            <MapPin className="w-4 h-4 text-[#d4af37]" />
          ) : (
            <Users className="w-4 h-4 text-[#d4af37]" />
          )}
          <p className="text-xs">
            {isEvent ? locationOrCapacity : `Capacity: ${capacity}`}
          </p>
        </div>
      </CardContent>
      <CardFooter className="pb-5 pt-0 flex justify-between items-center mt-auto">
        {isEvent ? (
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <span className="font-bold text-xl text-[#d4af37]">
              ${typeof price === "number" ? price.toFixed(2) : price}
            </span>
          </div>
        ) : (
          <div>
            <p className="text-xs text-muted-foreground">Upcoming Events</p>
            <span className="font-bold text-xl text-[#d4af37]">
              {data?.upcomingEvents || 0}
            </span>
          </div>
        )}
        <div>
          <Button className="bg-[#0F172A] text-white hover:bg-[#d4af37] hover:text-white transition-colors rounded-lg px-6 cursor-pointer">
            View Details
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
