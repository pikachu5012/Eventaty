"use client";
import Link from "next/link";
import Image from "next/image";
import { LogOut, Menu, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { AuthOverlay } from "@/components/AuthOverlay";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "../ThemeToggle";
import { toast } from "sonner";

export default function Navbar() {
  const pathname = usePathname();
  const [collapse, setCollapse] = useState(false);
  const [collapsActive, setCollapsActive] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const isAdmin = user?.role === "admin";

  return (
    <nav className="fixed top-0 left-0 right-0 bg-navFooter/90 backdrop-blur-md border-b border-slate-800 w-full z-50 transition-all duration-300">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo */}
        <div className="md:w-1/6 w-1/2">
          <Link href="/" className="flex items-center">
            <Image src="/Logo.svg" alt="Logo" width={140} height={40} />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />
          </div>
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
                  className={`block py-2 px-3 ${pathname === "/" ? "text-secondary" : "text-slate-300"
                    } hover:text-secondary transition`}
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/events"
                  className={`block py-2 px-3 ${pathname === "/events" ? "text-secondary" : "text-slate-300"
                    } hover:text-secondary transition`}
                >
                  Events
                </Link>
              </li>

              <li>
                <Link
                  href="/venues"
                  className={`block py-2 px-3 ${pathname === "/venues" ? "text-secondary" : "text-slate-300"
                    } hover:text-secondary transition`}
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
          <div className="w-full md:w-2/6 flex items-center md:justify-end lg:gap-4 gap-2 mt-4 md:mt-0">
            <div className="items-center gap-3 hidden md:flex">
              <ThemeToggle />
              {!user && <AuthOverlay isNav={true} />}
            </div>

            {/* Logout */}
            {user && (
              <div className="flex items-center gap-3 flex-col md:flex-row ">
                <Link href={isAdmin ? `/dashboard?select=true&t=${Date.now()}` : "/dashboard"}>
                  <div className="flex items-center gap-2 md:mb-0 mb-4">
                    <div className="bg-secondary rounded-full p-1 w-8 h-8 mx-auto overflow-hidden">
                      <User className="w-full h-full object-cover" />
                    </div>
                    <span className="text-white">{user.firstName}</span>
                  </div>
                </Link>
                <span
                  className="border border-red-400 rounded-lg py-2 px-3 cursor-pointer text-red-400 hover:bg-red-400 hover:text-white transition flex items-center gap-2"
                  onClick={() => {
                    logout();
                    toast.success("Logout successful");
                  }}
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
