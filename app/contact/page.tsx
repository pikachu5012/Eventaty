import Image from "next/image";
import React from "react";
import starsIcon from "@/public/about images/Stars.svg";
import {
  MessageCircleMore,
  Mail,
  Phone,
  MapPin,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#FFFBF4]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] py-20 overflow-hidden">
        <Image
          className="absolute top-4 right-4 md:right-10 opacity-50"
          src={starsIcon}
          alt="stars icon"
          width={48}
          height={48}
        />
        <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">
          <MessageCircleMore size={80} className="text-[#D4AF37] mb-6" strokeWidth={1.5} />
          <h1 className="text-[#F7F3E9] text-4xl md:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-[#F7F3E9]/80 text-lg font-light max-w-lg mx-auto leading-relaxed">
            Have a question or need assistance? We're here to help!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16 -mt-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">

          {/* Left Column*/}
          <div className="lg:w-1/3 space-y-6">

            {/* Email */}
            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-[#FFFBF4] flex items-center justify-center text-[#D4AF37] shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Email Us</h3>
                <p className="text-gray-500 text-sm">support@eventaty.com</p>
                <p className="text-gray-500 text-sm">info@eventaty.com</p>
              </div>
            </div>

            {/* Call */}
            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-[#FFFBF4] flex items-center justify-center text-[#D4AF37] shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Call Us</h3>
                <p className="text-gray-500 text-sm">+1 (555) 123-4567</p>
                <p className="text-gray-500 text-sm">Mon-Fri, 9AM-6PM EST</p>
              </div>
            </div>

            {/* Visit */}
            <div className="bg-white p-6 rounded-2xl shadow-sm flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-[#FFFBF4] flex items-center justify-center text-[#D4AF37] shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Visit Us</h3>
                <p className="text-gray-500 text-sm">123 Event Street</p>
                <p className="text-gray-500 text-sm">New York, NY 10001</p>
              </div>
            </div>

            {/* Social*/}
            <div className="bg-white p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Follow Us</h3>
              <div className="flex gap-3">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#FFFBF4] flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-lg p-8 md:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h2>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Name *</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Email *</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Subject *</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Message *</label>
                  <textarea
                    rows={6}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none transition-all resize-none placeholder:text-gray-400"
                  />
                </div>

                <button
                  type="button"
                  className="w-full bg-[#D4AF37] hover:bg-[#b5952f] text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
