"use client";

import { useState, useRef, useEffect } from "react";
import { User, LogOut, LayoutDashboard, LogIn } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { AuthOverlay } from "./AuthOverlay";

export function UserDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [showAuthOverlay, setShowAuthOverlay] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { user, logout } = useAuth();
    const t = useTranslations('Navigation');
    const authT = useTranslations('Auth');
    const router = useRouter();
    const isAdmin = user?.role === "admin";

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
                    : "p-2 border border-slate-700 text-white hover:bg-white/10"
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
                        className="absolute ltr:right-0 rtl:left-0 mt-2 w-56 bg-card border border-slate-800 rounded-xl shadow-xl z-50 overflow-hidden"
                    >
                        <div className="p-2 space-y-1">
                            {user ? (
                                <>
                                    {/* Menu Items */}
                                    <Link
                                        href={isAdmin ? `/dashboard?select=true&t=${Date.now()}` : "/dashboard"}
                                        onClick={handleDashboardClick}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-primary hover:bg-secondary/10 hover:text-secondary rounded-lg transition-colors group"
                                    >
                                        <LayoutDashboard size={16} />
                                        <span>{t('dashboard') || 'Dashboard'}</span>
                                    </Link>

                                    <div className="h-px bg-slate-800 my-1 mx-2" />

                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                    >
                                        <LogOut size={16} />
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
                                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:bg-secondary/10 hover:text-secondary rounded-lg transition-colors"
                                    >
                                        <LogIn size={16} />
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
