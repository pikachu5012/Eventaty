import Link from "next/link";
import Image from "next/image";
import { EventItem } from "@/types/event";
import { ImageIcon } from "lucide-react";
import { useLocale } from "next-intl";
import { tStr } from "@/lib/translateHelper";

type EProps = {
  event: EventItem;
};

export default function EventSlide({ event }: EProps) {
  const locale = useLocale();
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

  const rawVenueName =
    typeof event.venueName === "string"
      ? event.venueName
      : event.venueName?.name || "Venue TBD";
  const venueName = tStr(rawVenueName, locale);

  const dateObj = event.startDateTime ? new Date(event.startDateTime) : null;
  const formattedDateString = dateObj
    ? dateObj.toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : (locale === "ar" ? "التاريخ لم يحدد" : "Date TBD");
  const formattedTimeString = dateObj
    ? dateObj.toLocaleTimeString(locale === "ar" ? "ar-EG" : "en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "08:00";

  return (
    <div className="relative w-full min-h-[320px] md:min-h-[400px] rounded-[24px] overflow-hidden flex items-center p-8 md:p-16 max-w-[1440px] mx-auto">
      {/* Background Image */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={event.title}
          fill
          unoptimized
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-[#2C2D31] flex items-center justify-center">
          <ImageIcon className="w-16 h-16 text-eventaty-gold opacity-50" />
        </div>
      )}

      {/* Horizontal Gradient Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent" 
        style={{
          background: "linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)"
        }}
      />

      {/* Content - sits above the gradient */}
      <div className="relative z-10 w-full max-w-[600px] flex flex-col justify-center text-left">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3 line-clamp-2">
            {tStr(event.title, locale)}
          </h2>
          <div className="space-y-1 text-[#E5E5E5] text-[13px] md:text-sm font-medium opacity-90">
            <p>
              {formattedDateString} {locale === "ar" ? "في" : "at"} {formattedTimeString}
            </p>
            <p>{venueName}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <Link href={`/events/${eventId}#tickets`}>
            <button className="flex items-center justify-center gap-2 rounded-lg bg-eventaty-gold px-6 py-2.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(124,58,237,0.4)] hover:shadow-[0_12px_28px_rgba(124,58,237,0.6)] hover:-translate-y-0.5 transition-all cursor-pointer">
              {locale === "ar" ? "احجز الآن" : "Book now"}
            </button>
          </Link>
          <Link href={`/events/${eventId}`} className="text-sm font-semibold text-white hover:text-white/80 transition-colors underline decoration-white/50 underline-offset-4">
            {locale === "ar" ? "تفاصيل أكثر" : "More info"}
          </Link>
        </div>
      </div>
    </div>
  );
}
