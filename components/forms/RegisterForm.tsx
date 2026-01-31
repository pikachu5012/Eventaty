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

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto px-6">
      <div className="my-2 py-1">
        <label htmlFor="firstName" className="block">
          {t('firstName')}
        </label>
        <div className="relative py-2">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary" />
          <Input
            type="text"
            className="text-sm text-primary border-secondary py-4 pl-12"
            id="firstName"
            placeholder={t('firstNamePlaceholder')}
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
      </div>
      <div className="my-2 py-1">
        <label htmlFor="lastName" className="block">
          {t('lastName')}
        </label>
        <div className="relative py-2">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary" />
          <Input
            type="text"
            className="text-sm text-primary border-secondary py-4 pl-12"
            id="lastName"
            placeholder={t('lastNamePlaceholder')}
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </div>
      <div className="my-2 py-1">
        <label htmlFor="email" className="block">
          {t('email')}
        </label>
        <div className="relative py-2">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary" />
          <Input
            type="email"
            className="text-sm text-primary border-secondary py-4 pl-12"
            id="email"
            placeholder={t('emailPlaceholder')}
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="my-2 py-1">
        <label htmlFor="phone" className="block">
          {t('phone')}
        </label>
        <div className="relative py-2">
          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary" />
          <Input
            type="number"
            className="text-sm text-primary border-secondary py-4 pl-12"
            id="phone"
            placeholder={t('phonePlaceholder')}
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>
      <div className="my-2 py-1">
        <label htmlFor="password" className="block">
          {t('password')}
        </label>
        <div className="relative py-2">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-secondary" />
          <Input
            type={showPassword ? "text" : "password"}
            className="text-sm text-primary border-secondary py-4 pl-12 pr-10"
            id="password"
            placeholder={t('passwordPlaceholder')}
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
      {error && <p className="text-center text-red-500 py-5">{error}</p>}
      {registered && (
        <p className="text-center text-green-500">{t('registerSuccess')}</p>
      )}
      <p className="text-sm text-muted-foreground p-4 bg-[#F7F3E9] rounded-md">
        {t('terms')}
      </p>
      <Button
        type="submit"
        variant="secondary"
        className="w-full mt-8 cursor-pointer"
      >
        {t('createAccount')}
      </Button>
    </form>
  );
}
