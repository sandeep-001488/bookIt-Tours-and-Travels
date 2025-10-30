"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, Sparkles, Mail, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/context/BookingContext";

function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingRef = searchParams.get("ref") || "";
  const { clearBooking } = useBooking();
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    clearBooking();
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setShowConfetti(true), 500);
  }, [clearBooking]);

  return (
    <div className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {showConfetti && (
          <>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                }}
              />
            ))}
            {[...Array(20)].map((_, i) => (
              <div
                key={`sparkle-${i}`}
                className="absolute w-1 h-1 bg-amber-500 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${4 + Math.random() * 2}s`,
                }}
              />
            ))}
          </>
        )}
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div
          className={`bg-white rounded-2xl shadow-2xl p-8 text-center transform transition-all duration-700 ${
            isVisible
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-10 opacity-0 scale-95"
          }`}
        >
          {/* Success Icon with pulse animation */}
          <div className="flex justify-center mb-6 relative">
            <div className="absolute w-24 h-24 bg-green-200 rounded-full animate-ping opacity-20" />
            <div className="absolute w-20 h-20 bg-green-300 rounded-full animate-pulse opacity-30" />
            <div
              className={`w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-500 delay-300 ${
                isVisible ? "rotate-0 scale-100" : "rotate-180 scale-0"
              }`}
            >
              <CheckCircle className="h-12 w-12 text-white" strokeWidth={3} />
            </div>
          </div>

          {/* Sparkles decoration */}
          <div className="flex justify-center gap-2 mb-4">
            {[0, 1, 2].map((i) => (
              <Sparkles
                key={i}
                className={`h-5 w-5 text-yellow-500 transform transition-all duration-500 ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
                }`}
                style={{
                  transitionDelay: `${400 + i * 100}ms`,
                }}
              />
            ))}
          </div>

          {/* Main heading */}
          <h1
            className={`text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2 transform transition-all duration-500 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            Payment Successful!
          </h1>

          <p
            className={`text-lg text-gray-600 mb-6 transform transition-all duration-500 delay-600 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            Your booking is confirmed
          </p>

          {/* Booking reference  */}
          {bookingRef && (
            <div
              className={`bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-300 rounded-xl p-6 mb-8 transform transition-all duration-500 delay-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <p className="text-sm text-gray-600 mb-2 font-medium">
                Booking Reference
              </p>
              <p className="text-2xl font-bold text-gray-900 font-mono tracking-wider">
                {bookingRef}
              </p>
            </div>
          )}

          {/* Info message */}
          <div
            className={`flex items-center justify-center gap-2 bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8 transform transition-all duration-500 delay-800 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
            <p className="text-sm text-gray-700">
              A confirmation email has been sent to your inbox
            </p>
          </div>

          {/* Action button */}
          <Link href="/">
            <Button
              className={`bg-gradient-to-r from-[#FCD34D] to-[#FBB040] hover:from-[#FBB040] hover:to-[#FCD34D] text-black font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: "900ms" }}
            >
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Additional message */}
        <p
          className={`text-center text-gray-600 mt-8 transform transition-all duration-500 delay-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Thank you for choosing our service! 🎉
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <SuccessContent />
    </Suspense>
  );
}