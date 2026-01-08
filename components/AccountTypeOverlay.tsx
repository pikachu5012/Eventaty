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

export default function AccountTypeOverlay({
  asUser,
  setAsUser,
}: {
  asUser: boolean;
  setAsUser: (asUser: boolean) => void;
}) {
  const [open, setOpen] = React.useState(true);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 border-0 overflow-hidden">
        <DialogHeader className="flex justify-center items-center bg-primary py-5 px-5 text-background relative">
          <DialogTitle className="text-2xl pt-8">
            Select Dashboard Type
          </DialogTitle>
          <DialogDescription>
            Please select the type of dashboard you want to access.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="py-6 flex flex-row justify-center sm:justify-center gap-2">
          <DialogClose asChild>
            <button
              onClick={() => {
                setAsUser(true);
                setOpen(false);
              }}
              className="w-4/9 px-4 py-2 rounded-lg bg-secondary text-primary hover:bg-primary hover:text-secondary transition"
            >
              User
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button
              onClick={() => {
                setAsUser(false);
                setOpen(false);
              }}
              className="w-4/9 px-4 py-2 rounded-lg bg-secondary text-primary hover:bg-primary hover:text-secondary transition"
            >
              Admin
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
