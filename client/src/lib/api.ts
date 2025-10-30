import {
  Experience,
  Booking,
  PromoValidation,
  PaginationResponse,
} from "@/types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response
      .json()
      .catch(() => ({ message: "Something went wrong" }));
    throw new Error(error.message || "API request failed");
  }
  return response.json();
}

// Named exports for individual functions
export async function getAllExperiences(
  page: number = 1,
  limit: number = 8,
  filters?: {
    search?: string;
    minPrice?: number;
    maxPrice?: number;
    destinations?: string[];
  }
): Promise<PaginationResponse<Experience>> {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
  });

  if (filters?.search) {
    params.append("search", filters.search);
  }
  if (filters?.minPrice !== undefined) {
    params.append("minPrice", filters.minPrice.toString());
  }
  if (filters?.maxPrice !== undefined) {
    params.append("maxPrice", filters.maxPrice.toString());
  }
  if (filters?.destinations && filters.destinations.length > 0) {
    params.append("destinations", filters.destinations.join(","));
  }

  const response = await fetch(`${API_BASE_URL}/experiences?${params}`);
  return handleResponse(response);
}

export async function getMostVisited(): Promise<{
  success: boolean;
  count: number;
  data: Experience[];
  nextRotationIn: number;
}> {
  const response = await fetch(`${API_BASE_URL}/experiences/most-visited`);
  return handleResponse(response);
}

export async function getExperienceById(
  id: string
): Promise<{ success: boolean; data: Experience }> {
  const response = await fetch(`${API_BASE_URL}/experiences/${id}`);
  return handleResponse(response);
}

export async function createBooking(
  bookingData: Partial<Booking>
): Promise<{ success: boolean; data: Booking }> {
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });
  return handleResponse(response);
}

export async function getBookingByReference(
  reference: string
): Promise<{ success: boolean; data: Booking }> {
  const response = await fetch(`${API_BASE_URL}/bookings/${reference}`);
  return handleResponse(response);
}

export async function validatePromoCode(
  code: string,
  orderValue: number
): Promise<{ success: boolean; data: PromoValidation }> {
  const response = await fetch(`${API_BASE_URL}/promo/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, orderValue }),
  });
  return handleResponse(response);
}

export const api = {
  getAllExperiences,
  getMostVisited,
  getExperienceById,
  createBooking,
  getBookingByReference,
  validatePromoCode,
};