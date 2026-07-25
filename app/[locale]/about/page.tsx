import Link from "next/link";
import { Inter } from "next/font/google";
import AboutCard from "@/components/aboutCard";
import TeamMemberCard from "@/components/TeamMemberCard";
import StatsBar from "@/components/sections/StatsBar";
import { Compass, Eye, Heart, Award, Lightbulb, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

const inter = Inter({ subsets: ["latin"] });
const subject = encodeURIComponent("Contact from Eventaty website");
const body = encodeURIComponent("Hello,\n\nI want to contact you regarding...");

export default async function About() {
  const t = await getTranslations('About');

  return (
    <div className={`${inter.className} min-h-screen bg-background`}>
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-violet-300 via-violet-200/70 to-violet-100 dark:from-[#2D1E3E] dark:via-[#1B1429] dark:to-[#0B0B0F] pt-20 pb-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center text-center relative z-10">
          {/* Circular Badge Icon */}
          <div className="w-20 h-20 rounded-full bg-violet-500/15 dark:bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-6 shadow-xs backdrop-blur-xs">
            <Compass size={42} strokeWidth={1.5} />
          </div>

          <h1 className="text-foreground text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            {t('heroTitle')}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg font-medium max-w-lg mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </div>

        {/* Bottom Gentle Wave Transition */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg
            className="relative block w-full h-10 md:h-14 text-background fill-current"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center md:items-stretch justify-center gap-6">
          <div className="flex-1 max-w-lg bg-card rounded-2xl border border-border/60 p-2 shadow-xs">
            <AboutCard
              icon={<Compass size={24} />}
              title={t('missionTitle')}
              description={t('missionDesc')}
              allign="start"
            />
          </div>
          <div className="flex-1 max-w-lg bg-card rounded-2xl border border-border/60 p-2 shadow-xs">
            <AboutCard
              icon={<Eye size={24} />}
              title={t('visionTitle')}
              description={t('visionDesc')}
              allign="start"
            />
          </div>
        </div>
      </section>

      {/* Stats Bar Section */}
      <section className="my-6">
        <StatsBar />
      </section>

      {/* Core Values Section */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-12">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-3xl font-extrabold text-foreground">
            {t('valuesTitle')}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mt-2">
            {t('valuesSubtitle')}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card rounded-2xl border border-border/60 p-3 shadow-xs">
            <AboutCard
              icon={<Heart size={24} />}
              title={t('value1Title')}
              description={t('value1Desc')}
              allign="center"
            />
          </div>
          <div className="bg-card rounded-2xl border border-border/60 p-3 shadow-xs">
            <AboutCard
              icon={<Award size={24} />}
              title={t('value2Title')}
              description={t('value2Desc')}
              allign="center"
            />
          </div>
          <div className="bg-card rounded-2xl border border-border/60 p-3 shadow-xs">
            <AboutCard
              icon={<Lightbulb size={24} />}
              title={t('value3Title')}
              description={t('value3Desc')}
              allign="center"
            />
          </div>
        </div>
      </section>

      {/* Meet Our Team Section */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-3xl font-extrabold text-foreground">
            {t('teamTitle')}
          </h2>
          <div className="w-16 h-1 bg-violet-600 mt-2.5 mb-3 rounded-full" />
          <p className="text-sm md:text-base text-muted-foreground max-w-xl">
            {t('teamSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            {
              name: "Ahmed Mohamed",
              github: "https://github.com/pikachu5012",
              linkedin: "https://www.linkedin.com/in/ahmed-m-fath/",
              gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=ahmedmohammed5012@gmail.com&su=${subject}&body=${body}`,
            },
            {
              name: "Mohamed Tarek",
              github: "https://github.com/Mohamed-Tarek-Mo",
              linkedin: "https://www.linkedin.com/in/mohamed-tarek-elattar/",
              gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=mohamedtar425@gmail.com&su=${subject}&body=${body}`,
            },
            {
              name: "Mohamed Nabil",
              github: "https://github.com/MohamedNabil3",
              linkedin: "https://linkedin.com/in/mohammed-nabil-mohammed",
              gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=mohammednabil642@gmail.com&su=${subject}&body=${body}`,
            },
          ].map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>
      </section>

      {/* Closing CTA Band */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 my-8 md:my-12">
        <div className="bg-gradient-to-r from-violet-900 via-purple-900 to-slate-900 text-white rounded-3xl p-8 md:p-12 text-center flex flex-col items-center justify-center shadow-xl relative overflow-hidden">
          <h2 className="text-2xl md:text-4xl font-extrabold mb-3">
            Ready to Find Your Next Event?
          </h2>
          <p className="text-slate-300 max-w-xl text-sm md:text-base mb-6">
            Explore live concerts, tech conferences, premier venues, and unforgettable experiences happening around you right now.
          </p>
          <Link href="/events">
            <button className="px-8 py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-base transition-all shadow-lg hover:shadow-violet-500/40 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2">
              Explore Events
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
