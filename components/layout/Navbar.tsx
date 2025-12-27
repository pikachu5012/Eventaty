 
"use client";
import Link from "next/link";
import Image from "next/image";
import { LogIn, Sun } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const pathname = usePathname();
  return (
    <nav className="bg-[#0F172A] border-b border-slate-800 w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/Logo.svg" alt="Logo" width={140} height={40} />
        </Link>

        {/* Links */}
        <div className="hidden w-full md:block md:w-auto">
          <ul
             className="font-medium flex flex-col md:flex-row md:space-x-8
                       mt-4 md:mt-0"
          >
            <li>
              <Link
                href="/"
                className={`block py-2 px-3 ${
                  pathname === "/" ? "text-[#d4af37]" : "text-slate-300"
                } hover:text-[#d4af37] transition`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/events"
                className={`block py-2 px-3 ${
                  pathname === "/events" ? "text-[#d4af37]" : "text-slate-300"
                } hover:text-[#d4af37] transition`}
              >
                Events
              </Link>
            </li>

            <li>
              <Link
                href="/venues"
                className={`block py-2 px-3 ${
                  pathname === "/venues" ? "text-[#d4af37]" : "text-slate-300"
                } hover:text-[#d4af37] transition`}
              >
                Venues
              </Link>
            </li>

             <li>
              <Link
                href="/about"
                className={`block py-2 px-3 ${
                  pathname === "/about" ? "text-[#d4af37]" : "text-slate-300"
                } hover:text-[#d4af37] transition`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`block py-2 px-3 ${
                  pathname === "/contact" ? "text-[#d4af37]" : "text-slate-300"
                } hover:text-[#d4af37] transition`}
              >
                Contact
              </Link>
            </li>

            <li>
              <Link
                href="/register"
                className={`block py-2 px-3 ${
                  pathname === "/register" ? "text-[#d4af37]" : "text-slate-300"
                } hover:text-[#d4af37] transition`}
              >
                Register
              </Link>
            </li>

            <li className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Toggle dark mode"
                className="p-2 rounded-lg border border-[#d4af37]
               text-[#d4af37] hover:bg-[#d4af37]/10
               transition shadow-md"
              >
                <Sun size={18} />
              </button>

              <Link
                href="/login"
                className="flex items-center gap-2 py-2 px-4 rounded-lg font-semibold
               bg-[#d4af37] text-[#0F172A]
               hover:bg-yellow-500 transition shadow-md"
              >
                <LogIn size={18} />
                Login
              </Link>
            </li>

            {/* Logout */}
            <li>
              <span
                className="block py-2 px-3 cursor-pointer text-slate-300
                           hover:text-red-400 transition"
              >
                Logout
              </span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
