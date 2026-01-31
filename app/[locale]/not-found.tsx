"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
    const router = useRouter();

    return (
        <>
            <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center bg-background">
                <h1 className="text-[9.5rem] font-bold text-eventaty-gold leading-none select-none">
                    404
                </h1>
                <h2 className="text-3xl md:text-4xl font-semibold text-primary mb-4">
                    Oops! Page Not Found
                </h2>
                <p className="text-slate-600 max-w-md mb-8">
                    The page you're looking for seems to have wandered off. Don't worry, even
                    the best events sometimes get lost in the shuffle!
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-slate-300 bg-white text-slate-700 font-medium hover:bg-slate-100 hover:border-slate-400 transition shadow-sm w-full sm:w-auto cursor-pointer"
                    >
                        <ArrowLeft size={20} />
                        Go Back
                    </button>

                    <Link
                        href="/events"
                        className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-navFooter text-white font-medium hover:bg-eventaty-gold transition shadow-md w-full sm:w-auto"
                    >
                        <Search size={20} />
                        Browse Events
                    </Link>
                </div>
            </main>
        </>
    );
}
