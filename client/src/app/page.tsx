"use client";

import { useState, useEffect } from "react";
import { getAllExperiences, getMostVisited } from "@/lib/api";
import { Experience } from "@/types";
import ExperienceCard from "@/components/ExperienceCard";
import MostVisitedCard from "@/components/MostVisitedCard";
import FilterDialog from "@/components/FilterDialog";
import Pagination from "@/components/Pagination";
import {  Search, SlidersHorizontal } from "lucide-react";

function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function HomePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [mostVisited, setMostVisited] = useState<Experience[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Filter state
  const [filters, setFilters] = useState({
    minPrice: undefined as number | undefined,
    maxPrice: undefined as number | undefined,
    destinations: [] as string[],
  });

  useEffect(() => {
    loadExperiences();
    loadMostVisited();

    const interval = setInterval(() => {
      loadMostVisited();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadExperiences();
  }, [currentPage, debouncedSearchQuery, filters]);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const response = await getAllExperiences(currentPage, 8, {
        search: searchQuery || undefined,
        ...filters,
      });
      setExperiences(response.data);
      setTotalPages(response.totalPages);
      setTotalCount(response.total);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load experiences"
      );
    } finally {
      setLoading(false);
    }
  };

  const loadMostVisited = async () => {
    try {
      const response = await getMostVisited();
      setMostVisited(response.data);
    } catch (err) {
      console.error("Failed to load most visited:", err);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);

    // Reset filters when user starts typing in search
    if (value.trim() !== "") {
      const hasActiveFilters =
        filters.minPrice !== undefined ||
        filters.maxPrice !== undefined ||
        filters.destinations.length > 0;

      if (hasActiveFilters) {
        setFilters({
          minPrice: undefined,
          maxPrice: undefined,
          destinations: [],
        });
      }
    }
  };

  const handleFilterApply = (newFilters: typeof filters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setShowFilters(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading && currentPage === 1) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-teal-400 border-t-transparent mx-auto"></div>
          <p className="text-gray-500">Loading experiences...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={loadExperiences}
            className="px-6 py-2 bg-teal-400 text-white rounded-lg hover:bg-teal-500"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Container */}
      <div className="px-4 lg:px-8 py-8">
        <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="lg:w-80 flex-shrink-0 space-y-6">
            {/* Search Bar with Filter - Mobile Only (Top Position) */}
            <div className="lg:hidden">
              <div className="bg-white rounded-full border border-teal-700 flex items-center px-6 py-3 shadow-sm hover:shadow-md transition-shadow">
                <input
                  type="text"
                  placeholder="Search Experience"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="flex-1 text-base text-gray-600 placeholder-teal-700 outline-none"
                />
                <button
                  onClick={() => setShowFilters(true)}
                  className="mx-auto -ml-2 p-2 hover:bg-teal-50 rounded-full transition-colors"
                  title="Filters"
                >
                  <SlidersHorizontal className="w-5 h-5 text-teal-700" />
                </button>
                <Search className="w-5 h-5 text-teal-700 ml-2" />
              </div>
            </div>

            {/* Exclusive Offer Card */}
            <div className="bg-white rounded-2xl border border-gray-300 p-4 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="bg-orange-400 rounded-lg px-6 py-3 text-center hover:bg-orange-500 transition-colors">
                  <span className="text-white text-xl font-bold">
                    Exclusive offer
                  </span>
                </div>
                <div className="bg-cyan-400 rounded-lg px-6 py-5 relative hover:bg-cyan-500 transition-colors">
                  <div className="text-white text-2xl font-bold text-center">
                    Flat 10%
                  </div>
                  <div className="absolute bottom-1 right-2 bg-amber-300 rounded-lg px-2 py-0.5 ">
                    <span className="text-black text-[9px] text-center font-bold">
                      Limited time only
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-black text-base font-bold text-center">
                Use Promocode : WELCOME20
              </div>
            </div>

            {/* Most Visited Section */}
            <div>
              <h2 className="text-slate-700 text-2xl font-semibold mb-4">
                Most Visited
              </h2>
              <div className="space-y-4">
                {mostVisited.map((place) => (
                  <MostVisitedCard key={place._id} experience={place} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 pt-6">
            {/* Search Bar with Filter - Desktop Only */}
            <div className="hidden lg:flex justify-center">
              <div className="w-full max-w-2xl">
                <div className="bg-white rounded-full border border-teal-700 flex items-center px-6 py-3 shadow-sm hover:shadow-md transition-shadow">
                  <input
                    type="text"
                    placeholder="Search Experience"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="flex-1 text-base text-gray-600 placeholder-teal-700 outline-none"
                  />
                  <button
                    onClick={() => setShowFilters(true)}
                    className="ml-2 p-2 hover:bg-teal-50 rounded-full transition-colors"
                    title="Filters"
                  >
                    <SlidersHorizontal className="w-5 h-5 text-teal-700" />
                  </button>
                  <Search className="w-5 h-5 text-teal-700 ml-2" />
                </div>
              </div>
            </div>

            {/* Results count */}
            {searchQuery ||
            filters.minPrice ||
            filters.maxPrice ||
            filters.destinations.length > 0 ? (
              <div className="text-center text-sm text-gray-600">
                Found {totalCount} experience{totalCount !== 1 ? "s" : ""}
              </div>
            ) : null}

            {/* Experiences Grid - Added margin-top for better spacing */}
            <div className="relative">
              <div className="mt-19">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
                  {experiences.map((experience) => (
                    <ExperienceCard
                      key={experience._id}
                      experience={experience}
                    />
                  ))}

                  {experiences.length === 0 && (
                    <div className="col-span-full text-center py-12">
                      <p className="text-gray-500">No experiences found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>

      {/* Filter Dialog */}
      <FilterDialog
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        currentFilters={filters}
        onApply={handleFilterApply}
      />
    </div>
  );
}