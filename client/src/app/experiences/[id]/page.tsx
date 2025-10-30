"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { getExperienceById } from "@/lib/api";
import { useBooking } from "@/context/BookingContext";
import { Experience } from "@/types";
import SlotPicker from "@/components/SlotPicker";
import { formatPrice } from "@/utils/helpers";
import { Loader2, MapPin, ArrowLeft, Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ExperienceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const {
    setSelectedExperience,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    quantity,
    setQuantity,
  } = useBooking();

  const [experience, setExperience] = useState<Experience | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setLoading(true);
        const data = await getExperienceById(params.id as string);
        setExperience(data.data);
        setSelectedExperience(data.data);
        if (data.data.slots.length > 0) {
          setSelectedDate(data.data.slots[0].date);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load experience");
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [params.id, setSelectedExperience, setSelectedDate]);

  const handleConfirm = () => {
    if (!selectedDate || !selectedTime) {
      alert("Please select both date and time");
      return;
    }

    router.push(
      `/checkout?experienceId=${experience?._id}&date=${selectedDate}&time=${selectedTime}&quantity=${quantity}`
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <p className="text-red-800">{error || "Experience not found"}</p>
        </div>
      </div>
    );
  }

  const subtotal = experience.price * quantity;
  const total = subtotal;

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-all duration-200 hover:translate-x-[-4px] group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 transition-transform text-red-600 group-hover:translate-x-[-2px]" />
          <span className="text-sm  text-red-600 font-medium">
            Back to Experiences
          </span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">
          {/* Left Column */}
          <div className="lg:col-span-6">
            <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden mb-6 shadow-xl group">
              <Image
                src={experience.image}
                alt={experience.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>

            <div className="animate-fadeIn">
              <h1 className="text-4xl font-bold text-blue-900 mb-3">
                {experience.title}
              </h1>

              <div className="flex items-center text-gray-600 mb-6">
                <MapPin className="h-5 w-5 mr-2 text-red-600" />
                <span className="text-red-600">{experience.location}</span>
              </div>

              <p className="text-pink-500 text-lg mb-8 leading-relaxed">
                {experience.description}
              </p>

              <div className="bg-gray-100 rounded-2xl p-8 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <div className="flex  items-center mb-4">
                  <div className=" p-2 rounded-lg mr-3">
                    <Calendar className="h-5 w-5 text-teal-900" />
                  </div>
                  <h2 className="text-xl font-semibold text-teal-900">
                    About This Experience
                  </h2>
                </div>
                <p className="text-blue-500 leading-relaxed">
                  {experience.about}
                </p>
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          <div className="hidden lg:block lg:col-span-1 relative">
            <div className="absolute inset-y-0 left-1/2 w-px bg-gray-700 transform -translate-x-1/2"></div>
          </div>

          {/* Right Column*/}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 lg:p-12 sticky top-24 shadow-xl hover:shadow-2xl transition-all duration-300">
              {/* Price Section */}
              <div className="mb-8 pb-6 border-b border-gray-200">
                <div className="flex items-baseline mb-6">
                  <span className="text-sm text-red-600 mr-2">Starts at</span>
                  <span className="text-4xl font-bold text-teal-900 animate-fadeIn">
                    {formatPrice(experience.price)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-900" />
                    <span className="text-sm font-medium text-gray-700">
                      Quantity
                    </span>
                  </div>
                  <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden hover:border-teal-900 transition-colors">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 text-red-600 font-bold  transition-colors duration-200"
                    >
                      −
                    </button>
                    <span className="px-6 py-2 text-gray-900 font-semibold border-x-2 border-gray-300 hover:border-teal-900 bg-gray-50">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 text-green-600 font-bold transition-colors duration-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Slot Picker Component */}
              <div className="mb-8">
                <SlotPicker
                  slots={experience.slots}
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onDateSelect={setSelectedDate}
                  onTimeSelect={setSelectedTime}
                />
              </div>

              {/* Total Section */}
              <div className="pt-6 border-t-2 border-gray-200">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-teal-700 ">Subtotal</span>
                    <span className="text-lg text-blue-900">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <span className="text-lg font-bold text-teal-900">
                      Total
                    </span>
                    <span className="text-3xl font-bold text-blue-900 animate-fadeIn">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleConfirm}
                  disabled={!selectedDate || !selectedTime}
                  className={`
                    w-full h-14 text-base font-bold rounded-xl bg-teal-900 text-white transition-all duration-300
                    ${
                      !selectedDate || !selectedTime
                        ? "cursor-not-allowed "
                        : "bg-teal-900 text-white shadow-lg hover:bg-teal-900 hover:shadow-xl hover:scale-105 active:scale-95"
                    }
                  `}
                >
                  {!selectedDate || !selectedTime
                    ? "Select Date & Time"
                    : "Confirm Booking"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}