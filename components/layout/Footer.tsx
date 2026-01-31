import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Twitter,
} from "lucide-react";
import { Link } from "@/navigation";
import Image from "next/image";
import { AuthOverlay } from "@/components/AuthOverlay";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations('Footer');
  const tNav = await getTranslations('Navigation');

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
            {t('description')}
          </p>
          <p className="text-secondary">
            <Sparkles className="inline-block me-1" /> {t('premium')}
          </p>
        </div>
        <div className="w-2/5 lg:w-3/13 space-y-2">
          <h3 className="font-semibold mb-4 text-lg text-secondary">
            {t('quickLinks')}
          </h3>
          <ul className="space-y-2 text-ring">
            <li>
              <Link
                href="/events"
                className="hover:underline hover:text-secondary"
              >
                {tNav('events')}
              </Link>
            </li>
            <li>
              <Link
                href="/venues"
                className="hover:underline hover:text-secondary"
              >
                {tNav('venues')}
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:underline hover:text-secondary"
              >
                {tNav('about')}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:underline hover:text-secondary"
              >
                {tNav('contact')}
              </Link>
            </li>
            <li>
              <AuthOverlay isNav={false} />
            </li>
          </ul>
        </div>
        <div className="w-2/5 lg:w-3/13 space-y-2">
          <h3 className="font-semibold mb-4 text-lg text-secondary">
            {t('categories')}
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
        <div className="w-2/5 lg:w-3/13 space-y-2">
          <h3 className="font-semibold mb-4 text-lg text-secondary">
            {t('contactUs')}
          </h3>
          <p className="text-ring flex items-center">
            <Mail className="inline-block me-2 text-secondary" size={16} />
            info@eventaty.com
          </p>
          <p className="text-ring flex items-center">
            <Phone className="inline-block me-2 text-secondary" size={16} />
            +201112345678
          </p>
          <p className="text-ring flex items-center">
            <MapPin className="inline-block me-2 text-secondary" size={16} />
            {t('address')}
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
          &copy; 2026 Eventaty. {t('rights')}
        </p>
      </div>
    </footer>
  );
}
