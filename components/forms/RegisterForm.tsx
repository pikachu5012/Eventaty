import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form className="w-full max-w-sm mx-auto px-6">
      <div className="my-2 py-1">
        <label htmlFor="firstName" className="block">
          First Name *
        </label>
        <div className="relative py-2">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary" />
          <Input
            type="text"
            className="text-sm text-primary border-secondary py-4 pl-12"
            id="firstName"
            placeholder="Enter your first name"
            required
          />
        </div>
      </div>
      <div className="my-2 py-1">
        <label htmlFor="lastName" className="block">
          Last Name *
        </label>
        <div className="relative py-2">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary" />
          <Input
            type="text"
            className="text-sm text-primary border-secondary py-4 pl-12"
            id="lastName"
            placeholder="Enter your last name"
            required
          />
        </div>
      </div>
      <div className="my-2 py-1">
        <label htmlFor="email" className="block">
          Email Address *
        </label>
        <div className="relative py-2">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary" />
          <Input
            type="email"
            className="text-sm text-primary border-secondary py-4 pl-12"
            id="email"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>
      <div className="my-2 py-1">
        <label htmlFor="phone" className="block">
          Phone Number
        </label>
        <div className="relative py-2">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary" />
          <Input
            type="number"
            className="text-sm text-primary border-secondary py-4 pl-12"
            id="phone"
            placeholder="Enter your phone number"
          />
        </div>
      </div>
      <div className="my-2 py-1">
        <label htmlFor="password" className="block">
          Password *
        </label>
        <div className="relative py-2">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary" />
          <Input
            type={showPassword ? "text" : "password"}
            className="text-sm text-primary border-secondary py-4 pl-12 pr-10"
            id="password"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5 text-secondary" />
            ) : (
              <Eye className="h-5 w-5 text-secondary" />
            )}
          </button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground p-4 bg-[#F7F3E9] rounded-md">
        By creating an account, you agree to our Terms of Service and Privacy
        Policy
      </p>
      <Button variant="secondary" className="w-full mt-8 cursor-pointer">
        Create Account
      </Button>
    </form>
  );
}
