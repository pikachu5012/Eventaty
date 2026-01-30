import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import starsIcon from "@/public/about images/Stars.svg";
import missionIcon from "@/public/about images/mission.svg";
import visionIcon from "@/public/about images/vision.svg";
import ExcellenceIcon from "@/public/about images/Exellence.svg";
import LoveIcon from "@/public/about images/Love.svg";
import InnovationIcon from "@/public/about images/Innovation.svg";
import AboutCard from "@/components/aboutCard";
import { Github, Linkedin, User, Mail } from "lucide-react";

const inter = Inter();
const subject = encodeURIComponent("Contact from Eventaty website");
const body = encodeURIComponent(
  "Hello,\n\nI want to contact you regarding..."
);

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

        {/* Meet Our Team Section */}
        <div className="bg-background pb-20">
          <div className="mt-5 mx-auto px-6 flex flex-col items-center">
            <h2 className="text-3xl font-bold text-center mt-12 text-primary">
              Meet Our Team
            </h2>
            <div className="w-20 h-1 bg-eventaty-gold mt-2 mb-4 rounded-full"></div>
            <p className="text-md font-extralight text-center mb-12 max-w-2xl text-primary/70">
              Passionate professionals dedicated to your event experience. Our
              diverse team works tirelessly to bring you the best events.
            </p>
          </div>

          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
              {[
                {
                  name: "Ahmed Mohamed",
                  github: "https://github.com/pikachu5012",
                  linkedin: "https://www.linkedin.com/in/ahmed-m-fath/",
                  gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=ahmedmohammed5012@gmail.com&su=${subject}&body=${body}`,
                },
                {
                  name: "Mohamed Tarek",
                  github: "https://github.com/Mohamed-Tarek-Mo",
                  linkedin:
                    "https://www.linkedin.com/in/mohamed-tarek-elattar/",
                  gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=mohamedtar425@gmail.com&su=${subject}&body=${body}`,
                },
                {
                  name: "Mohamed Nabil",
                  github: "https://github.com/MohamedNabil3",
                  linkedin: "https://linkedin.com/in/mohammed-nabil-mohammed",
                  gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=mohammednabil642@gmail.com&su=${subject}&body=${body}`,
                },
                {
                  name: "Abdelhamed Adel",
                  github: "https://github.com/adel",
                  linkedin: "https://linkedin.com/in/adel",
                  gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=abdelhamedadel@gmail.com&su=${subject}&body=${body}`,
                },
                {
                  name: "Ziad Fahim",
                  github: "https://github.com/ziad845",
                  linkedin: "https://www.linkedin.com/in/ziad-khaled-bab395341/",
                  gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=ziadfahim@gmail.com&su=${subject}&body=${body}`,
                },
                {
                  name: "Hager Mohamed",
                  github: "https://github.com/hager",
                  linkedin: "https://linkedin.com/in/hager",
                  gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=hagermohamed@gmail.com&su=${subject}&body=${body}`,
                },
              ].map((member, index) => (
                <div key={index} className="flex flex-col items-center group">
                  {/* Team Member Photo - Icon */}
                  <div className="w-full aspect-square bg-card rounded-xl overflow-hidden border border-eventaty-gold/20 shadow-sm relative mb-3">
                    <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-primary/5 to-primary/10 transition-colors duration-300 group-hover:from-eventaty-gold/5 group-hover:to-eventaty-gold/10">
                      <User className="w-10 h-10 text-primary/20 group-hover:text-eventaty-gold/30 transition-all duration-500 transform group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Name and Socials */}
                  <div className="relative flex flex-col items-center text-center">
                    <h3 className="text-sm font-semibold text-primary transition-colors duration-300 group-hover:text-eventaty-gold line-clamp-1">
                      {member.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1.5 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                      <Link
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary/60 hover:text-eventaty-gold transition-colors"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary/60 hover:text-secondary transition-colors"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </Link>
                      <Link
                        href={member.gmail}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary/60 hover:text-secondary transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
