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
    } catch (error: any) {
      console.error("Failed to update user", error);
      const message = error.response?.data?.message || "Failed to update user";
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
        className="p-4 space-y-4"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName">{t('firstName')}</label>
          <Input
            type="text"
            name="firstName"
            id="firstName"
            className="p-4"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastName">{t('lastName')}</label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            className="p-4"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">{t('email')}</label>
          <Input
            type="email"
            name="email"
            id="email"
            className={`p-4 transition-all duration-300 ${emailError
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
        <div className="flex flex-col gap-2">
          <label htmlFor="phone">{t('phone')}</label>
          <Input
            type="tel"
            name="phone"
            id="phone"
            className="p-4"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex justify-between mt-8">
          <Button
            type="submit"
            variant="secondary"
            className="w-5/11 cursor-pointer"
          >
            {t('save')}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-5/11 bg-muted cursor-pointer"
            onClick={() => setIsEditing(false)}
          >
            {t('cancel')}
          </Button>
        </div>
      </form>
    </div>
  );
}
