import Image from "next/image";
import React from "react";
import starsIcon from "@/public/about images/Stars.svg";
import {
  MessageCircleMore,
  Mail,
  Phone,
  MapPin,
  Send,
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
      <section className="relative bg-gradient-to-r from-eventaty-dark via-[#1E293B] to-eventaty-dark py-20 overflow-hidden">
        <Image
          className="absolute top-4 right-4 md:right-10 opacity-50"
          src={starsIcon}
          alt="stars icon"
          width={48}
          height={48}
        />
        <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">
          <MessageCircleMore
            size={80}
            className="text-eventaty-gold mb-6"
            strokeWidth={1.5}
          />
          <h1 className="text-eventaty-cream text-4xl md:text-5xl font-bold mb-4">
            {t('heroTitle')}
          </h1>
          <p className="text-eventaty-cream/80 text-lg font-light max-w-lg mx-auto leading-relaxed">
            {t('heroSubtitle')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16 -mt-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          {/* Left Column*/}
          <div className="lg:w-1/3 space-y-6">
            {/* Email */}
            <div className="bg-card p-6 rounded-2xl shadow-sm flex items-start gap-5 border border-white/20 ">
              <div className="w-12 h-12 rounded-full bg-strongCream flex items-center justify-center text-eventaty-gold shrink-0">
                <Mail size={24} />
              </div>
              <div className="text-primary">
                <h3 className="text-lg font-bold mb-1">{t('emailTitle')}</h3>
                <p className="text-gray-500 text-sm">support@eventaty.com</p>
                <p className="text-gray-500 text-sm">info@eventaty.com</p>
              </div>
            </div>

            {/* Call */}
            <div className="bg-card p-6 rounded-2xl shadow-sm flex items-start gap-5 border border-white/20">
              <div className="w-12 h-12 rounded-full bg-strongCream flex items-center justify-center text-eventaty-gold shrink-0">
                <Phone size={24} />
              </div>
              <div className="text-primary">
                <h3 className="text-lg font-bold mb-1">{t('callTitle')}</h3>
                <p className="text-gray-500 text-sm">+20 123 456 789</p>
                <p className="text-gray-500 text-sm">Mon-Fri, 9AM-6PM EST</p>
              </div>
            </div>

            {/* Visit */}
            <div className="bg-card p-6 rounded-2xl shadow-sm flex items-start gap-5 border border-white/20">
              <div className="w-12 h-12 rounded-full bg-strongCream flex items-center justify-center text-eventaty-gold shrink-0">
                <MapPin size={24} />
              </div>
              <div className="text-primary">
                <h3 className="text-lg font-bold mb-1">{t('visitTitle')}</h3>
                <p className="text-gray-500 text-sm">123 Event Street</p>
                <p className="text-gray-500 text-sm">Cairo, Egypt</p>
              </div>
            </div>

            {/* Social*/}
            <div className="bg-card p-6 rounded-2xl shadow-sm flex items-start gap-5 border border-white/20">
              <h3 className="text-lg font-bold text-primary mb-4">{t('followTitle')}</h3>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 rounded-full bg-eventaty-cream flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:w-2/3">
            <div className="bg-card rounded-3xl shadow-lg p-8 md:p-10">
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
