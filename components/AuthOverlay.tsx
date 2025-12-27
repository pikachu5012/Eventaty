"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components//ui/input";
import { useState } from "react";
import LoginForm from "@/components/forms/LoginForm";
import RegisterForm from "./forms/RegisterForm";
import { Sparkle } from "lucide-react";

export function AuthOverlay() {
  const [regester, setRegester] = useState(false);
  return (
    <Dialog>
      <DialogTrigger className="text-primary bg-secondary rounded-lg py-3 px-5">
        Login
      </DialogTrigger>
      <DialogContent className="p-0 border-0 overflow-hidden">
        <DialogHeader className="flex justify-center items-center bg-primary py-10 px-5 text-white relative">
          <DialogTitle className="text-2xl pt-8">
            {regester ? "Welcome to Eventaty" : "Welcome Back"}
          </DialogTitle>
          <DialogDescription>
            {regester
              ? "Register to discover events and make bookings"
              : "Login to access your bookings and discover events"}
          </DialogDescription>
        </DialogHeader>
        {regester ? <RegisterForm /> : <LoginForm />}
        <DialogFooter className="p-4">
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
