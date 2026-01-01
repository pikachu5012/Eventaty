"use client";

import EventsList from "@/components/sections/EventsList";
import { useSearchParams } from "next/navigation";

export default function EventsPage() {
  const searchParams = useSearchParams();
  const category = searchParams?.get("category") || undefined;

  return <EventsList category={category} />;
}
