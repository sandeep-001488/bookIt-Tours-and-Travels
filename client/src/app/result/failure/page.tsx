"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, AlertCircle, Home, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

function FailureContent() {
  const searchParams = useSearchParams();
  const errorMessage =
    searchParams.get("message") || "Something went wrong. Please try again.";
  const [isVisible, setIsVisible] = useState(false);
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
    setTimeout(() => setShowParticles(true), 500);
  }, []);

  return (
    <div className="bg-gradient-to-br from-red-50 via-orange-50 to-rose-50 min-h-screen relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {showParticles && (
          <>
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-red-300 rounded-full animate-float-slow opacity-40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${5 + Math.random() * 3}s`,
                }}
              />
            ))}
            {[...Array(15)].map((_, i) => (
              <div
                key={`dot-${i}`}
                className="absolute w-1 h-1 bg-orange-400 rounded-full animate-float-slow opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `-${Math.random() * 20}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${6 + Math.random() * 2}s`,
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
          {/* Error Icon */}
          <div className="flex justify-center mb-6 relative">
            <div className="absolute w-24 h-24 bg-red-200 rounded-full animate-ping opacity-20" />
            <div className="absolute w-20 h-20 bg-red-300 rounded-full animate-pulse opacity-30" />
            <div
              className={`w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center shadow-lg transform transition-all duration-500 delay-300 ${
                isVisible ? "scale-100 animate-shake" : "scale-0"
              }`}
            >
              <XCircle className="h-12 w-12 text-white" strokeWidth={3} />
            </div>
          </div>

          {/* Alert icons */}
          <div className="flex justify-center gap-2 mb-4">
            {[0, 1, 2].map((i) => (
              <AlertCircle
                key={i}
                className={`h-5 w-5 text-red-500 transform transition-all duration-500 ${
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
            className={`text-4xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-2 transform transition-all duration-500 delay-500 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            Payment Failed
          </h1>

          <p
            className={`text-lg text-gray-600 mb-6 transform transition-all duration-500 delay-600 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            We couldn't process your booking
          </p>

          {/* Error message */}
          <div
            className={`bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-300 rounded-xl p-6 mb-8 transform transition-all duration-500 delay-700 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <p className="text-sm text-gray-600 mb-2 font-medium">
              Error Details
            </p>
            <p className="text-base text-gray-800">
              {decodeURIComponent(errorMessage)}
            </p>
          </div>

          {/* Info message */}
          <div
            className={`flex items-start justify-center gap-3 bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8 transform transition-all duration-500 delay-800 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-left">
              <p className="text-sm font-medium text-gray-900 mb-1">
                What happened?
              </p>
              <p className="text-sm text-gray-700">
                Your payment was not completed. Don't worry, no charges were
                made to your account.
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div
            className={`flex flex-col sm:flex-row justify-center gap-4 transform transition-all duration-500 delay-900 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <Button
              onClick={() => window.history.back()}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Try Again
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="border-2 border-gray-300 hover:border-gray-400 bg-white hover:bg-gray-50 text-gray-700 font-semibold px-8 py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 w-full sm:w-auto"
              >
                <Home className="h-5 w-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Additional help message */}
        <div
          className={`bg-white rounded-xl shadow-md p-6 mt-8 transform transition-all duration-500 delay-1000 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="text-center text-gray-700 font-medium mb-2">
            Need Help?
          </p>
          <p className="text-center text-gray-600 text-sm">
            If you continue to experience issues, please contact our support
            team or try a different payment method.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.4;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0) rotate(0deg);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-3px) rotate(-2deg);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(3px) rotate(2deg);
          }
        }
        .animate-float-slow {
          animation: float-slow linear infinite;
        }
        .animate-shake {
          animation: shake 0.6s ease-in-out;
        }
      `}</style>
    </div>
  );
}

export default function FailurePage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <FailureContent />
    </Suspense>
  );
}
