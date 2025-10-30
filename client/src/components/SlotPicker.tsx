"use client";

import { Slot } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils/helpers";

interface SlotPickerProps {
  slots: Slot[];
  selectedDate: string | null;
  selectedTime: string | null;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

export default function SlotPicker({
  slots,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}: SlotPickerProps) {
  return (
    <div className="space-y-6">
      {/* Date Selection */}
      <div>
        <h3 className="text-sm font-medium mb-3 text-blue-700">Choose date</h3>
        <div className="flex gap-2 flex-wrap">
          {slots.map((slot) => (
            <Button
              key={slot.date}
              variant="outline"
              className={cn(
                "text-sm",
                selectedDate === slot.date &&
                  "bg-teal-700 border-teal-900 text-white hover:text-teal-800"
              )}
              onClick={() => onDateSelect(slot.date)}
            >
              {new Date(slot.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </Button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div>
          <h3 className="text-sm font-medium mb-3 text-blue-700">
            Choose time
          </h3>
          <div className="flex gap-2 flex-wrap">
            {slots
              .find((slot) => slot.date === selectedDate)
              ?.timeSlots.map((timeSlot) => {
                const isAvailable = timeSlot.available - timeSlot.booked > 0;
                return (
                  <Button
                    key={timeSlot.time}
                    variant="outline"
                    disabled={!isAvailable}
                    className={cn(
                      "text-sm",
                      selectedTime === timeSlot.time &&
                        "bg-teal-700 border-teal-900 text-white hover:text-teal-800",
                      !isAvailable && "opacity-50 cursor-not-allowed"
                    )}
                    onClick={() => isAvailable && onTimeSelect(timeSlot.time)}
                  >
                    {timeSlot.time}
                  </Button>
                );
              })}
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            All times are in IST (GMT +5:30)
          </p>
        </div>
      )}
    </div>
  );
}
