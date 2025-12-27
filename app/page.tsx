"use client";
import HomeSlider from "@/components/HomeSlider/HomeSlider";
import BrowseByCategory from "@/components/sections/BrowseByCategory";
import HomeVenues from "@/components/sections/HomeVenues";
import UpComingEvents from "@/components/sections/UpComingEvents";

export default function Home() {
  return (
    <div>
      <HomeSlider />
      <UpComingEvents />
      <BrowseByCategory />
      <HomeVenues />
    </div>
  );
}
