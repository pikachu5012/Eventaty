import { getTranslations } from "next-intl/server";
import { Calendar, Users, MapPin, Heart } from "lucide-react";

export default async function StatsBar() {
  const t = await getTranslations("HomePage");

  const stats = [
    {
      value: t("stats.events"),
      label: t("stats.eventsLabel"),
      icon: Calendar,
    },
    {
      value: t("stats.attendees"),
      label: t("stats.attendeesLabel"),
      icon: Users,
    },
    {
      value: t("stats.venues"),
      label: t("stats.venuesLabel"),
      icon: MapPin,
    },
    {
      value: t("stats.satisfaction"),
      label: t("stats.satisfactionLabel"),
      icon: Heart,
    },
  ];

  const borderClasses = [
    "border-r border-b md:border-b-0",
    "border-b md:border-r md:border-b-0",
    "border-r md:border-b-0 md:border-r",
    "",
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 bg-white dark:bg-ink-900 border border-gray-200 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        {stats.map((stat, i) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={i}
              className={`flex flex-col items-center justify-center p-6 text-center border-gray-200 dark:border-slate-800 transition-all duration-300 hover:bg-gray-50/30 dark:hover:bg-white/5 ${borderClasses[i]}`}
            >
              <IconComponent className="w-5 h-5 text-[#7C3AED] mb-3" />
              <span className="text-[26px] md:text-[28px] font-bold text-foreground leading-none mb-1">
                {stat.value}
              </span>
              <span className="text-[12px] font-medium text-gray-500 dark:text-gray-400">
                {stat.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
