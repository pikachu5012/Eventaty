import React from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import starsIcon from "@/public/about images/Stars.svg";
import missionIcon from "@/public/about images/mission.svg";
import visionIcon from "@/public/about images/vision.svg";
import ExcellenceIcon from "@/public/about images/Exellence.svg";
import LoveIcon from "@/public/about images/Love.svg";
import InnovationIcon from "@/public/about images/Innovation.svg";
import groupIcon from "@/public/about images/Group.svg";
import AboutCard from "@/components/aboutCard";
import { Button } from "@/components/ui/button";

const inter = Inter();

export default function About() {
  return (
    <>
      <section className={inter.className} style={{ minHeight: "100dvh" }}>
        {/* hero section */}
        <div className="mx-auto flex flex-col items-center justify-center gap-y-2 py-10  relative bg-linear-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A]">
          <Image
            className="absolute top-1 right-3 md:right-7"
            src={starsIcon}
            alt="stars icon"
            width={48}
            height={48}
          />
          <h1 className="text-strongCream px-1 text-2xl md:text-4xl text-center font-normal mt-5 md:mt-10">
            Your Gateway to{" "}
            <span className="text-eventaty-gold">Unforgettable</span> Experiences
          </h1>
          <p className="text-eventaty-cream px-1 text-xs sm:text-base text-center font-thin max-w-xs md:max-w-lg mx-auto">
            We&apos;re on a mission to connect people with amazing events and
            create memories that last a lifetime
          </p>
        </div>

        {/* Mission & Vision Section */}
        <div className="mx-auto py-7 flex flex-col md:flex-row items-center md:items-stretch md:justify-center gap-x-16 gap-y-4 bg-background">
          <div className="max-w-xs md:max-w-md bg-card rounded-xl">
            <AboutCard
              icon={missionIcon}
              title="Our Mission"
              description="To revolutionize event discovery and booking by providing a seamless, user-friendly platform that connects event enthusiasts with extraordinary experiences worldwide."
              width={40}
              height={40}
              alt="mission icon"
              allign="start"
            />
          </div>
          <div className="max-w-xs md:max-w-md bg-card rounded-xl">
            <AboutCard
              icon={visionIcon}
              title="Our Vision"
              description="To become the world's most trusted event platform, empowering millions to discover, book, and enjoy unforgettable events effortlessly."
              width={40}
              height={40}
              alt="vision icon"
              allign="start"
            />
          </div>
        </div>

        {/* Core Values Section */}
        <div className="bg-card px-1 mx-auto">
          <div className=" mt-4 mx-auto md:max-w-80 flex flex-col">
            <h2 className="text-[24px] font-bold text-center mt-5">
              Our Core Values
            </h2>
            <p className="text-md font-extralight text-center mt-2">
              The principles that guide everything we do
            </p>
          </div>
          <div className="mx-auto px-1 py-1 flex flex-col md:flex-row items-center md:items-stretch md:justify-center gap-x-16 gap-y-4 ">
            <div className="max-w-xs md:max-w-80 flex flex-col">
              <AboutCard
                icon={LoveIcon}
                title="Customer First"
                description="Your satisfaction is our top priority. We're here to make your event experience exceptional."
                alt="Love icon"
                allign="center"
                width={50}
                height={50}
              />
            </div>
            <div className="max-w-xs md:max-w-80 flex flex-col">
              <AboutCard
                icon={ExcellenceIcon}
                title="Excellence"
                description=" We strive for perfection in every detail, from event curation to customer service."
                alt="Excellence icon"
                allign="center"
                width={50}
                height={50}
              />
            </div>
            <div className="max-w-xs md:max-w-80 flex flex-col">
              <AboutCard
                icon={InnovationIcon}
                title="Innovation"
                description="We continuously evolve and improve our platform to serve you better."
                alt="Innovation icon"
                allign="center"
                width={50}
                height={50}
              />
            </div>
          </div>
        </div>

        {/* Meet Our Team / Join Journey Section */}
        <div className="bg-background pb-10">
          <div className=" mt-5 mx-auto px-6 flex flex-col">
            <h2 className="text-lg font-bold text-center mt-12">
              Meet Our Team
            </h2>
            <p className="text-md font-extralight text-center mb-6 my-2">
              Passionate professionals dedicated to your event experience
            </p>
          </div>
          <div className="mx-auto px-1 pt-1 flex flex-col items-center gap-y-1 lg:max-w-300 bg-card rounded-xl">
            <div className="md:max-w-150">
              <AboutCard
                icon={groupIcon}
                title="Join Our Journey"
                description="We're a growing team of event enthusiasts, tech innovators, and customer service experts working together to create the best event booking experience."
                width={60}
                height={60}
                alt="group icon"
                allign="center"
              />
            </div>
            <Button variant="secondary" className="mb-6 py-6" asChild>
              <div className="text-md px-6">Explore Careers</div>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
