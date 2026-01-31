import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { Calendar, MapPin, Users } from "lucide-react";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

export default function CardComponent({
  data,
  isEvent,
}: {
  data?: any;
  isEvent?: boolean;
}) {
  const t = useTranslations('Card');
  const title = isEvent
    ? data?.title || "Blue Note Jazz Club"
    : data?.name || "Summer Music Festival 2025";
  const sub = isEvent ? t('featured') : data?.category || t('venue');
  let shownDate = data?.startDateTime
    ? new Date(data?.startDateTime).toISOString().split("T")[0]
    : "";
  let shownTime = data?.startDateTime
    ? new Date(data?.startDateTime).toISOString().split("T")[1].split(".")[0]
    : "";
  let dateAndTime = shownDate;
  if (shownTime) {
    dateAndTime = `${dateAndTime} at ${shownTime}`;
  }

  const locationOrCapacity =
    data?.venueId?.address ||
    (data?.city && data?.country
      ? `${data.city}, ${data.country}`
      : data?.city || data?.country) ||
    (isEvent ? "Grand Arena, Downtown" : t('capacity', { capacity: 500 }));
  const price = data?.price;
  const capacity = data?.capacity;

  return (
    <Card className="pt-0 rounded-xl overflow-hidden group bg-card border-none shadow-sm h-full flex flex-col">
      <CardHeader className="p-0 relative h-48 overflow-hidden">
        <Image
          src={data?.images[0] || "/ekko.png"}
          alt="Event Image"
          fill
          unoptimized
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {isEvent ? (
          data?.featured ? (
            <Badge
              variant="secondary"
              className="absolute top-0 right-0 m-4 bg-eventaty-gold text-white hover:bg-secondary border-none"
            >
              {sub}
            </Badge>
          ) : (
            ""
          )
        ) : (
          <Badge
            variant="secondary"
            className="absolute top-0 right-0 m-4 bg-eventaty-gold text-white hover:bg-secondary border-none"
          >
            {sub}
          </Badge>
        )}
        {isEvent && data?.isFeatured && (
          <Badge className="absolute top-0 left-0 m-4 bg-black/70 text-white hover:bg-black/80 border-none">
            Hot
          </Badge>
        )}
      </CardHeader>
      <CardContent className="grow pt-5">
        <h3 className="text-lg font-bold mb-3 group-hover:text-secondary transition-colors line-clamp-1 text-dark-background">
          {title}
        </h3>
        <div className="text-sm text-muted-foreground mb-2 flex gap-2 items-center">
          {isEvent ? (
            <Calendar className="w-4 h-4 text-eventaty-gold" />
          ) : (
            <MapPin className="w-4 h-4 text-eventaty-gold" />
          )}
          <p className="text-xs">
            {isEvent ? dateAndTime : locationOrCapacity || t('unknownLocation')}
          </p>
        </div>
        <div className="text-sm text-muted-foreground flex gap-2 items-center">
          {isEvent ? (
            <MapPin className="w-4 h-4 text-eventaty-gold" />
          ) : (
            <Users className="w-4 h-4 text-eventaty-gold" />
          )}
          <p className="text-xs">
            {isEvent ? locationOrCapacity : t('capacity', { capacity: capacity })}
          </p>
        </div>
      </CardContent>
      <CardFooter className="pb-5 pt-0 flex justify-between items-center mt-auto">
        {isEvent ? (
          <div>
            <p className="text-xs text-muted-foreground">{t('startingFrom')}</p>
            <span className="font-bold text-xl text-eventaty-gold">
              {typeof price === "number" ? price.toFixed(2) : price}
            </span>{" "}
            <span className="font-semibold text-lg text-secondary/70">EGP</span>
          </div>
        ) : (
          <div>
            <p className="text-xs text-muted-foreground">{t('upcomingEvents')}</p>
            <span className="font-bold text-xl text-eventaty-gold">
              {data?.eventCount || 0}
            </span>
          </div>
        )}
        <div>
          <Link
            href={isEvent ? `/events/${data?._id}` : `/venues/${data?._id}`}
            className="w-full"
          >
            <Button className="bg-eventaty-dark text-white hover:bg-eventaty-gold hover:text-white transition-colors rounded-lg px-6 w-full cursor-pointer">
              {t('viewDetails')}
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
