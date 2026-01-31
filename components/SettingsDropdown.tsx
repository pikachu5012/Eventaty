"use client";

import { useState, useRef, useEffect } from "react";
import { Settings, Languages, Sun, Moon, Check, Monitor } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/navigation";
import { useTheme } from "./ThemeProvider";
import { motion, AnimatePresence } from "framer-motion";

export function SettingsDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const locale = useLocale();
    const pathname = usePathname();
    const router = useRouter();
    const { theme, setTheme } = useTheme();
    const t = useTranslations('Navigation');

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleLanguage = () => {
        router.replace(pathname, { locale: locale === 'en' ? 'ar' : 'en' });
        setIsOpen(false);
    };

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full border border-secondary text-secondary hover:bg-secondary/20 transition-all duration-300 focus:outline-none"
                aria-label="Settings"
            >
                <Settings
                    size={20}
                    className={`transition-transform duration-500 ${isOpen ? 'rotate-90' : 'rotate-0'}`}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute ltr:right-0 rtl:left-0 mt-2 w-48 bg-card border border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden"
                    >
                        <div className="p-2 space-y-1">
                            {/* Language Section */}
                            <div className="px-3 py-2 text-xs font-semibold text-primary uppercase tracking-wider">
                                {t('language') || 'Language'}
                            </div>
                            <button
                                onClick={toggleLanguage}
                                className="w-full flex items-center justify-between px-3 py-2 text-sm text-primary hover:bg-secondary/10 hover:text-secondary rounded-lg transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <Languages size={16} className="text-secondary" />
                                    <span>{locale === 'en' ? 'العربية (AR)' : 'English (EN)'}</span>
                                </div>
                            </button>

                            <div className="h-px bg-slate-800 my-1 mx-2" />

                            {/* Theme Section */}
                            <div className="px-3 py-2 text-xs font-semibold text-primary uppercase tracking-wider">
                                {t('theme') || 'Theme'}
                            </div>
                            <button
                                onClick={() => setTheme('light')}
                                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${theme === 'light' ? 'bg-secondary/10 text-secondary' : 'text-primary hover:bg-secondary/5 hover:text-secondary'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Sun size={16} />
                                    <span>{t('lightMode') || 'Light'}</span>
                                </div>
                                {mounted && theme === 'light' && <Check size={14} />}
                            </button>
                            <button
                                onClick={() => setTheme('dark')}
                                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${mounted && theme === 'dark' ? 'bg-secondary/10 text-secondary' : 'text-primary hover:bg-secondary/5 hover:text-secondary'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Moon size={16} />
                                    <span>{t('darkMode') || 'Dark'}</span>
                                </div>
                                {mounted && theme === 'dark' && <Check size={14} />}
                            </button>
                            <button
                                onClick={() => setTheme('system')}
                                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${mounted && theme === 'system' ? 'bg-secondary/10 text-secondary' : 'text-primary hover:bg-secondary/5 hover:text-secondary'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <Monitor size={16} />
                                    <span>{t('systemMode') || 'System'}</span>
                                </div>
                                {mounted && theme === 'system' && <Check size={14} />}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
