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
      className="group w-2/3 md:w-1/3 lg:w-1/5 mx-auto text-left"
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
        <div className="p-2 flex flex-col h-full bg-[#111111] rounded-xl overflow-hidden">
          <div className="relative h-48 w-full shrink-0">
            <Image
              src={venue.images[0]}
              alt="Venue Image"
              fill
              unoptimized
              className="object-cover rounded-xl"
            />
          </div>
          <div className="text-lg font-normal text-slate-300 group-hover:text-white flex justify-center items-center gap-2 pt-3 pb-1 shrink-0">
            <span>{tStr(venue.name, locale)}</span>
            <CircleChevronRight className="inline-block w-5 h-5 text-eventaty-gold transition-transform duration-300 ease-out group-hover:translate-x-3" />
          </div>
        </div>
      </BorderGlow>
    </button>
  );
}
