"use client";
import { CircleChevronRight } from "lucide-react";

import { IVenue } from "@/types/venue";
import { useRouter } from "next/navigation";
import Image from "next/image";

import BorderGlow from "./BorderGlow/BorderGlow";
import { useLocale } from "next-intl";
import { tStr } from "@/lib/translateHelper";

export default function HomeVenuesCard({ venue }: { venue: IVenue }) {
  const router = useRouter();
  const locale = useLocale();
  return (
    <button
      className="group w-[48%] sm:w-[48%] md:w-1/3 lg:w-1/5 text-start"
      onClick={() => {
        router.push(`/venues/${venue._id}`);
      }}
    >
      <BorderGlow
        glowColor="262 83 58"
        backgroundColor="#111111"
        borderRadius={12}
        colors={['#7C3AED', '#A78BFA', '#5B21B6']}
        className="border-none"
      >
        <div className="p-1.5 sm:p-2 flex flex-col h-full bg-[#111111] rounded-xl overflow-hidden">
          <div className="relative h-28 sm:h-48 w-full shrink-0">
            <Image
              src={venue.images[0]}
              alt="Venue Image"
              fill
              sizes="(max-width: 768px) 50vw, 20vw"
              className="object-cover rounded-xl"
            />
          </div>
          <div className="text-xs sm:text-lg font-medium sm:font-normal text-slate-300 group-hover:text-white flex justify-center items-center gap-1.5 sm:gap-2 pt-2 sm:pt-3 pb-1 shrink-0 truncate px-1">
            <span className="truncate">{tStr(venue.name, locale)}</span>
            <CircleChevronRight className="inline-block w-3.5 h-3.5 sm:w-5 sm:h-5 text-eventaty-gold shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1.5 sm:group-hover:translate-x-3 rtl:rotate-180 rtl:group-hover:-translate-x-1.5 rtl:sm:group-hover:-translate-x-3" />
          </div>
        </div>
      </BorderGlow>
    </button>
  );
}
