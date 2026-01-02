"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
    const router = useRouter();

    return (
        <>
            <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-[#fdfbf7]">
                <h1 className="text-[150px] font-bold text-[#d4af37] leading-none select-none">
                    404
                </h1>
                <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 mb-4">
                    Oops! Page Not Found
                </h2>
                <p className="text-slate-600 max-w-md mb-8">
                    The page you're looking for seems to have wandered off. Don't worry, even
                    the best events sometimes get lost in the shuffle!
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-50 hover:border-slate-400 transition shadow-sm w-full sm:w-auto"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>

                    <Link
                        href="/events"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#0F172A] text-white font-medium hover:bg-[#1e293b] transition shadow-md w-full sm:w-auto"
                    >
                        <Search size={20} />
                        Browse Events
                    </Link>
                </div>
            </main>
        </>
    );
}
