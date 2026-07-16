import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function AccountForm({
  setIsEditing,
}: {
  setIsEditing: (value: boolean) => void;
}) {
  const t = useTranslations('Dashboard.AccountForm');
  const { user, setUser, token } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone?.toString() ?? "");
  const [emailError, setEmailError] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    setEmailError(false);
    try {
      const response = await axios.put(
        "/api/user",
        {
          firstName: firstName || user.firstName,
          lastName: lastName || user.lastName,
          email: email || user.email,
          phone: phone || user.phone?.toString() || "",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = response.data.user || response.data;

      setUser({
        ...user,
        ...updatedUser,
      });
      setIsEditing(false);
      toast.success(t('success'));
    } catch (error) {
      console.error("Failed to update user", error);
      let message = "Failed to update user";
      if (axios.isAxiosError(error)) {
        message = (error.response?.data as { message?: string })?.message || message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      if (
        (message.toLowerCase().includes("email") &&
          message.toLowerCase().includes("exist")) ||
        message.toLowerCase().includes("duplicate")
      ) {
        setEmailError(true);
        toast.error(
          t('emailError')
        );
      } else {
        toast.error(message);
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
        className="px-1 py-4 space-y-4 text-start"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="firstName" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {t('firstName')}
          </label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            className="bg-muted/40 border border-border text-foreground placeholder-muted-foreground rounded-xl focus-visible:border-violet-500 focus-visible:ring-1 focus-visible:ring-violet-500/50 py-2.5 px-4 h-11"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="lastName" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {t('lastName')}
          </label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            className="bg-muted/40 border border-border text-foreground placeholder-muted-foreground rounded-xl focus-visible:border-violet-500 focus-visible:ring-1 focus-visible:ring-violet-500/50 py-2.5 px-4 h-11"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {t('email')}
          </label>
          <Input
            type="email"
            name="email"
            id="email"
            className={`bg-muted/40 border border-border text-foreground placeholder-muted-foreground rounded-xl focus-visible:border-violet-500 focus-visible:ring-1 focus-visible:ring-violet-500/50 py-2.5 px-4 h-11 transition-all duration-300 ${emailError
              ? "!border-red-500 !ring-2 !ring-red-500/50 !ring-offset-2 shadow-[0_0_15px_rgba(239,68,68,0.4)]"
              : ""
              }`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) setEmailError(false);
            }}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            {t('phone')}
          </label>
          <Input
            type="tel"
            name="phone"
            id="phone"
            className="bg-muted/40 border border-border text-foreground placeholder-muted-foreground rounded-xl focus-visible:border-violet-500 focus-visible:ring-1 focus-visible:ring-violet-500/50 py-2.5 px-4 h-11"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex justify-between mt-6">
          <Button
            type="submit"
            className="w-5/11 bg-violet-600 hover:bg-violet-700 text-white font-semibold rounded-xl h-11 cursor-pointer border-none shadow-md shadow-violet-600/10 transition-colors"
          >
            {t('save')}
          </Button>
          <Button
            type="button"
            className="w-5/11 bg-muted hover:bg-muted/80 border border-border text-foreground font-semibold rounded-xl h-11 cursor-pointer transition-colors"
            onClick={() => setIsEditing(false)}
          >
            {t('cancel')}
          </Button>
        </div>
      </form>
    </div>
  );
}
