"use client";
import Link from "next/link";
import Image from "next/image";
import { LogOut, Menu, Sun, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { AuthOverlay } from "@/components/AuthOverlay";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "../ThemeToggle";

export default function Navbar() {
  const pathname = usePathname();
  const [collapse, setCollapse] = useState(false);
  const [collapsActive, setCollapsActive] = useState(false);
  const { user, logout } = useAuth();

  return (
    <nav className="bg-navFooter border-b border-slate-800 w-full z-50">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <div className="md:w-1/6 w-1/2">
          <Link href="/" className="flex items-center">
            <Image src="/Logo.svg" alt="Logo" width={140} height={40} />
          </Link>
        </div>

        <div>
          <button
            type="button"
            aria-label="Toggle dark mode"
            className="p-2 md:hidden rounded-lg border border-[#d4af37]
               text-[#d4af37] hover:bg-[#d4af37]/10
               transition shadow-md me-4"
          >
            <Sun size={18} />
          </button>
          {/*collapse button*/}
          <button
            type="button"
            aria-label="Toggle collapse"
            className={`md:hidden p-2 rounded-lg border border-secondary ${collapsActive ? "bg-secondary" : ""
              } ${collapsActive ? "text-primary" : "text-secondary"}
                     ${collapsActive
                ? "hover:bg-secondary/80"
                : "hover:bg-secondary/20"
              }
                     transition shadow-md`}
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
                  className={`block py-2 px-3 ${pathname === "/" ? "text-[#d4af37]" : "text-slate-300"
                    } hover:text-[#d4af37] transition`}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/events"
                  className={`block py-2 px-3 ${pathname === "/events" ? "text-[#d4af37]" : "text-slate-300"
                    } hover:text-[#d4af37] transition`}
                >
                  Events
                </Link>
              </li>

              <li>
                <Link
                  href="/venues"
                  className={`block py-2 px-3 ${pathname === "/venues" ? "text-[#d4af37]" : "text-slate-300"
                    } hover:text-[#d4af37] transition`}
                >
                  Venues
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className={`block py-2 px-3 ${pathname === "/about" ? "text-[#d4af37]" : "text-slate-300"
                    } hover:text-[#d4af37] transition`}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className={`block py-2 px-3 ${pathname === "/contact"
                    ? "text-[#d4af37]"
                    : "text-slate-300"
                    } hover:text-[#d4af37] transition`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-2/6 flex items-center md:justify-end md:gap-4 gap-2 mt-4 md:mt-0">
            <div className="flex items-center gap-3">
              <ThemeToggle />
              {!user && <AuthOverlay isNav={true} />}
            </div>

            {/* Logout */}
            {user && (
              <div className="flex items-center gap-3 flex-col md:flex-row ">
                <Link href="/dashboard">
                  <div className="flex items-center gap-2 md:mb-0 mb-4">
                    <div className="bg-secondary rounded-full p-1 w-8 h-8 mx-auto overflow-hidden">
                      <User className="w-full h-full object-cover" />
                    </div>
                    <span className="text-white">{user.firstName}</span>
                  </div>
                </Link>
                <span
                  className="block border border-red-400 rounded-lg py-2 px-3 cursor-pointer text-red-400 hover:bg-red-400 hover:text-white transition flex items-center gap-2"
                  onClick={() => logout()}
                >
                  <LogOut size={18} />
                  Logout
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
