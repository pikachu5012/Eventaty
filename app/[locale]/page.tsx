import HomeSlider from "@/components/HomeSlider/HomeSlider";
import BrowseByCategory from "@/components/sections/BrowseByCategory";
import HomeVenues from "@/components/sections/HomeVenues";
import UpComingEvents from "@/components/sections/UpComingEvents";
import StatsBar from "@/components/sections/StatsBar";
import TrendingNow from "@/components/sections/TrendingNow";
import HowItWorks from "@/components/sections/HowItWorks";
import Testimonials from "@/components/sections/Testimonials";

export const dynamic = "force-dynamic";

export default function Home() {
    return (
        <div className="bg-background">
            <HomeSlider />
            <div id="hero-sentinel" className="w-full h-px pointer-events-none" />
            <StatsBar />
            <UpComingEvents />
            <TrendingNow />
            <BrowseByCategory />
            <HowItWorks />
            <HomeVenues />
            <Testimonials />
        </div>
    );
}
