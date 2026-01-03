import Link from "next/link";
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
        if (!url || typeof url !== 'string') return null;

        if (url.startsWith('http')) return url;

        const path = url.startsWith('/') ? url : `/${url}`;
        return `http://localhost:3000${path}`;
    };

    const imageUrl = getImageUrl(event);

    const venueName = typeof event.venueName === "string"
        ? event.venueName
        : (event.venueName?.name || "Venue TBD");

    const dateOptions: Intl.DateTimeFormatOptions = {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };

    const formattedDate = event.startDateTime
        ? new Date(event.startDateTime).toLocaleString('en-US', dateOptions).replace(',', '')
        : "Date TBD";

    return (
        <div className="flex items-center justify-center bg-transparent p-6 max-w-[1440px] mx-auto">
            {/* left side - Card */}
            <div className="w-[35%] shrink-0 rounded-[56px] bg-card p-10 h-[350px] flex flex-col justify-between shadow-sm">
                <div>
                    <h2 className="text-4xl font-bold text-primary leading-tight mb-4 line-clamp-2">
                        {event.title}
                    </h2>

                    <div className="space-y-1">
                        <p className="text-xl text-primary/70 font-medium">
                            {formattedDate.replace(' ', ', ').replace(/(\d{4})/, '$1 at')}
                        </p>

                        <p className="text-xl text-primary/70">
                            {venueName}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-8 pb-2">
                    <Link href={`/events/${eventId}#tickets`}>
                        <button className="rounded-full bg-eventaty-gold px-10 py-4 text-xl font-semibold text-black hover:bg-[#b5952f] shadow-[0_10px_20px_rgba(212,175,55,0.3)] transition-all">
                            Book Now
                        </button>
                    </Link>
                    <Link href={`/events/${eventId}`}>
                        <button className="text-xl font-semibold text-primary italic hover:opacity-80 transition-opacity whitespace-nowrap hover:underline hover:text-eventaty-gold">
                            More Info
                        </button>
                    </Link>
                </div>
            </div>
            {/* right side */}
            <div className="relative h-[350px] w-[65%] overflow-hidden rounded-[56px] bg-gray-200">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={event.title}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-400">
                        No Image Available
                    </div>
                )}
            </div>
        </div>
    )
}