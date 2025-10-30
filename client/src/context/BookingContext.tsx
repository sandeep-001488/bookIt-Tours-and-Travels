"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Experience } from "@/types";

interface BookingContextType {
  selectedExperience: Experience | null;
  setSelectedExperience: (experience: Experience | null) => void;
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  clearBooking: () => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const storedData = localStorage.getItem("bookingData");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        if (parsed.selectedExperience)
          setSelectedExperience(parsed.selectedExperience);
        if (parsed.selectedDate) setSelectedDate(parsed.selectedDate);
        if (parsed.selectedTime) setSelectedTime(parsed.selectedTime);
        if (parsed.quantity) setQuantity(parsed.quantity);
      } catch (error) {
        console.error("Error loading booking data:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isInitialized) return;

    const bookingData = {
      selectedExperience,
      selectedDate,
      selectedTime,
      quantity,
    };
    localStorage.setItem("bookingData", JSON.stringify(bookingData));
  }, [selectedExperience, selectedDate, selectedTime, quantity, isInitialized]);

  const clearBooking = () => {
    setSelectedExperience(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setQuantity(1);
    localStorage.removeItem("bookingData");
  };

  return (
    <BookingContext.Provider
      value={{
        selectedExperience,
        setSelectedExperience,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        quantity,
        setQuantity,
        clearBooking,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider");
  }
  return context;
}
