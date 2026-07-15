"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function LoginForm() {
  const t = useTranslations('Auth');
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
      toast.success(t('loginSuccess'));
    } catch (error) {
      setError(t('loginError'));
      toast.error(t('loginError'));
    }
  };

  return (
    <form className="w-full max-w-sm mx-auto px-6" onSubmit={handleLogin}>
      <div className="my-1.5 md:my-3 py-0.5 md:py-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('email')}
        </label>
        <div className="relative py-1 md:py-2">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-400" />
          <Input
            type="email"
            className="text-sm text-primary border-gray-200 dark:border-gray-750 focus:border-violet-500 focus:ring-violet-500 py-4 pl-12 bg-white dark:bg-slate-900"
            id="email"
            placeholder={t('emailPlaceholder')}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="my-1.5 md:my-3 mb-0 py-0.5 md:py-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('password')}
        </label>
        <div className="relative py-1 md:py-2">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-400" />
          <Input
            type={showPassword ? "text" : "password"}
            className="text-sm text-primary border-gray-200 dark:border-gray-750 focus:border-violet-500 focus:ring-violet-500 py-4 pl-12 pr-10 bg-white dark:bg-slate-900"
            id="password"
            placeholder={t('passwordPlaceholder')}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      {error && <p className="text-center text-red-500 text-sm mt-2">{error}</p>}
      <div className="overflow-hidden mt-1 md:mt-1.5">
        <p className="text-xs text-violet-600 dark:text-violet-400 font-medium float-right cursor-pointer hover:underline">
          {t('forgotPassword')}
        </p>
      </div>
      <button
        type="submit"
        disabled={!email || !password}
        className={`w-full mt-6 md:mt-8 py-3 rounded-lg font-bold text-white transition-all text-sm
          ${email && password
            ? "bg-[#7C3AED] hover:bg-[#6D28D9] cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]"
            : "bg-[#7C3AED]/35 text-white/50 cursor-not-allowed shadow-none"
          }
        `}
      >
        {t('loginSubmit')}
      </button>
    </form>
  );
}
