import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";

export default async function Testimonials() {
  const t = await getTranslations("HomePage");

  const list = [
    {
      quote: t("testimonials.t1Quote"),
      author: t("testimonials.t1Author"),
      initials: "AR",
      rating: 5,
    },
    {
      quote: t("testimonials.t2Quote"),
      author: t("testimonials.t2Author"),
      initials: "SM",
      rating: 5,
    },
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-16">
      <h2 className="text-3xl md:text-4xl text-center my-10 font-bold text-foreground">
        {t("testimonials.title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {list.map((item, i) => (
          <div
            key={i}
            className="flex flex-col justify-between p-6 md:p-8 bg-white dark:bg-ink-900 border border-gray-100 dark:border-slate-800/50 rounded-2xl shadow-xs relative"
          >
            <div>
              {/* Star Rating Row */}
              <div className="flex items-center gap-1 mb-4" aria-label={`Rating: ${item.rating || 5} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, starIdx) => {
                  const isFilled = starIdx < (item.rating || 5);
                  return (
                    <Star
                      key={starIdx}
                      className={`w-4 h-4 ${
                        isFilled
                          ? "text-amber-500 fill-amber-500"
                          : "text-gray-300 dark:text-slate-600 fill-transparent"
                      }`}
                    />
                  );
                })}
              </div>

              {/* Quote Text */}
              <p className="text-base md:text-lg italic text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                &quot;{item.quote}&quot;
              </p>
            </div>

            {/* Author Details */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-violet-600/10 border border-violet-500/20 text-[#7C3AED] dark:text-violet-400 flex items-center justify-center font-bold text-sm shrink-0">
                {item.initials}
              </div>
              <span className="font-bold text-foreground text-sm md:text-base">
                {item.author}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
