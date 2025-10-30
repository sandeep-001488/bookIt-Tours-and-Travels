"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface FilterDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentFilters: {
    minPrice?: number | undefined;
    maxPrice?: number | undefined;
    destinations: string[];
  };
  onApply: (filters: {
    minPrice: number | undefined;
    maxPrice: number | undefined;
    destinations: string[];
  }) => void;
}

const AVAILABLE_DESTINATIONS = [
  "Jaisalmer, Rajasthan",
  "Kaziranga, Assam",
  "Old Delhi, Delhi",
  "Havelock Island, Andaman & Nicobar Islands",
  "Munnar, Kerala",
  "Alleppey (Alappuzha), Kerala",
  "Leh-Ladakh, Jammu & Kashmir",
  "Darjeeling, West Bengal",
  "Rishikesh, Uttarakhand",
  "Goa",
  "Kutch, Gujarat",
  "Bir Billing, Himachal Pradesh",
  "Mahabalipuram, Tamil Nadu",
  "Dawki, Meghalaya",
  "Jaipur, Rajasthan",
];

export default function FilterDialog({
  isOpen,
  onClose,
  currentFilters,
  onApply,
}: FilterDialogProps) {
  const [minPrice, setMinPrice] = useState<string>(
    currentFilters.minPrice?.toString() || ""
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    currentFilters.maxPrice?.toString() || ""
  );
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>(
    currentFilters.destinations || []
  );

  if (!isOpen) return null;

  const handleDestinationToggle = (destination: string) => {
    if (selectedDestinations.includes(destination)) {
      setSelectedDestinations(
        selectedDestinations.filter((d) => d !== destination)
      );
    } else {
      setSelectedDestinations([...selectedDestinations, destination]);
    }
  };

  const handleApply = () => {
    onApply({
      minPrice: minPrice ? parseFloat(minPrice) : undefined,
      maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
      destinations: selectedDestinations,
    });
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedDestinations([]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-180px)]">
          {/* Price Range */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Price Range
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Min Price (₹)
                </label>
                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-2">
                  Max Price (₹)
                </label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="10000"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                />
              </div>
            </div>
          </div>

          {/* Destinations */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Destinations
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {AVAILABLE_DESTINATIONS.map((destination) => (
                <label
                  key={destination}
                  className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedDestinations.includes(destination)}
                    onChange={() => handleDestinationToggle(destination)}
                    className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                  />
                  <span className="text-gray-700 text-sm">{destination}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={handleReset}
            className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            Reset All
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
