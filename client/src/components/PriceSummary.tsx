import { formatPrice } from "@/utils/helpers";

interface PriceSummaryProps {
  experienceTitle: string;
  selectedDate: string;
  selectedTime: string;
  quantity: number;
  subtotal: number;
  discount: number;
  total: number;
}

export default function PriceSummary({
  experienceTitle,
  selectedDate,
  selectedTime,
  quantity,
  subtotal,
  discount,
  total,
}: PriceSummaryProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Booking Summary
      </h2>

      <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
        <div>
          <p className="text-sm font-medium text-gray-900">Experience</p>
          <p className="text-sm text-gray-600">{experienceTitle}</p>
        </div>

        {selectedDate && (
          <div>
            <p className="text-sm font-medium text-gray-900">Date</p>
            <p className="text-sm text-gray-600">{selectedDate}</p>
          </div>
        )}

        {selectedTime && (
          <div>
            <p className="text-sm font-medium text-gray-900">Time</p>
            <p className="text-sm text-gray-600">{selectedTime}</p>
          </div>
        )}
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Quantity</span>
          <span className="text-gray-900 font-medium">{quantity}</span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900 font-medium">
            {formatPrice(subtotal)}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-sm text-green-600">
            <span>Discount</span>
            <span className="font-medium">-{formatPrice(discount)}</span>
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between">
          <span className="text-base font-semibold text-gray-900">Total</span>
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(total)}
          </span>
        </div>
      </div>
    </div>
  );
}
