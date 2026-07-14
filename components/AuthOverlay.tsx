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
import { useTranslations } from "next-intl";

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
  const t = useTranslations('Auth');
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
              className="flex items-center gap-2 py-1.5 px-3 rounded-lg font-medium text-sm
          bg-[#7C3AED] text-[#111111]
          hover:bg-yellow-500 transition shadow-md whitespace-nowrap"
            >
              <LogIn size={16} />
              {t('loginBtn')}
            </Link>
          ) : (
            <Link href="" className="hover:underline hover:text-secondary">
              {t('loginBtn')}
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
            {regester ? t('registerTitle') : t('loginTitle')}
          </DialogTitle>
          <DialogDescription>
            {regester
              ? t('registerDesc')
              : t('loginDesc')}
          </DialogDescription>
          <button
            onClick={() => {
              setInternalOpen(false);
              handleOpenChange?.(false);
            }}
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
              <span>{t('alreadyAccount')}</span>
              <span
                className="text-secondary cursor-pointer hover:underline"
                onClick={() => setRegester(false)}
              >
                {t('loginBtn')}
              </span>
            </div>
          ) : (
            <div className="mx-auto flex gap-3">
              <span>{t('noAccount')}</span>
              <span
                className="text-secondary cursor-pointer hover:underline"
                onClick={() => setRegester(true)}
              >
                {t('registerBtn')}
              </span>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
