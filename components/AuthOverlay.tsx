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
  defaultRegister = false,
  triggerLabel,
}: {
  isNav?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  noTrigger?: boolean;
  defaultRegister?: boolean;
  triggerLabel?: string;
}) {
  const t = useTranslations('Auth');
  const [regester, setRegester] = useState(defaultRegister);
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
      setRegester(defaultRegister);
    }
  }, [finalOpen, defaultRegister]);

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
              {triggerLabel || t('loginBtn')}
            </Link>
          ) : (
            <Link href="" className="hover:underline hover:text-secondary">
              {triggerLabel || t('loginBtn')}
            </Link>
          )}
        </DialogTrigger>
      )}
      <DialogContent
        className="p-0 border-0 overflow-hidden max-h-[90vh] flex flex-col"
        data-lenis-prevent
        showCloseButton={false}
      >
        <DialogHeader className="flex justify-center items-center bg-navFooter py-5 px-5 text-white shrink-0 relative">
          <DialogTitle className="text-2xl pt-8">
            {regester ? t('registerTitle') : t('loginTitle')}
          </DialogTitle>
          <DialogDescription>
            {regester
              ? t('registerDesc')
              : t('loginDesc')}
          </DialogDescription>
          <button
            type="button"
            onClick={() => {
              setInternalOpen(false);
              handleOpenChange?.(false);
            }}
            className="text-white/80 hover:text-white transition-colors p-2.5 cursor-pointer absolute top-2 right-2 z-30 rounded-full hover:bg-white/10 active:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto py-4 min-h-0 custom-scrollbar">
          {regester ? (
            <RegisterForm onSuccess={() => setRegester(false)} />
          ) : (
            <LoginForm />
          )}
        </div>
        <DialogFooter className="p-4 shrink-0 bg-card border-t border-gray-100 dark:border-slate-800">
          {regester ? (
            <div className="mx-auto flex gap-3 text-sm">
              <span className="text-gray-600 dark:text-gray-400">{t('alreadyAccount')}</span>
              <span
                className="text-violet-600 dark:text-violet-400 font-semibold cursor-pointer hover:underline"
                onClick={() => setRegester(false)}
              >
                {t('loginBtn')}
              </span>
            </div>
          ) : (
            <div className="mx-auto flex gap-3 text-sm">
              <span className="text-gray-600 dark:text-gray-400">{t('noAccount')}</span>
              <span
                className="text-violet-600 dark:text-violet-400 font-semibold cursor-pointer hover:underline"
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
