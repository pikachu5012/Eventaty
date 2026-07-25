import React from "react";
import {
  MessageCircleMore,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import ContactForm from "@/components/forms/ContactForm";

export default async function Contact() {
  const t = await getTranslations('Contact');

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative w-full bg-gradient-to-b from-violet-300 via-violet-200/70 to-violet-100 dark:from-[#2D1E3E] dark:via-[#1B1429] dark:to-[#0B0B0F] pt-20 pb-24 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 flex flex-col items-center justify-center text-center relative z-10">
          {/* Circular Badge Icon */}
          <div className="w-20 h-20 rounded-full bg-violet-500/15 dark:bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-6 shadow-xs backdrop-blur-xs">
            <MessageCircleMore size={42} strokeWidth={1.5} />
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

      {/* Main Content */}
      <section className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          {/* Left Column - Single Consolidated Card */}
          <div className="lg:w-1/3">
            <div className="bg-card rounded-3xl border border-gray-200/80 dark:border-slate-800 shadow-lg overflow-hidden divide-y divide-gray-100 dark:divide-slate-800">
              {/* Email */}
              <div className="p-6 flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-950/50 flex items-center justify-center text-[#7C3AED] dark:text-violet-400 shrink-0 border border-violet-200/40 dark:border-violet-800/30">
                  <Mail size={22} />
                </div>
                <div className="text-primary">
                  <h3 className="text-base font-bold mb-1">{t('emailTitle')}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">support@eventaty.com</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">info@eventaty.com</p>
                </div>
              </div>

              {/* Call */}
              <div className="p-6 flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-950/50 flex items-center justify-center text-[#7C3AED] dark:text-violet-400 shrink-0 border border-violet-200/40 dark:border-violet-800/30">
                  <Phone size={22} />
                </div>
                <div className="text-primary">
                  <h3 className="text-base font-bold mb-1">{t('callTitle')}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">+20 123 456 789</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>

              {/* Visit */}
              <div className="p-6 flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-950/50 flex items-center justify-center text-[#7C3AED] dark:text-violet-400 shrink-0 border border-violet-200/40 dark:border-violet-800/30">
                  <MapPin size={22} />
                </div>
                <div className="text-primary">
                  <h3 className="text-base font-bold mb-1">{t('visitTitle')}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">123 Event Street</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">Cairo, Egypt</p>
                </div>
              </div>

              {/* Social */}
              <div className="p-6">
                <h3 className="text-base font-bold text-primary mb-3">{t('followTitle')}</h3>
                <div className="flex gap-3">
                  {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-950/50 flex items-center justify-center text-[#7C3AED] dark:text-violet-400 hover:bg-[#7C3AED] hover:text-white dark:hover:bg-[#7C3AED] dark:hover:text-white transition-all duration-200 shadow-xs"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:w-2/3">
            <div className="bg-card rounded-3xl border border-gray-200/80 dark:border-slate-800 shadow-lg p-8 md:p-10">
              <h2 className="text-3xl font-bold text-primary mb-8">
                {t('formTitle')}
              </h2>

              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
