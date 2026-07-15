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
            {/* Desktop Logo */}
            <Image
              src={isDarkNavbar ? "/Property 1=Light.svg" : "/Property 1=Dark.svg"}
              alt="Logo"
              width={140}
              height={40}
              className="hidden md:block transition-all duration-300"
            />
            {/* Mobile Logo */}
            <Image
              src="/Property 1=Light small.svg"
              alt="Logo"
              width={42}
              height={40}
              className="block md:hidden h-10 w-auto transition-all duration-300"
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
          className={`${
            collapse
              ? "absolute top-full left-0 right-0 bg-white dark:bg-[#18181b] border-b border-gray-200 dark:border-slate-800 shadow-xl px-6 py-6 flex flex-col z-50 animate-in fade-in slide-in-from-top-5 duration-200"
              : "hidden"
          } w-full md:flex md:w-5/6 md:relative md:top-auto md:bg-transparent md:border-b-0 md:shadow-none md:p-0 md:flex-row md:justify-between md:z-auto`}
        >
          <div className="w-full md:w-4/6 flex lg:justify-center lg:ps-4">
            <ul className="font-medium flex flex-col w-full md:w-auto md:flex-row md:space-x-0 lg:space-x-4 mt-0 md:mt-0 gap-1 md:gap-0">
              <li>
                <Link
                  href="/"
                  className={`block py-2.5 px-3 rounded-lg md:rounded-none hover:bg-violet-50 dark:hover:bg-violet-950/20 md:hover:bg-transparent transition ${getLinkClass("/")}`}
                  onClick={() => {
                    setCollapse(false);
                    setCollapsActive(false);
                  }}
                >
                  {t('home')}
                </Link>
              </li>

              <li>
                <Link
                  href="/events"
                  className={`block py-2.5 px-3 rounded-lg md:rounded-none hover:bg-violet-50 dark:hover:bg-violet-950/20 md:hover:bg-transparent transition ${getLinkClass("/events")}`}
                  onClick={() => {
                    setCollapse(false);
                    setCollapsActive(false);
                  }}
                >
                  {t('events')}
                </Link>
              </li>

              <li>
                <Link
                  href="/venues"
                  className={`block py-2.5 px-3 rounded-lg md:rounded-none hover:bg-violet-50 dark:hover:bg-violet-950/20 md:hover:bg-transparent transition ${getLinkClass("/venues")}`}
                  onClick={() => {
                    setCollapse(false);
                    setCollapsActive(false);
                  }}
                >
                  {t('venues')}
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className={`block py-2.5 px-3 rounded-lg md:rounded-none hover:bg-violet-50 dark:hover:bg-violet-950/20 md:hover:bg-transparent transition ${getLinkClass("/about")}`}
                  onClick={() => {
                    setCollapse(false);
                    setCollapsActive(false);
                  }}
                >
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`block py-2.5 px-3 rounded-lg md:rounded-none hover:bg-violet-50 dark:hover:bg-violet-950/20 md:hover:bg-transparent transition ${getLinkClass("/contact")}`}
                  onClick={() => {
                    setCollapse(false);
                    setCollapsActive(false);
                  }}
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-2/6 flex items-center md:justify-end lg:gap-4 gap-2 mt-4 md:mt-0 px-3 md:px-0">
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
