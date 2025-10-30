"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`bg-gradient-to-r from-teal-400 via-teal-500 to-cyan-500 border-b border-teal-600 sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "shadow-lg" : ""
      }`}
    >
      {/* Main Navbar */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Left aligned */}
          <Link
            href="/"
            className="flex items-center space-x-3 group transform transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full animate-ping" />
              <MapPin className="h-8 w-8 text-white relative z-10 transform group-hover:rotate-12 transition-transform duration-300" />
            </div>
            <div>
              <span className="text-2xl font-bold text-white tracking-tight">
                Highway{" "}
                <span className="text-yellow-300 drop-shadow-lg">Guide</span>
              </span>
              <p className="hidden sm:block text-xs text-white/90 -mt-1">
                Explore India's Best Destinations
              </p>
            </div>
          </Link>

          {/* Right Side -*/}
          <div className="flex items-center space-x-6">
            {/* Contact Info */}
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="tel:+918001234567"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors duration-300 group"
              >
                <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-all duration-300">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="font-medium">+91 1800-123-4567</span>
              </a>
              <a
                href="mailto:support@highwayguide.com"
                className="flex items-center space-x-2 text-white hover:text-yellow-300 transition-colors duration-300 group"
              >
                <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-all duration-300">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="font-medium">support@highwayguide.com</span>
              </a>
            </div>

            <Link href="https://www.easemytrip.com/" target="__blank">
              <button
                className={`bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold 
    px-4 py-2 text-sm rounded-full shadow-md transform hover:scale-105 
    transition-all duration-300 hover:shadow-lg flex items-center space-x-1
    sm:px-6 sm:py-3 sm:text-base sm:space-x-2 sm:shadow-lg sm:hover:shadow-xl`}
              >
                <span>Book Now</span>
                <span className="animate-bounce">✈️</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ping {
          75%,
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        .animate-ping {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
      `}</style>
    </nav>
  );
}