import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useAuth } from "@/context/AuthContext";

export default function AccountForm({
  setIsEditing,
}: {
  setIsEditing: (value: boolean) => void;
}) {
  const { user, setUser, token } = useAuth();
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [lastName, setLastName] = useState(user?.lastName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [phone, setPhone] = useState(user?.phone ?? 0);

  const handleSave = async () => {
    if (!user) return;

    const finalFirstName = firstName || user.firstName || "";
    const finalLastName = lastName || user.lastName || "";
    const finalEmail = email || user.email || "";
    const finalPhone = phone || user.phone || 0;

    if (!firstName) setFirstName(finalFirstName);
    if (!lastName) setLastName(finalLastName);
    if (!email) setEmail(finalEmail);
    if (!phone) setPhone(finalPhone);

    try {
      const response = await axios.put(
        "/api/user",
        {
          firstName: finalFirstName,
          lastName: finalLastName,
          email: finalEmail,
          phone: finalPhone,
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
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  return (
    <div>
      <form action="" className="p-4 space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="firstName">First name</label>
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
          <label htmlFor="lastName">Last name</label>
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
          <label htmlFor="email">Email</label>
          <Input
            type="email"
            name="email"
            id="email"
            className="p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone">Phone</label>
          <Input
            type="tel"
            name="phone"
            id="phone"
            className="p-4"
            value={phone}
            onChange={(e) => setPhone(Number(e.target.value))}
          />
        </div>
        <div className="flex justify-between mt-8">
          <Button
            type="button"
            variant="secondary"
            className="w-5/11 cursor-pointer"
            onClick={() => handleSave()}
          >
            Save
          </Button>
          <Button
            variant="outline"
            className="w-5/11 bg-muted cursor-pointer"
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
