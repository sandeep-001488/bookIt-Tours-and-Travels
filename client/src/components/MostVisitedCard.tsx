"use client";

import { Experience } from "@/types";
import { MapPin, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface MostVisitedCardProps {
  experience: Experience;
}

export default function MostVisitedCard({ experience }: MostVisitedCardProps) {
  return (
    <Link href={`/experiences/${experience._id}`}>
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group cursor-pointer border border-gray-200">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={experience.image}
            alt={experience.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Trending badge */}
          <div className="absolute top-3 right-3 bg-amber-400 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
            <TrendingUp className="w-3 h-3" />
            Popular
          </div>
        </div>

        <div className="p-5">
          <h3 className="text-slate-800 text-lg font-bold mb-2 group-hover:text-teal-600 transition-colors line-clamp-1">
            {experience.title}
          </h3>
          <div className="flex items-start gap-2 mb-3">
            <MapPin
              className="w-4 h-4 text-teal-500 mt-0.5 flex-shrink-0"
              strokeWidth={2}
            />
            <div className="text-gray-700 text-sm font-medium group-hover:text-teal-600 transition-colors">
              {experience.location}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
