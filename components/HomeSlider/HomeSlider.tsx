import axios from "axios";
import MySwiper from "../MySwiper/MySwiper";

export default async function HomeSlider() {
  try {
    let response;
    try {
      response = await axios.get("http://localhost:5000/events");
    } catch (e) {
      console.log("127.0.0.1 failed, trying localhost...");
      response = await axios.get("http://localhost:5000/events");
    }

    let data = response.data;

    let eventArray = null;
    if (Array.isArray(data)) {
      eventArray = data;
    } else if (data?.events && Array.isArray(data.events)) {
      eventArray = data.events;
    } else if (data?.data?.events && Array.isArray(data.data.events)) {
      eventArray = data.data.events;
    } else if (data?.data && Array.isArray(data.data)) {
      eventArray = data.data;
    }

    if (!eventArray || eventArray.length === 0) {
      console.warn("HomeSlider: No events found in API response structure:", Object.keys(data || {}));
      return <div className="p-10 text-center text-gray-500">No events found in database.</div>;
    }

    const featuredEvents = eventArray.filter((e: any) =>
      e.featured === true ||
      e.featured === "true" ||
      e.isFeatured === true ||
      e.isFeatured === "true"
    );

    if (featuredEvents.length === 0) {
      console.warn("HomeSlider: No featured events found among", eventArray.length, "total events.");
      return <div className="p-10 text-center text-gray-500">No featured events marked.</div>;
    }

    return (
      <div className="w-full py-10">
        <MySwiper events={featuredEvents} />
      </div>
    );
  } catch (error: any) {
    console.error("HomeSlider CRITICAL ERROR:", error.message);
    return (
      <div className="p-10 text-center text-red-500 border border-dashed border-red-300 mx-auto max-w-2xl my-5 rounded-xl">
        Unable to load slider. Please check if backend is running on port 5000.
      </div>
    );
  }
}
