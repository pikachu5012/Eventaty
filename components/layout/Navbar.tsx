"use client";
import { Link, usePathname, useRouter } from "@/navigation";
import Image from "next/image";
import { LogOut, Menu, User, Languages } from "lucide-react";
import { AuthOverlay } from "@/components/AuthOverlay";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "../ThemeToggle";
import { toast } from "sonner";
import { SettingsDropdown } from "../SettingsDropdown";
import { UserDropdown } from "../UserDropdown";

import { useTheme } from "../ThemeProvider";

export default function Navbar() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const [collapse, setCollapse] = useState(false);
  const [collapsActive, setCollapsActive] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const isAdmin = user?.role === "admin";

  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const hero = document.getElementById('hero-sentinel');
          let threshold = 80;
          if (hero) {
            threshold = hero.getBoundingClientRect().top + window.scrollY;
          }

          setIsScrolled((prev) => {
            if (currentScrollY >= threshold) {
              return true;
            } else if (currentScrollY < Math.max(0, threshold - 20)) {
              return false;
            }
            return prev;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  const isDarkTheme = mounted && (theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches));
  const isDarkNavbar = isScrolled || isDarkTheme;

  const getLinkClass = (path: string) => {
    const isActive = pathname === path;
    if (isDarkNavbar) {
      return isActive
        ? "text-violet-500 font-semibold"
        : "text-slate-300 hover:text-violet-500";
    } else {
      return isActive
        ? "text-violet-500 font-semibold"
        : "text-slate-500 hover:text-violet-500";
    }
  };

  return (
    <>
      <div id="navbar-sentinel" className="absolute top-0 left-0 right-0 h-20 pointer-events-none -z-50" />
      <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 flex items-center ${
      isScrolled
        ? "h-16 bg-[#18181b]/95 backdrop-blur-md border-b border-white/10 shadow-[0_1px_8px_rgba(0,0,0,0.15)]"
        : isDarkTheme
          ? "h-[88px] bg-[#18181b] border-b-0 shadow-none"
          : "h-[88px] bg-white border-b-0 shadow-none"
    }`}>
      <div className="max-w-[1440px] flex flex-wrap items-center justify-between mx-auto px-4 md:px-0 w-full">
        {/* Logo */}
        <div className="md:w-1/6 w-1/2">
          <Link href="/" className="flex items-center">
            <Image
              src={isDarkNavbar ? "/Property 1=Light.svg" : "/Property 1=Dark.svg"}
              alt="Logo"
              width={140}
              height={40}
              className="transition-all duration-300"
            />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 md:hidden">
            <SettingsDropdown isScrolled={isDarkNavbar} />
            <UserDropdown isScrolled={isDarkNavbar} />
          </div>
          {/*collapse button*/}
          <button
            type="button"
            aria-label="Toggle collapse"
            className={`md:hidden p-2 rounded-full border transition shadow-md ${
              isDarkNavbar
                ? collapsActive
                  ? "bg-violet-600 text-white border-violet-600 hover:bg-violet-600/80"
                  : "text-white border-slate-700 hover:bg-white/10"
                : collapsActive
                  ? "bg-violet-600 text-white border-violet-600 hover:bg-violet-600/80"
                  : "text-slate-700 border-slate-300 hover:bg-slate-100"
            }`}
            onClick={() => {
              setCollapse(!collapse);
              setCollapsActive(!collapsActive);
            }}
          >
            <Menu size={18} />
          </button>
        </div>
        {/* Links */}
        <div
          className={`${collapse ? "block" : "hidden"
            } w-full md:flex md:w-5/6 px-4 flex flex-col md:flex-row md:justify-between`}
        >
          <div className="w-full md:w-4/6 flex lg:justify-center lg:ps-4">
            <ul className="font-medium flex flex-col md:flex-row md:space-x-0 lg:space-x-4 mt-4 md:mt-0">
              <li>
                <Link
                  href="/"
                  className={`block py-2 px-3 transition ${getLinkClass("/")}`}
                >
                  {t('home')}
                </Link>
              </li>

              <li>
                <Link
                  href="/events"
                  className={`block py-2 px-3 transition ${getLinkClass("/events")}`}
                >
                  {t('events')}
                </Link>
              </li>

              <li>
                <Link
                  href="/venues"
                  className={`block py-2 px-3 transition ${getLinkClass("/venues")}`}
                >
                  {t('venues')}
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className={`block py-2 px-3 transition ${getLinkClass("/about")}`}
                >
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`block py-2 px-3 transition ${getLinkClass("/contact")}`}
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-2/6 flex items-center md:justify-end lg:gap-4 gap-2 mt-4 md:mt-0">
            <div className="items-center gap-3 hidden md:flex">
              <SettingsDropdown isScrolled={isDarkNavbar} />
              <UserDropdown isScrolled={isDarkNavbar} />
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}
