import asyncHandler from "../middlewares/asyncHandler.js";
import Experience from "../models/Experience.js";

export const getAllExperiences = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;
  const skip = (page - 1) * limit;

  // Filter parameters
  const { search, minPrice, maxPrice, destinations } = req.query;

  let filter = {};

  // Search filter (title, description, location, category)
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { location: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  // Price range filter
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }

  // Destinations filter (comma-separated)
  if (destinations) {
    const destinationArray = destinations.split(",").map((d) => d.trim());
    filter.location = { $in: destinationArray.map((d) => new RegExp(d, "i")) };
  }

  const total = await Experience.countDocuments(filter);
  const experiences = await Experience.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: experiences.length,
    total,
    page,
    totalPages: Math.ceil(total / limit),
    data: experiences,
  });
});

export const getExperienceById = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);

  if (!experience) {
    res.status(404);
    throw new Error("Experience not found");
  }

  res.status(200).json({
    success: true,
    data: experience,
  });
});

// New endpoint for Most Visited (rotating selection)
export const getMostVisited = asyncHandler(async (req, res) => {
  const currentMinutes = Math.floor(Date.now() / (1000 * 60));

  const rotationIndex = Math.floor(currentMinutes / 5) % 8;

  const allExperiences = await Experience.find({}).sort({ createdAt: -1 });

  const startIndex = (rotationIndex * 2) % allExperiences.length;
  const selectedExperiences = [
    allExperiences[startIndex],
    allExperiences[(startIndex + 1) % allExperiences.length],
  ].filter(Boolean);

  res.status(200).json({
    success: true,
    count: selectedExperiences.length,
    data: selectedExperiences,
    nextRotationIn: 5 - (Math.floor(currentMinutes) % 5), 
  });
});