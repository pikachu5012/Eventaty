import HomeSlider from "@/components/HomeSlider/HomeSlider";
import BrowseByCategory from "@/components/sections/BrowseByCategory";
import HomeVenues from "@/components/sections/HomeVenues";
import UpComingEvents from "@/components/sections/UpComingEvents";

export const dynamic = "force-dynamic";

export default function Home() {
    return (
        <div className="bg-background">
            <HomeSlider />
            <div id="hero-sentinel" className="w-full h-px pointer-events-none" />
            <UpComingEvents />
            <BrowseByCategory />
            <HomeVenues />
        </div>
    );
}
