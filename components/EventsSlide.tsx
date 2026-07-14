import Link from "next/link";
import Image from "next/image";
import { EventItem } from "@/types/event";
import { ImageIcon } from "lucide-react";

type EProps = {
  event: EventItem;
};

export default function EventSlide({ event }: EProps) {
  const eventId = event.id || (event as any)._id;

  const getImageUrl = (event: any) => {
    const img = event.image || event.images;
    if (!img) return null;

    let url = Array.isArray(img) ? img[0] : img;
    if (!url || typeof url !== "string") return null;

    if (url.startsWith("http")) return url;

    const path = url.startsWith("/") ? url : `/${url}`;
    return `http://localhost:3000${path}`;
  };

  const imageUrl = getImageUrl(event);

  const venueName =
    typeof event.venueName === "string"
      ? event.venueName
      : event.venueName?.name || "Venue TBD";

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };

  const formattedDate = event.startDateTime
    ? new Date(event.startDateTime)
      .toLocaleString("en-US", dateOptions)
      .replace(",", "")
    : "Date TBD";

  const splitDate = formattedDate.split(" ");
  const monthDay = `${splitDate[0]} ${splitDate[1]}, ${splitDate[2]}`;
  const time = splitDate[3] || "08:00"; 

  return (
    <div className="flex flex-col-reverse md:flex-row items-stretch justify-center bg-transparent p-4 md:p-0 max-w-[1440px] mx-auto gap-4 md:gap-6">
      {/* Card Content - Left */}
      <div className="w-full md:w-[40%] flex flex-col">
        <div className="rounded-[24px] bg-white dark:bg-[#1A1B1E] p-8 md:p-10 flex-grow flex flex-col justify-center shadow-sm border border-gray-200 dark:border-white/5">
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111111] dark:text-white leading-tight mb-4 line-clamp-2">
              {event.title}
            </h2>
            <div className="space-y-1">
              <p className="text-lg text-[#6B7280] font-medium">
                {monthDay} at {time}
              </p>
              <p className="text-lg text-[#9CA3AF] font-medium">{venueName}</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <Link href={`/events/${eventId}#tickets`} className="flex-1 md:flex-none">
              <button className="w-full md:w-auto flex items-center justify-center gap-2 rounded-[20px] bg-eventaty-gold px-8 py-3.5 text-lg font-bold text-white shadow-[0_8px_24px_rgba(124,58,237,0.4)] hover:shadow-[0_12px_28px_rgba(124,58,237,0.6)] hover:-translate-y-0.5 transition-all">
                Book now
              </button>
            </Link>
            <Link href={`/events/${eventId}`}>
              <button className="text-[17px] font-semibold text-eventaty-gold hover:opacity-70 transition-opacity whitespace-nowrap">
                More info
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Image Container - Right */}
      <div className="relative h-[250px] md:h-auto min-h-[350px] w-full md:w-[60%] overflow-hidden rounded-[24px] bg-eventaty-cream dark:bg-[#2C2D31] flex items-center justify-center">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={event.title}
              fill
              unoptimized
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </>
        ) : (
          <ImageIcon className="w-16 h-16 text-eventaty-gold opacity-50" />
        )}
      </div>
    </div>
  );
}
