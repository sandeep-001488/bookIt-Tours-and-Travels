export interface Experience {
  _id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  image: string;
  category: string;
  about: string;
  slots: Slot[];
  createdAt?: string;
  updatedAt?: string;
}

export interface Slot {
  date: string;
  timeSlots: TimeSlot[];
  _id?: string;
}

export interface TimeSlot {
  time: string;
  available: number;
  booked: number;
  _id?: string;
}

export interface Booking {
  _id?: string;
  experienceId: string;
  experienceTitle: string;
  userName: string;
  userEmail: string;
  selectedDate: string;
  selectedTime: string;
  quantity: number;
  subtotal: number;
  discount: number;
  total: number;
  promoCode?: string | null;
  bookingReference: string;
  status: "confirmed" | "cancelled" | "pending";
  createdAt?: string;
  updatedAt?: string;
}

export interface PromoValidation {
  code: string;
  discountAmount: number;
  discountType: "percentage" | "fixed";
  discountValue: number;
}

export interface BookingFormData {
  userName: string;
  userEmail: string;
  promoCode?: string;
}

export interface PaginationResponse<T> {
  success: boolean;
  count: number;
  total: number;
  page: number;
  totalPages: number;
  data: T[];
}

export interface FilterOptions {
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  destinations?: string[];
}