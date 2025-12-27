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

export default function Footer() {
  return (
    <footer className="p-10 bg-primary">
      <div className="flex flex-wrap justify-between py-10 border-b-2 gap-1 space-y-10 border-muted-foreground">
        <div className="w-full md:w-2/5 lg:w-3/13 space-y-2">
          <img src="/Logo.svg" alt="logo" className="h-14 mb-6" />
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
              <Link href="/events" className="hover:underline">
                Events
              </Link>
            </li>
            <li>
              <Link href="/venues" className="hover:underline">
                Venues
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-full md:w-2/5 lg:w-3/13 space-y-2">
          <h3 className="font-semibold mb-4 text-lg text-secondary">
            Categories
          </h3>
          <ul className="space-y-2 text-ring">
            <li>
              <Link href="/events" className="hover:underline">
                Concerts
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:underline">
                Workshops
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:underline">
                Conferences
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:underline">
                Sports
              </Link>
            </li>
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
          <div className="flex gap-4 text-white mt-4">
            <Facebook size={20} />
            <Twitter size={20} />
            <Instagram size={20} />
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
