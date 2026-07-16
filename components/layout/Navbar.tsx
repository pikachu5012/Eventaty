"use client";
import { Link, usePathname, useRouter } from "@/navigation";
import Image from "next/image";
import { 
  X, Home, Calendar, MapPin, Info, PhoneCall, 
  ChevronDown, ChevronUp, Settings, Languages, Sun, Moon, 
  Monitor, LogOut, User, LayoutDashboard 
} from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect } from "react";
import { SettingsDropdown } from "../SettingsDropdown";
import { UserDropdown } from "../UserDropdown";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { AuthOverlay } from "@/components/AuthOverlay";

import { useTheme } from "../ThemeProvider";

export default function Navbar() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [collapse, setCollapse] = useState(false);
  const [collapsActive, setCollapsActive] = useState(false);
  const [showSettingsAccordion, setShowSettingsAccordion] = useState(false);
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const [defaultRegister, setDefaultRegister] = useState(false);
  const [mountTime] = useState(() => Date.now());
 
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();
  const isAdmin = user?.role === "admin";
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  useEffect(() => {
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

  const getInitials = () => {
    if (!user) return '';
    const firstInitial = user.firstName?.charAt(0).toUpperCase() || '';
    const lastInitial = user.lastName?.charAt(0).toUpperCase() || '';
    return `${firstInitial}${lastInitial}`;
  };

  const handleLogout = () => {
    logout();
    setCollapse(false);
    setCollapsActive(false);
    toast.success("Logout successful");
  };

  const toggleLanguage = () => {
    router.replace(pathname, { locale: locale === 'en' ? 'ar' : 'en' });
  };

  const isDarkTheme = mounted && (theme === 'dark' || (theme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches));
  const isDarkNavbar = isScrolled || isDarkTheme;

  const shouldReduceMotion = useReducedMotion();
  const isRtl = locale === 'ar';



  const drawerVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.2 } },
        exit: { opacity: 0, transition: { duration: 0.15 } }
      }
    : {
        hidden: { x: isRtl ? "-100%" : "100%" },
        visible: { 
          x: 0,
          transition: {
            type: "tween" as const,
            ease: "easeOut" as const,
            duration: 0.3,
            delay: 0.12,
            staggerChildren: 0.04,
            delayChildren: 0.2
          }
        },
        exit: { 
          x: isRtl ? "-100%" : "100%",
          transition: {
            type: "tween" as const,
            ease: "easeIn" as const,
            duration: 0.2,
            delay: 0.06
          }
        }
      };

  const itemVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      }
    : {
        hidden: { opacity: 0, x: isRtl ? -20 : 20 },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: {
            type: "tween" as const,
            ease: "easeOut" as const,
            duration: 0.2
          }
        }
      };

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
        <div className="md:w-auto w-1/2 shrink-0">
          <Link href="/" className="flex items-center">
            {/* Desktop Logo */}
            <Image
              src={isDarkNavbar ? "/Property 1=Light.svg" : "/Property 1=Dark.svg"}
              alt="Logo"
              width={140}
              height={40}
              className="hidden md:block h-10 w-auto transition-all duration-300"
              priority
              loading="eager"
            />
            {/* Mobile Logo */}
            <Image
              src="/Property 1=Light small.svg"
              alt="Logo"
              width={42}
              height={40}
              className="block md:hidden h-10 w-auto transition-all duration-300"
              priority
              loading="eager"
            />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {/*collapse button*/}
          <button
            type="button"
            aria-label="Toggle collapse"
            className={`md:hidden p-2 rounded-full border transition-all duration-300 shadow-md flex items-center justify-center w-10 h-10 ${
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
            <div className="relative w-5 h-4 flex flex-col justify-between items-center cursor-pointer">
              {/* Line 1 */}
              <motion.span
                animate={collapse ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "block h-0.5 w-5 rounded-full transition-colors",
                  collapsActive ? "bg-white" : isDarkNavbar ? "bg-white" : "bg-slate-700 dark:bg-white"
                )}
                style={{ originX: "50%", originY: "50%" }}
              />
              {/* Line 2 */}
              <motion.span
                animate={collapse ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  "block h-0.5 w-5 rounded-full transition-colors",
                  collapsActive ? "bg-white" : isDarkNavbar ? "bg-white" : "bg-slate-700 dark:bg-white"
                )}
              />
              {/* Line 3 */}
              <motion.span
                animate={collapse ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "block h-0.5 w-5 rounded-full transition-colors",
                  collapsActive ? "bg-white" : isDarkNavbar ? "bg-white" : "bg-slate-700 dark:bg-white"
                )}
                style={{ originX: "50%", originY: "50%" }}
              />
            </div>
          </button>
        </div>

        {/* Desktop Links (Visible only on md and above) */}
        <div className="hidden md:flex flex-grow md:relative md:top-auto md:bg-transparent md:border-b-0 md:shadow-none md:p-0 md:flex-row md:justify-between md:z-auto ml-6 lg:ml-10">
          <div className="flex-grow flex justify-center px-4">
            <ul className="font-medium flex flex-row items-center mt-0 gap-1.5 lg:gap-6 xl:gap-8">
              <li>
                <Link
                  href="/"
                  className={`block py-2.5 px-2 lg:px-3 rounded-lg md:rounded-none md:hover:bg-transparent transition ${getLinkClass("/")}`}
                >
                  {t('home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className={`block py-2.5 px-2 lg:px-3 rounded-lg md:rounded-none md:hover:bg-transparent transition ${getLinkClass("/events")}`}
                >
                  {t('events')}
                </Link>
              </li>
              <li>
                <Link
                  href="/venues"
                  className={`block py-2.5 px-2 lg:px-3 rounded-lg md:rounded-none md:hover:bg-transparent transition ${getLinkClass("/venues")}`}
                >
                  {t('venues')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className={`block py-2.5 px-2 lg:px-3 rounded-lg md:rounded-none md:hover:bg-transparent transition ${getLinkClass("/about")}`}
                >
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`block py-2.5 px-2 lg:px-3 rounded-lg md:rounded-none md:hover:bg-transparent transition ${getLinkClass("/contact")}`}
                >
                  {t('contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-2 lg:gap-4 shrink-0 px-3 md:px-0">
            <div className="items-center gap-3 hidden md:flex">
              <SettingsDropdown isScrolled={isDarkNavbar} />
              <UserDropdown isScrolled={isDarkNavbar} />
            </div>
          </div>
        </div>

        {/* Mobile Drawer and Overlay with AnimatePresence */}
        <AnimatePresence>
          {collapse && (
            <>
              {/* Dark Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  setCollapse(false);
                  setCollapsActive(false);
                }}
                className="fixed inset-0 z-40 md:hidden cursor-pointer animate-none"
                style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
              />

              {!shouldReduceMotion && (
                <>
                  {/* Curtain Layer 1: Ink black */}
                  <motion.div
                    initial={{ x: isRtl ? "-100%" : "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: isRtl ? "-100%" : "100%" }}
                    transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
                    className="fixed top-0 bottom-0 h-screen w-80 max-w-[85vw] bg-zinc-950 dark:bg-black z-45 md:hidden"
                    style={{ left: isRtl ? 0 : 'auto', right: isRtl ? 'auto' : 0 }}
                  />

                  {/* Curtain Layer 2: Plum / Deep Violet */}
                  <motion.div
                    initial={{ x: isRtl ? "-100%" : "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: isRtl ? "-100%" : "100%" }}
                    transition={{ type: "tween", ease: "easeOut", duration: 0.3, delay: 0.04 }}
                    className="fixed top-0 bottom-0 h-screen w-80 max-w-[85vw] bg-violet-950 z-46 md:hidden"
                    style={{ left: isRtl ? 0 : 'auto', right: isRtl ? 'auto' : 0 }}
                  />

                  {/* Curtain Layer 3: Violet-500 */}
                  <motion.div
                    initial={{ x: isRtl ? "-100%" : "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: isRtl ? "-100%" : "100%" }}
                    transition={{ type: "tween", ease: "easeOut", duration: 0.3, delay: 0.08 }}
                    className="fixed top-0 bottom-0 h-screen w-80 max-w-[85vw] bg-violet-500 z-47 md:hidden"
                    style={{ left: isRtl ? 0 : 'auto', right: isRtl ? 'auto' : 0 }}
                  />
                </>
              )}

              {/* Mobile Drawer Panel */}
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={drawerVariants}
                className={cn(
                  "fixed top-0 bottom-0 h-screen w-80 max-w-[85vw] bg-white dark:bg-[#18181b] shadow-2xl z-50 md:hidden flex flex-col p-6 border-slate-200 dark:border-slate-800",
                  isRtl ? "left-0 border-r" : "right-0 border-l"
                )}
              >
                {/* Drawer Header with Close Button */}
                <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-slate-800/80 shrink-0">
                  <Link 
                    href="/" 
                    className="flex items-center"
                    onClick={() => {
                      setCollapse(false);
                      setCollapsActive(false);
                    }}
                  >
                    <Image
                      src={isDarkTheme ? "/Property 1=Light.svg" : "/Property 1=Dark.svg"}
                      alt="Logo"
                      width={120}
                      height={34}
                      className="h-8 w-auto transition-all duration-300"
                      priority
                    />
                  </Link>
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => {
                      setCollapse(false);
                      setCollapsActive(false);
                    }}
                    className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800/60 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Identity Header or Auth Buttons */}
                {user ? (
                  <div className="flex items-center gap-3 py-4 border-b border-gray-100 dark:border-slate-800/80 shrink-0">
                    <div className="w-12 h-12 rounded-full bg-violet-600/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-base shrink-0">
                      {getInitials()}
                    </div>
                    <div className="min-w-0 flex-1 text-start">
                      <p className="text-base font-bold text-foreground truncate">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 py-4 border-b border-gray-100 dark:border-slate-800/80 shrink-0">
                    <button
                      onClick={() => {
                        setDefaultRegister(false);
                        setShowAuthOverlay(true);
                        setCollapse(false);
                        setCollapsActive(false);
                      }}
                      className="flex-1 py-2.5 px-4 text-xs font-semibold rounded-lg bg-zinc-100 dark:bg-zinc-800/60 text-foreground hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                    >
                      {t('login') || 'Login'}
                    </button>
                    <button
                      onClick={() => {
                        setDefaultRegister(true);
                        setShowAuthOverlay(true);
                        setCollapse(false);
                        setCollapsActive(false);
                      }}
                      className="flex-1 py-2.5 px-4 text-xs font-semibold rounded-lg bg-violet-600 text-white hover:bg-violet-700 transition-colors"
                    >
                      {locale === "ar" ? "تسجيل" : "Register"}
                    </button>
                  </div>
                )}

                <div className="flex-grow flex flex-col justify-between overflow-y-auto mt-4 gap-4">
                  {/* Drawer Links */}
                  <ul className="font-medium flex flex-col w-full gap-1">
                    {[
                      { path: "/", label: t('home'), icon: Home },
                      { path: "/events", label: t('events'), icon: Calendar },
                      { path: "/venues", label: t('venues'), icon: MapPin },
                      { path: "/about", label: t('about'), icon: Info },
                      { path: "/contact", label: t('contact'), icon: PhoneCall },
                    ].map((item) => {
                      const isActive = pathname === item.path;
                      const IconComponent = item.icon;
                      return (
                        <motion.li key={item.path} variants={itemVariants}>
                          <Link
                            href={item.path}
                            className={cn(
                              "flex items-center gap-3 py-2.5 px-4 rounded-xl transition-all duration-200 w-full text-start",
                              isActive
                                ? "text-violet-500 bg-violet-500/14 font-bold"
                                : "text-slate-600 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-950/20 hover:text-violet-500"
                            )}
                            onClick={() => {
                              setCollapse(false);
                              setCollapsActive(false);
                            }}
                          >
                            <IconComponent className={cn("w-4 h-4 shrink-0", isActive ? "text-violet-500" : "text-slate-400 dark:text-slate-500")} />
                            <span>{item.label}</span>
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>

                  {/* Account Actions Section (Only for logged-in users) */}
                  {user && (
                    <div className="border-t border-gray-100 dark:border-slate-800/80 pt-4 flex flex-col w-full gap-1">
                      {/* My Profile */}
                      <motion.div variants={itemVariants}>
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 py-2.5 px-4 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-950/20 hover:text-violet-500 transition-colors text-start w-full block"
                          onClick={() => {
                            setCollapse(false);
                            setCollapsActive(false);
                          }}
                        >
                          <User size={16} className="text-slate-400 dark:text-slate-500 shrink-0" />
                          <span>{t('profile') || 'My Profile'}</span>
                        </Link>
                      </motion.div>

                      {/* Admin Dashboard */}
                      {isAdmin && (
                        <motion.div variants={itemVariants}>
                          <Link
                            href={`/dashboard?select=true&t=${mountTime}`}
                            className="flex items-center gap-3 py-2.5 px-4 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-950/20 hover:text-violet-500 transition-colors text-start w-full block"
                            onClick={() => {
                              setCollapse(false);
                              setCollapsActive(false);
                            }}
                          >
                            <LayoutDashboard size={16} className="text-slate-400 dark:text-slate-500 shrink-0" />
                            <span>{t('dashboard') || 'Dashboard'}</span>
                          </Link>
                        </motion.div>
                      )}

                      {/* Settings (expanding options) */}
                      <motion.div variants={itemVariants} className="w-full">
                        <button
                          onClick={() => setShowSettingsAccordion(!showSettingsAccordion)}
                          className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-950/20 hover:text-violet-500 transition-colors text-start"
                        >
                          <div className="flex items-center gap-3">
                            <Settings size={16} className="text-slate-400 dark:text-slate-500 shrink-0" />
                            <span>{t('settings') || 'Settings'}</span>
                          </div>
                          {showSettingsAccordion ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                        </button>
                        
                        {/* Expanded Settings options */}
                        <AnimatePresence>
                          {showSettingsAccordion && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden bg-slate-50 dark:bg-zinc-900/50 rounded-xl mt-1 mx-2 space-y-3 p-3 border border-slate-100 dark:border-slate-800"
                            >
                              {/* Language */}
                              <div className="space-y-1">
                                <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2">
                                  {t('language') || 'Language'}
                                </div>
                                <button
                                  onClick={toggleLanguage}
                                  className="w-full flex items-center justify-between py-2 px-2 text-xs text-foreground hover:bg-violet-500/10 rounded-lg transition-colors text-start"
                                >
                                  <div className="flex items-center gap-2">
                                    <Languages size={14} className="text-violet-500" />
                                    <span>{locale === 'en' ? 'العربية (AR)' : 'English (EN)'}</span>
                                  </div>
                                </button>
                              </div>

                              {/* Theme selection */}
                              <div className="space-y-1">
                                <div className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-2">
                                  {t('theme') || 'Theme'}
                                </div>
                                <div className="grid grid-cols-3 gap-1">
                                  {[
                                    { id: 'light', label: t('lightMode') || 'Light', icon: Sun },
                                    { id: 'dark', label: t('darkMode') || 'Dark', icon: Moon },
                                    { id: 'system', label: t('systemMode') || 'System', icon: Monitor }
                                  ].map((th) => {
                                    const IconComponent = th.icon;
                                    const isSelected = theme === th.id;
                                    return (
                                      <button
                                        key={th.id}
                                        onClick={() => setTheme(th.id)}
                                        className={cn(
                                          "flex flex-col items-center justify-center py-2 px-1 rounded-lg border text-[10px] gap-1 transition-all",
                                          isSelected
                                            ? "bg-violet-500/10 text-violet-500 border-violet-500/30 font-medium"
                                            : "border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-zinc-800"
                                        )}
                                      >
                                        <IconComponent size={12} />
                                        <span>{th.label}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>

                      {/* Divider */}
                      <div className="h-px bg-gray-100 dark:bg-slate-800/80 my-1 mx-2" />

                      {/* Logout */}
                      <motion.div variants={itemVariants}>
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-3 py-2.5 px-4 rounded-xl text-red-500 hover:bg-red-500/10 transition-colors text-start w-full"
                        >
                          <LogOut size={16} className="shrink-0" />
                          <span>{t('logout') || 'Logout'}</span>
                        </button>
                      </motion.div>
                    </div>
                  )}
                </div>

                {/* Explore events CTA Button */}
                <motion.div variants={itemVariants} className="mt-auto pt-6 border-t border-gray-100 dark:border-slate-800 shrink-0">
                  <Link
                    href="/events"
                    className="w-full py-3 rounded-full bg-violet-600 hover:bg-violet-700 text-white font-semibold text-center transition-colors duration-200 cursor-pointer shadow-lg shadow-violet-600/10 block"
                    onClick={() => {
                      setCollapse(false);
                      setCollapsActive(false);
                    }}
                  >
                    {locale === "ar" ? "استكشف الفعاليات" : "Explore events"}
                  </Link>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </nav>
      <AuthOverlay
        open={showAuthOverlay}
        onOpenChange={setShowAuthOverlay}
        noTrigger={true}
        defaultRegister={defaultRegister}
      />
    </>
  );
}
