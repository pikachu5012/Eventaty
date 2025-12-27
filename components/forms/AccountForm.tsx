import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";

export default function AccountForm({
  setIsEditing,
}: {
  setIsEditing: (value: boolean) => void;
}) {
  const handleSave = () => {
    setIsEditing(false);
  };
  return (
    <div>
      <form action="" className="p-4 space-y-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Full name</label>
          <Input type="text" name="name" id="name" className="p-4" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <Input type="email" name="email" id="email" className="p-4" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone">Phone</label>
          <Input type="tel" name="phone" id="phone" className="p-4" />
        </div>
        <div className="flex justify-between mt-8">
          <Button
            type="submit"
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
