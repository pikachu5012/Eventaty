"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Cpu,
  Drama,
  Handshake,
  HeartPlus,
  LibraryBig,
  Microscope,
  Ticket,
} from "lucide-react";

export default function CategoryButton({ title }: { title: string }) {
  const router = useRouter();
  let icon;
  switch (title) {
    case "technology":
      icon = <Cpu className="rounded-circle w-10! h-10!" />;
      break;
    case "business":
      icon = <Handshake className="rounded-circle w-10! h-10!" />;
      break;
    case "health":
      icon = <HeartPlus className="rounded-circle w-10! h-10!" />;
      break;
    case "education":
      icon = <LibraryBig className="rounded-circle w-10! h-10!" />;
      break;
    case "entertainment":
      icon = <Drama className="rounded-circle w-10! h-10!" />;
      break;
    case "science":
      icon = <Microscope className="rounded-circle w-10! h-10!" />;
      break;
    default:
      icon = <Ticket className="rounded-circle w-10! h-10!" />;
  }

  const handleClick = () => {
    const category = encodeURIComponent(title);
    router.push(`/events?category=${category}`);
  };

  return (
    <div className="w-1/3 lg:w-1/5 my-4 mx-auto group">
      <Button
        onClick={handleClick}
        className="w-full flex flex-col justify-center items-center py-18 bg-linear-to-t from-eventaty-dark to-ring/60 cursor-pointer  hover:bg-secondary hover:bg-none hover:text-primary"
      >
        <div className="bg-secondary/20 group-hover:bg-primary/20 text-secondary group-hover:text-primary p-3 rounded-full">
          {icon}
        </div>
        <p className="text-2xl font-thin">{title}</p>
      </Button>
    </div>
  );
}
