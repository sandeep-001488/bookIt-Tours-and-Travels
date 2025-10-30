import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  timeSlots: [
    {
      time: {
        type: String,
        required: true,
      },
      available: {
        type: Number,
        required: true,
        default: 10,
      },
      booked: {
        type: Number,
        default: 0,
      },
    },
  ],
});

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      required: true,
    },
    slots: [slotSchema],
  },
  {
    timestamps: true,
  }
);

const Experience = mongoose.model("Experience", experienceSchema);
export default Experience;
