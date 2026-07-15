import { useState } from "react";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function RegisterForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const t = useTranslations('Auth');
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [registered, setRegistered] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(`/api/auth/register`, {
        firstName,
        lastName,
        email,
        phone,
        password,
      });
      setRegistered(true);
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
      toast.success(t('registerSuccess'));
    } catch (error) {
      setError(t('registerError'));
      setRegistered(false);
      toast.error(t('registerError'));
    }
  };

  const isFormValid = firstName.trim() !== "" && lastName.trim() !== "" && email.trim() !== "" && phone.trim() !== "" && password.trim() !== "";

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto px-6">
      <div className="my-1.5 md:my-2 py-0.5 md:py-1">
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('firstName')}
        </label>
        <div className="relative py-1 md:py-2">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-400" />
          <Input
            type="text"
            className="text-sm text-primary border-gray-200 dark:border-gray-750 focus:border-violet-500 focus:ring-violet-500 py-4 pl-12 bg-white dark:bg-slate-900"
            id="firstName"
            placeholder={t('firstNamePlaceholder')}
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
      </div>
      <div className="my-1.5 md:my-2 py-0.5 md:py-1">
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('lastName')}
        </label>
        <div className="relative py-1 md:py-2">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-400" />
          <Input
            type="text"
            className="text-sm text-primary border-gray-200 dark:border-gray-750 focus:border-violet-500 focus:ring-violet-500 py-4 pl-12 bg-white dark:bg-slate-900"
            id="lastName"
            placeholder={t('lastNamePlaceholder')}
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="my-1.5 md:my-2 py-0.5 md:py-1">
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
      <div className="my-1.5 md:my-2 py-0.5 md:py-1">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {t('phone')}
        </label>
        <div className="relative py-1 md:py-2">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-400" />
          <Input
            type="text"
            className="text-sm text-primary border-gray-200 dark:border-gray-750 focus:border-violet-500 focus:ring-violet-500 py-4 pl-12 bg-white dark:bg-slate-900"
            id="phone"
            placeholder={t('phonePlaceholder')}
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div className="my-1.5 md:my-2 py-0.5 md:py-1">
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
      {registered && (
        <p className="text-center text-green-500 text-sm mt-2">{t('registerSuccess')}</p>
      )}
      <div className="mt-2 md:mt-3 p-3 md:p-4 bg-gray-50 dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-md">
        <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-normal">
          {t('terms')}
        </p>
      </div>
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-full mt-4 md:mt-6 py-3 rounded-lg font-bold text-white transition-all text-sm
          ${isFormValid
            ? "bg-[#7C3AED] hover:bg-[#6D28D9] cursor-pointer shadow-md hover:shadow-lg active:scale-[0.98]"
            : "bg-[#7C3AED]/35 text-white/50 cursor-not-allowed shadow-none"
          }
        `}
      >
        {t('createAccount')}
      </button>
    </form>
  );
}
