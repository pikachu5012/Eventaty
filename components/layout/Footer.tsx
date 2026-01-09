import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AuthOverlay } from "@/components/AuthOverlay";

export default function Footer() {
  const categories = [
    "technology",
    "business",
    "health",
    "education",
    "entertainment",
    "science",
  ];
  return (
    <footer className="p-10 bg-navFooter">
      <div className="flex flex-wrap justify-between py-10 border-b-2 gap-1 space-y-10 border-muted-foreground">
        <div className="w-full md:w-2/5 lg:w-3/13 space-y-2">
          <Image
            src="/Logo.svg"
            alt="logo"
            width={200}
            height={56}
            className="h-14 w-auto mb-6"
          />
          <p className="text-ring">
            Your premier destination for discovering and booking amazing events.
            From concerts to conferences, we've got you covered.
          </p>
          <p className="text-secondary">
            <Sparkles className="inline-block me-1" /> Premium Event Experiences
          </p>
        </div>
        <div className="w-full md:w-2/5 lg:w-3/13 space-y-2">
          <h3 className="font-semibold mb-4 text-lg text-secondary">
            Quick Links
          </h3>
          <ul className="space-y-2 text-ring">
            <li>
              <Link href="/events" className="hover:underline hover:text-secondary">
                Events
              </Link>
            </li>
            <li>
              <Link href="/venues" className="hover:underline hover:text-secondary">
                Venues
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline hover:text-secondary">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline hover:text-secondary">
                Contact
              </Link>
            </li>
            <li>
              <AuthOverlay isNav={false} />
            </li>
          </ul>
        </div>
        <div className="w-full md:w-2/5 lg:w-3/13 space-y-2">
          <h3 className="font-semibold mb-4 text-lg text-secondary">
            Categories
          </h3>
          <ul className="space-y-2 text-ring">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  href={`/events?category=${encodeURIComponent(category)}`}
                  className="hover:underline hover:text-secondary"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-2/5 lg:w-3/13 space-y-2">
          <h3 className="font-semibold mb-4 text-lg text-secondary">
            Contact Us
          </h3>
          <p className="text-ring flex items-center">
            <Mail className="inline-block me-2 text-secondary" size={16} />
            info@eventaty.com
          </p>
          <p className="text-ring flex items-center">
            <Phone className="inline-block me-2 text-secondary" size={16} />
            +1 (555) 123-4567
          </p>
          <p className="text-ring flex items-center">
            <MapPin className="inline-block me-2 text-secondary" size={16} />
            San Francisco, CA
          </p>
          <div className="flex gap-5 text-white mt-4">
            <Facebook
              size={25}
              className="cursor-pointer hover:text-secondary"
            />
            <Twitter
              size={25}
              className="cursor-pointer hover:text-secondary"
            />
            <Instagram
              size={25}
              className="cursor-pointer hover:text-secondary"
            />
          </div>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500 text-center pt-5">
          &copy; 2025 Eventaty. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
