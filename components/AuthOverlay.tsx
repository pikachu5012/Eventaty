"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import { LogIn, X } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export function AuthOverlay({
  isNav,
  open,
  onOpenChange,
  noTrigger,
}: {
  isNav?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  noTrigger?: boolean;
}) {
  const [regester, setRegester] = useState(false);
  const [internalOpen, setInternalOpen] = useState(false);
  const { user } = useAuth();

  const isControlled = open !== undefined;
  const finalOpen = isControlled ? open : internalOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalOpen;

  useEffect(() => {
    if (user && handleOpenChange) {
      handleOpenChange(false);
    }
  }, [user]);

  useEffect(() => {
    if (finalOpen) {
      setRegester(false);
    }
  }, [finalOpen]);

  if (user && !noTrigger) return null;

  return (
    <Dialog open={finalOpen} onOpenChange={handleOpenChange}>
      {!noTrigger && (
        <DialogTrigger asChild>
          {isNav ? (
            <Link
              href=""
              className="flex items-center gap-2 py-2 px-4 rounded-lg font-semibold
          bg-[#d4af37] text-[#0F172A]
          hover:bg-yellow-500 transition shadow-md"
            >
              <LogIn size={18} />
              Login
            </Link>
          ) : (
            <Link href="" className="hover:underline hover:text-secondary">
              Login
            </Link>
          )}
        </DialogTrigger>
      )}
      <DialogContent
        className="p-0 border-0 overflow-y-auto max-h-[90vh] flex flex-col custom-scrollbar"
        data-lenis-prevent
      >
        <DialogHeader className="flex justify-center items-center bg-navFooter py-5 px-5 text-white shrink-0 sticky top-0 z-20">
          <DialogTitle className="text-2xl pt-8">
            {regester ? "Welcome to Eventaty" : "Welcome Back"}
          </DialogTitle>
          <DialogDescription>
            {regester
              ? "Register to discover events and make bookings"
              : "Login to access your bookings and discover events"}
          </DialogDescription>
          <button
            onClick={() => setInternalOpen(false)}
            className="text-eventaty-gold hover:text-eventaty-gold/80 transition-colors p-1 cursor-pointer absolute top-2 right-2"
          >
            <X className="h-5 w-5" />
          </button>
        </DialogHeader>
        <div className="flex-1">
          {regester ? (
            <RegisterForm onSuccess={() => setRegester(false)} />
          ) : (
            <LoginForm />
          )}
        </div>
        <DialogFooter className="p-4 shrink-0 sticky bottom-0 bg-card z-20 border-t border-gray-100">
          {regester ? (
            <div className="mx-auto flex gap-3">
              <span>Already have an account?</span>
              <span
                className="text-secondary cursor-pointer hover:underline"
                onClick={() => setRegester(false)}
              >
                Login
              </span>
            </div>
          ) : (
            <div className="mx-auto flex gap-3">
              <span>Don't have an account?</span>
              <span
                className="text-secondary cursor-pointer hover:underline"
                onClick={() => setRegester(true)}
              >
                Register
              </span>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
