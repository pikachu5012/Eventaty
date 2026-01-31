import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

export default function AccountTypeOverlay({
  asUser,
  setAsUser,
  open,
  setOpen,
}: {
  asUser: boolean;
  setAsUser: (asUser: boolean) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const t = useTranslations('Dashboard.Overlay');
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 border-0 overflow-hidden">
        <DialogHeader className="flex justify-center items-center bg-navFooter py-5 px-5 text-white relative">
          <DialogTitle className="text-2xl pt-8">
            {t('selectDashboard')}
          </DialogTitle>
          <DialogDescription>
            {t('selectDesc')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="py-6 flex flex-row justify-center sm:justify-center gap-2">
          <DialogClose asChild>
            <button
              onClick={() => {
                setAsUser(true);
                setOpen(false);
              }}
              className="w-4/9 px-4 py-2 cursor-pointer rounded-lg bg-secondary text-primary hover:bg-primary hover:text-secondary transition"
            >
              {t('btnUser')}
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button
              onClick={() => {
                setAsUser(false);
                setOpen(false);
              }}
              className="w-4/9 px-4 py-2 cursor-pointer rounded-lg bg-secondary text-primary hover:bg-primary hover:text-secondary transition"
            >
              {t('btnAdmin')}
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
