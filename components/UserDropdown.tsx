"use client";

import { useState, useRef, useEffect } from "react";
import { User, LogOut, LayoutDashboard, LogIn } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { AuthOverlay } from "./AuthOverlay";

export function UserDropdown({ isScrolled }: { isScrolled?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showAuthOverlay, setShowAuthOverlay] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { user, logout } = useAuth();
    const t = useTranslations('Navigation');
    const authT = useTranslations('Auth');
    const isAdmin = user?.role === "admin";
    const [mountTime] = useState(() => Date.now());

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

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        toast.success("Logout successful");
    };

    const handleDashboardClick = () => {
        setIsOpen(false);
    };

    // Get user initials
    const getInitials = () => {
        if (!user) return '';
        const firstInitial = user.firstName?.charAt(0).toUpperCase() || '';
        const lastInitial = user.lastName?.charAt(0).toUpperCase() || '';
        return `${firstInitial}${lastInitial}`;
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`rounded-full transition-all duration-300 focus:outline-none ${user
                    ? "bg-secondary text-primary w-10 h-10 flex items-center justify-center font-semibold text-sm hover:bg-secondary/90"
                    : isScrolled
                        ? "p-2 border border-slate-700 text-white hover:bg-white/10"
                        : "p-2 border border-slate-300 text-slate-700 hover:bg-slate-100"
                    }`}
                aria-label="User menu"
            >
                {user ? (
                    <span>{getInitials()}</span>
                ) : (
                    <User size={20} />
                )}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute ltr:right-0 rtl:left-0 mt-2 w-56 bg-card border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden"
                    >
                        <div className="p-2 space-y-1">
                            {user ? (
                                <>
                                    {/* Identity Header */}
                                    <div className="flex items-center gap-3 px-3 py-3 border-b border-zinc-200 dark:border-zinc-800/80 mb-2">
                                        <div className="w-9 h-9 rounded-full bg-violet-600/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold text-sm shrink-0">
                                            {getInitials()}
                                        </div>
                                        <div className="min-w-0 flex-1 text-start">
                                            <p className="text-sm font-bold text-foreground truncate">
                                                {user.firstName} {user.lastName}
                                            </p>
                                            <p className="text-xs text-muted-foreground truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Menu Options */}
                                    <Link
                                        href="/dashboard"
                                        onClick={() => setIsOpen(false)}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-primary hover:bg-secondary/10 hover:text-secondary-foreground rounded-lg transition-colors group text-start"
                                    >
                                        <User size={16} className="text-violet-500 shrink-0" />
                                        <span>{t('profile') || 'My Profile'}</span>
                                    </Link>

                                    {isAdmin && (
                                        <Link
                                            href={`/dashboard?select=true&t=${mountTime}`}
                                            onClick={handleDashboardClick}
                                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-primary hover:bg-secondary/10 hover:text-secondary-foreground rounded-lg transition-colors group text-start"
                                        >
                                            <LayoutDashboard size={16} className="text-violet-500 shrink-0" />
                                            <span>{t('dashboard') || 'Dashboard'}</span>
                                        </Link>
                                    )}

                                    <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-1 mx-2" />

                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors text-start"
                                    >
                                        <LogOut size={16} className="shrink-0" />
                                        <span>{t('logout')}</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => {
                                            setShowAuthOverlay(true);
                                            setIsOpen(false);
                                        }}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-primary hover:bg-secondary/10 hover:text-secondary-foreground rounded-lg transition-colors text-start"
                                    >
                                        <LogIn size={16} className="shrink-0" />
                                        <span>{authT('loginBtn')}</span>
                                    </button>
                                </>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AuthOverlay
                open={showAuthOverlay}
                onOpenChange={setShowAuthOverlay}
                noTrigger={true}
            />
        </div>
    );
}
