import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import { MapPin, Users, Music, Utensils, Palette, Monitor, Trophy, Briefcase, Calendar } from "lucide-react";
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
    ? data?.title || "Event Title"
    : data?.name || "Venue Name";

  // Determine which icon to show based on category if it's an event
  const getCategoryIcon = () => {
    const catName = (data?.categoryId?.name || data?.category || "").toLowerCase();
    if (catName.includes("music")) return <Music size={32} className="text-eventaty-gold" />;
    if (catName.includes("food")) return <Utensils size={32} className="text-eventaty-gold" />;
    if (catName.includes("art")) return <Palette size={32} className="text-eventaty-gold" />;
    if (catName.includes("tech")) return <Monitor size={32} className="text-eventaty-gold" />;
    if (catName.includes("sport")) return <Trophy size={32} className="text-eventaty-gold" />;
    if (catName.includes("business")) return <Briefcase size={32} className="text-eventaty-gold" />;
    return <Calendar size={32} className="text-eventaty-gold" />;
  };

  const hasImage = data?.images && data.images.length > 0;
  
  // Force icon placeholder styling for events to match the mockup exact look
  // but allow venues to show images. 
  const showImage = !isEvent && hasImage; 

  return (
    <Link href={isEvent ? `/events/${data?._id}` : `/venues/${data?._id}`} className="block h-full group">
      <Card className="pt-0 rounded-[20px] overflow-hidden bg-white dark:bg-[#1A1B1E] border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
        <CardHeader className={`p-0 relative h-48 overflow-hidden flex items-center justify-center ${!showImage ? 'bg-eventaty-cream dark:bg-[#2C2D31]' : ''}`}>
          {showImage ? (
            <Image
              src={data?.images[0]}
              alt={title}
              fill
              unoptimized
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="transition-transform duration-300 group-hover:scale-110">
               {isEvent ? getCategoryIcon() : <MapPin size={32} className="text-eventaty-gold" />}
            </div>
          )}
          
          {/* Featured Badge - specifically styled orange as per mockup */}
          {isEvent && data?.featured && (
            <Badge
              className="absolute top-4 right-4 bg-[#F59E0B] text-white hover:bg-[#D97706] border-none px-3 py-1 text-xs font-semibold rounded-full shadow-sm"
            >
              Featured
            </Badge>
          )}
        </CardHeader>
        
        <CardContent className="p-5 flex-grow flex flex-col justify-center">
          <h3 className="text-[17px] font-bold text-[#111111] dark:text-white transition-colors line-clamp-2">
            {title}
          </h3>
          
          {/* Only showing extra details for Venues to keep Event cards minimal like the mockup */}
          {!isEvent && (
            <div className="mt-3 space-y-1.5">
              <div className="text-sm text-gray-500 flex gap-2 items-center">
                <MapPin className="w-4 h-4 text-eventaty-gold" />
                <p className="text-xs line-clamp-1">{data?.city || data?.country || "Location"}</p>
              </div>
              <div className="text-sm text-gray-500 flex gap-2 items-center">
                <Users className="w-4 h-4 text-eventaty-gold" />
                <p className="text-xs">{t('capacity', { capacity: data?.capacity || 0 })}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
