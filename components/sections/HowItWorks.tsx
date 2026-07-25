import { Fragment } from "react";
import { getTranslations } from "next-intl/server";
import { Search, Ticket, Sparkles, ArrowRight } from "lucide-react";
import BorderGlow from "@/components/BorderGlow/BorderGlow";

export default async function HowItWorks() {
  const t = await getTranslations("HomePage");

  const steps = [
    {
      icon: Search,
      title: t("howItWorks.step1Title"),
      desc: t("howItWorks.step1Desc"),
    },
    {
      icon: Ticket,
      title: t("howItWorks.step2Title"),
      desc: t("howItWorks.step2Desc"),
    },
    {
      icon: Sparkles,
      title: t("howItWorks.step3Title"),
      desc: t("howItWorks.step3Desc"),
    },
  ];

  return (
    <section className="py-20 w-full bg-background text-foreground">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 tracking-tight text-foreground">
          {t("howItWorks.title")}
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8 w-full">
          {steps.map((step, i) => {
            const IconComponent = step.icon;
            return (
              <Fragment key={i}>
                <BorderGlow
                  className="flex-1 min-w-[260px] w-full"
                  borderRadius={30}
                  glowRadius={50}
                  glowIntensity={1.4}
                  edgeSensitivity={15}
                  glowColor="270 80 70"
                  colors={["#c084fc", "#f472b6", "#38bdf8"]}
                  backgroundColor="var(--card)"
                  fillOpacity={0.35}
                >
                  <div className="group relative p-8 md:p-10 text-center overflow-hidden h-full flex flex-col items-center">
                    {/* Glowing Watermark Number */}
                    <div className="absolute -bottom-4 end-3 text-8xl md:text-9xl font-black text-violet-500/20 dark:text-violet-400/20 group-hover:text-violet-500/40 dark:group-hover:text-violet-400/45 drop-shadow-[0_0_25px_rgba(124,58,237,0.4)] group-hover:drop-shadow-[0_0_40px_rgba(167,139,250,0.7)] transition-all duration-300 select-none pointer-events-none leading-none">
                      {i + 1}
                    </div>

                    {/* Icon Box */}
                    <div className="w-20 h-20 mx-auto mb-8 rounded-[22px] bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shadow-xs group-hover:scale-105 transition-all duration-300">
                      <IconComponent className="w-9 h-9 text-violet-600 dark:text-violet-400" />
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm md:text-base text-muted-foreground font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </BorderGlow>

                {/* Arrow between cards */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex items-center justify-center text-violet-500/60 dark:text-violet-400/50 rtl:rotate-180 shrink-0">
                    <ArrowRight className="w-7 h-7 stroke-[2.5]" />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
