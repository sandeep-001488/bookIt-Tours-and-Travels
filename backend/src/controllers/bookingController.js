import asyncHandler from "../middlewares/asyncHandler.js";
import Booking from "../models/Booking.js";
import Experience from "../models/Experience.js";
import generateBookingReference from "../utils/helpers.js";

export const createBooking = asyncHandler(async (req, res) => {
  const {
    experienceId,
    userName,
    userEmail,
    selectedDate,
    selectedTime,
    quantity,
    subtotal,
    discount,
    total,
    promoCode,
  } = req.body;

  if (
    !experienceId ||
    !userName ||
    !userEmail ||
    !selectedDate ||
    !selectedTime ||
    !quantity
  ) {
    res.status(400);
    throw new Error("Please provide all required fields");
  }

  // First, find the experience and check availability
  const experience = await Experience.findById(experienceId);

  if (!experience) {
    res.status(404);
    throw new Error("Experience not found");
  }

  // Find the specific slot
  const slot = experience.slots.find((s) => s.date === selectedDate);

  if (!slot) {
    res.status(400);
    throw new Error("Selected date is not available");
  }

  // Find the specific time slot
  const timeSlot = slot.timeSlots.find((ts) => ts.time === selectedTime);

  if (!timeSlot) {
    res.status(400);
    throw new Error("Selected time is not available");
  }

  // Check if enough slots are available
  const availableSlots = timeSlot.available - timeSlot.booked;

  if (availableSlots < quantity) {
    res.status(400);
    throw new Error(
      `Only ${availableSlots} slot(s) available. You requested ${quantity}.`
    );
  }

  // Update the booking count
  const updatedExperience = await Experience.findOneAndUpdate(
    {
      _id: experienceId,
      "slots.date": selectedDate,
      "slots.timeSlots.time": selectedTime,
    },
    {
      $inc: {
        "slots.$[slot].timeSlots.$[timeSlot].booked": quantity,
      },
    },
    {
      arrayFilters: [
        { "slot.date": selectedDate },
        { "timeSlot.time": selectedTime },
      ],
      new: true,
    }
  );

  if (!updatedExperience) {
    res.status(400);
    throw new Error("Failed to update slot availability");
  }

  const bookingReference = generateBookingReference();

  const booking = await Booking.create({
    experienceId,
    experienceTitle: experience.title,
    userName,
    userEmail,
    selectedDate,
    selectedTime,
    quantity,
    subtotal,
    discount: discount || 0,
    total,
    promoCode: promoCode || null,
    bookingReference,
    status: "confirmed",
  });

  res.status(201).json({
    success: true,
    data: booking,
  });
});

export const getBookingByReference = asyncHandler(async (req, res) => {
  const booking = await Booking.findOne({
    bookingReference: req.params.reference,
  });

  if (!booking) {
    res.status(404);
    throw new Error("Booking not found");
  }

  res.status(200).json({
    success: true,
    data: booking,
  });
});