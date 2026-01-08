"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setToken } = useAuth();
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/api/auth/login`, {
        email,
        password,
      });
      setUser(response.data.user);
      setToken(response.data.token);
      setError("");
      toast.success("Login successful");
    } catch (error) {
      setError("Invalid email or password");
      toast.error("Invalid email or password");
    }
  };

  return (
    <form className="w-full max-w-sm mx-auto px-6">
      <div className="my-3 py-2">
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="my-3 mb-0 py-2">
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
      {error && <p className="text-center text-red-500">{error}</p>}
      <p className="text-sm text-secondary float-right cursor-pointer hover:underline">
        Forgot Password?
      </p>
      <Button
        variant="secondary"
        className="w-full mt-8 cursor-pointer"
        onClick={(e) => handleLogin(e)}
      >
        Login to Eventaty
      </Button>
    </form>
  );
}
