"use client";

import { Experience } from "@/types";
import { formatPrice } from "@/utils/helpers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

interface ExperienceCardProps {
  experience: Experience;
}

export default function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-zinc-100 overflow-hidden hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group flex flex-col h-full w-full max-w-[300px] mx-auto">
      <div className="relative h-40 w-full overflow-hidden">
        <Image
          src={experience.image}
          alt={experience.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-2 gap-2">
          <h3 className="font-semibold text-base text-blue-700 group-hover:text-slate-900 transition-colors line-clamp-1">
            {experience.title}
          </h3>
          <span className="text-xs bg-teal-200 text-black px-2 py-0.5 rounded whitespace-nowrap">
            {experience.category}
          </span>
        </div>
        <p className="text-xs text-pink-600 mb-3 line-clamp-2 flex-grow">
          {experience.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-2">
          <div>
            <span className="text-xs text-red-700 font-semibold">From </span>
            <span className="font-medium text-teal-900 text-sm">
              {formatPrice(experience.price)}
            </span>
          </div>
          <Link href={`/experiences/${experience._id}`}>
            <Button className="bg-amber-300 hover:bg-amber-400 text-black text-xs font-normal px-3 py-1 h-auto rounded-lg transition-all duration-200 hover:shadow-md">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
