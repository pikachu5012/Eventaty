import Link from "next/link";
import MySwiper from "../MySwiper/MySwiper";

export default function HomeSlider() {
  return (
    <section className="bg-[#FAF7EF] py-16">
      <div className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row gap-10 items-center">

      {/** Left Content */}
<div className="bg-white rounded-[32px] px-10 py-10 shadow-sm w-full md:w-[35%]">
  
  <h2 className="text-2xl font-semibold text-slate-900 leading-snug">
    Summer Music Festival <br /> 2025
  </h2>

  <p className="text-slate-500 mt-4 text-sm">
    Jul 15, 2025 at 18:00
  </p>

  <p className="text-slate-400 text-sm mt-1">
    Avenue Name
  </p>

  <div className="flex items-center gap-10 mt-10">
  <Link href="/events">
  
     <button
      className=" cursor-pointer px-8 py-2.5 rounded-full bg-[#d4af37]
                 text-[#0F172A] text-sm font-medium
                 hover:bg-yellow-500 transition shadow"
    >
      Book Now
    </button>
  </Link>
 
 <Link href="/about">
 
    <button className="cursor-pointer text-slate-600 text-sm italic hover:underline">
      More Info
    </button>
 </Link>

  </div>

</div>

        {/* Right Slider */}
        <div className="w-full md:w-[70%] rounded-3xl overflow-hidden h-[320px] md:h-[380px]">
          <MySwiper
            imagesList={[
              "/swipper1.png",
              "/swipper2.jpg",
              "/swipper3.jpg",
            ]}
          />
        </div>

      </div>
    </section>
  );
}
