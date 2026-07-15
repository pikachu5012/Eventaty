import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Twitter,
} from "lucide-react";
import { Link } from "@/navigation";
import Image from "next/image";
import { AuthOverlay } from "@/components/AuthOverlay";
import { getTranslations, getLocale } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations('Footer');
  const tNav = await getTranslations('Navigation');
  const locale = await getLocale();
  const isAr = locale === "ar";

  const categories = [
    "technology",
    "business",
    "health",
    "education",
    "entertainment",
    "science",
  ];
  return (
    <footer className="relative bg-navFooter pt-20 pb-52 overflow-hidden border-t border-slate-900">
      <div className="max-w-[1440px] mx-auto px-4 md:px-0 grid grid-cols-2 sm:grid-cols-5 gap-8 mb-16 relative z-10">
        {/* Column 1: Logo & copyright */}
        <div className="space-y-4 col-span-2 sm:col-span-1">
          <Image
            src="/Property 1=Light.svg"
            alt="logo"
            width={140}
            height={40}
            className="h-10 w-auto"
          />
          <p className="text-sm text-slate-500 pt-2 leading-relaxed">
            {isAr ? "© حقوق النشر إيفنتاتي 2026. كل الحقوق محفوظة." : "© copyright Eventaty 2026. All rights reserved."}
          </p>
        </div>

        {/* Column 2: Pages (Quick Links) */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm tracking-wider uppercase">
            {t('quickLinks')}
          </h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>
              <Link href="/" className="hover:underline hover:text-[#7C3AED] transition-colors">
                {tNav('home')}
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:underline hover:text-[#7C3AED] transition-colors">
                {tNav('events')}
              </Link>
            </li>
            <li>
              <Link href="/venues" className="hover:underline hover:text-[#7C3AED] transition-colors">
                {tNav('venues')}
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline hover:text-[#7C3AED] transition-colors">
                {tNav('about')}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline hover:text-[#7C3AED] transition-colors">
                {tNav('contact')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Socials */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm tracking-wider uppercase">
            {isAr ? "مواقع التواصل" : "Socials"}
          </h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#7C3AED] transition-colors">
                {isAr ? "فيسبوك" : "Facebook"}
              </a>
            </li>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#7C3AED] transition-colors">
                {isAr ? "إنستغرام" : "Instagram"}
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#7C3AED] transition-colors">
                {isAr ? "تويتر" : "Twitter"}
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline hover:text-[#7C3AED] transition-colors">
                {isAr ? "لينكد إن" : "LinkedIn"}
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Legal */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm tracking-wider uppercase">
            {isAr ? "الشروط والقوانين" : "Legal"}
          </h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>
              <Link href="#" className="hover:underline hover:text-[#7C3AED] transition-colors">
                {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline hover:text-[#7C3AED] transition-colors">
                {isAr ? "شروط الخدمة" : "Terms of Service"}
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:underline hover:text-[#7C3AED] transition-colors">
                {isAr ? "سياسة ملفات الارتباط" : "Cookie Policy"}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 5: Register */}
        <div className="space-y-4">
          <h4 className="text-white font-bold text-sm tracking-wider uppercase">
            {isAr ? "التسجيل" : "Register"}
          </h4>
          <ul className="space-y-2.5 text-sm text-slate-400">
            <li>
              <AuthOverlay isNav={false} defaultRegister={true} triggerLabel={isAr ? "إنشاء حساب" : "Sign Up"} />
            </li>
            <li>
              <AuthOverlay isNav={false} defaultRegister={false} triggerLabel={isAr ? "تسجيل الدخول" : "Login"} />
            </li>
            <li>
              <Link href="#" className="hover:underline hover:text-[#7C3AED] transition-colors">
                {isAr ? "نسيت كلمة المرور؟" : "Forgot Password"}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Massive watermark background text */}
      <div className="select-none pointer-events-none absolute bottom-[-20px] left-0 right-0 w-full text-center overflow-hidden z-0 px-[clamp(1rem,4vw,3rem)]">
        <h1 className="text-[clamp(3rem,10vw,9rem)] font-black uppercase tracking-widest leading-none font-sans bg-clip-text text-transparent bg-linear-to-b from-[#7C3AED] to-transparent opacity-10 whitespace-nowrap">
          Eventaty
        </h1>
      </div>
    </footer>
  );
}
