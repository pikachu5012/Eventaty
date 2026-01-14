import Link from "next/link";
import Image from "next/image";
import { EventItem } from "@/types/event";

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
  const monthDay = `${splitDate[0]} ${splitDate[1]}`;
  const time = splitDate[3] || "08:00 PM"; // Fallback for display

  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-center bg-transparent p-4 md:p-6 max-w-[1440px] mx-auto gap-4 md:gap-0">
      {/* Card Content - Bottom on mobile, Left on desktop */}
      <div className="w-full md:w-1/2 lg:w-1/3 md:pe-2">
        <div className="rounded-[40px] md:rounded-[56px] bg-white dark:bg-card p-8 md:p-10 min-h-[350px] flex flex-col justify-between shadow-sm border border-gray-100 dark:border-none">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif md:font-bold text-primary leading-tight mb-4 line-clamp-2 italic md:not-italic">
              {event.title}
            </h2>

            <div className="space-y-1 mb-6">
              <p className="text-xl text-primary/80 font-medium">
                {formattedDate.replace(" ", ", ").replace(/(\d{4})/, "$1 at")}
              </p>

              <p className="text-xl text-primary/70">{venueName}</p>
            </div>
          </div>

          <div className="flex items-center gap-6 md:gap-8">
            <Link href={`/events/${eventId}#tickets`} className="flex-1 md:flex-none">
              <button className="w-full md:w-auto flex items-center justify-center gap-2 rounded-full bg-[#FFC107] px-8 py-4 text-lg font-bold text-black hover:bg-[#FFB300] shadow-md transition-all">
                Book Now
              </button>
            </Link>
            <Link href={`/events/${eventId}`}>
              <button className="text-lg font-semibold text-primary hover:opacity-70 transition-opacity whitespace-nowrap">
                More Info
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Image - Top on mobile, Right on desktop */}
      <div className="relative h-[150px] md:h-[350px] w-full md:w-1/2 lg:w-2/3 overflow-hidden rounded-[40px] md:rounded-[56px] bg-gray-200">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={event.title}
              fill
              unoptimized
              className="object-cover"
            />
            {/* Optional gradient overlay to match image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            No Image Available
          </div>
        )}
      </div>
    </div>
  );
}
