"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useBooking } from "@/context/BookingContext";
import { createBooking, validatePromoCode } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Info, X } from "lucide-react";
import Link from "next/link";
import { formatPrice, validateEmail, validateName } from "@/utils/helpers";

export default function CheckoutPage() {
  const router = useRouter();
  const { selectedExperience, selectedDate, selectedTime, quantity } =
    useBooking();

  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    promoCode: "",
  });

  const [discount, setDiscount] = useState(0);
  const [promoError, setPromoError] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [policyConfirmationClicked, setPolicyConfirmationClicked] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [validatingPromo, setValidatingPromo] = useState(false);
  const [showPromoCodes, setShowPromoCodes] = useState(false);
  const [errors, setErrors] = useState({
    userName: "",
    userEmail: "",
    policyConfirmation: "",
  });

  useEffect(() => {
    if (!selectedExperience || !selectedDate || !selectedTime) {
      router.push("/");
    }
  }, [selectedExperience, selectedDate, selectedTime, router]);

  if (!selectedExperience || !selectedDate || !selectedTime) {
    return null;
  }

  const subtotal = selectedExperience.price * quantity;
  const taxes = Math.round(subtotal * 0.05);
  const total = subtotal + taxes - discount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleApplyPromo = async () => {
    if (!formData.promoCode.trim()) {
      setPromoError("Please enter a promo code");
      return;
    }

    try {
      setValidatingPromo(true);
      setPromoError("");
      const response = await validatePromoCode(formData.promoCode, subtotal);
      setDiscount(response.data.discountAmount);
      setPromoApplied(true);
      setPromoError("");
      setShowPromoCodes(false);
    } catch (err) {
      setPromoError(err instanceof Error ? err.message : "Invalid promo code");
      setDiscount(0);
      setPromoApplied(false);
    } finally {
      setValidatingPromo(false);
    }
  };

  const handleRemovePromo = () => {
    setFormData((prev) => ({ ...prev, promoCode: "" }));
    setDiscount(0);
    setPromoApplied(false);
    setPromoError("");
  };

  const handlePromoCodeClick = (code: string) => {
    setFormData((prev) => ({ ...prev, promoCode: code }));
    setShowPromoCodes(false);
  };

  const validateForm = () => {
    const newErrors = {
      userName: "",
      userEmail: "",
      policyConfirmation: "",
    };
    let isValid = true;

    if (!validateName(formData.userName)) {
      newErrors.userName = "Please enter a valid name (at least 2 characters)";
      isValid = false;
    }

    if (!validateEmail(formData.userEmail)) {
      newErrors.userEmail = "Please enter a valid email address";
      isValid = false;
    }
    if (policyConfirmationClicked == false) {
      newErrors.policyConfirmation = "Please agree to terms and conditons";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      const bookingData = {
        experienceId: selectedExperience._id,
        userName: formData.userName,
        userEmail: formData.userEmail,
        selectedDate,
        selectedTime,
        quantity,
        subtotal,
        discount,
        total,
        promoCode: promoApplied ? formData.promoCode : null,
      };

      const response = await createBooking(bookingData);

      router.push(`/result/success?ref=${response.data.bookingReference}`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to create booking";
      router.push(
        `/result/failure?message=${encodeURIComponent(errorMessage)}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <Link href={`/experiences/${selectedExperience._id}`}>
        <Button variant="ghost" className="mb-6 text-red-600">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Checkout
        </Button>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2 ">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Details */}
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <h2 className="text-xl font-semibold mb-4 text-blue-900">
                Your Details
              </h2>

              <div className="space-y-2">
                <Label htmlFor="userName" className="text-teal-900">
                  Full name
                </Label>
                <Input
                  id="userName"
                  name="userName"
                  type="text"
                  placeholder="Test"
                  value={formData.userName}
                  onChange={handleInputChange}
                  className={
                    errors.userName
                      ? "border-destructive"
                      : "hover:border-teal-900 !placeholder-gray-400 text-red-900"
                  }
                />
                {errors.userName && (
                  <p className="text-sm text-destructive">{errors.userName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="userEmail" className="text-teal-900">
                  Email
                </Label>
                <Input
                  id="userEmail"
                  name="userEmail"
                  type="email"
                  placeholder="test@gmail.com"
                  value={formData.userEmail}
                  onChange={handleInputChange}
                  className={
                    errors.userEmail
                      ? "border-destructive"
                      : "hover:border-teal-900 !placeholder-gray-400 text-red-900"
                  }
                />
                {errors.userEmail && (
                  <p className="text-sm text-destructive">{errors.userEmail}</p>
                )}
              </div>

              {/* Promo Code - Optional */}
              <div className="space-y-2 ">
                <div className="flex items-center justify-between ">
                  <Label htmlFor="promoCode" className="text-red-600">
                    Promo code{" "}
                    <span className="text-muted-foreground text-xs text-blue-500 ">
                      (Optional)
                    </span>
                  </Label>
                  <button
                    type="button"
                    onClick={() => setShowPromoCodes(!showPromoCodes)}
                    className="flex items-center gap-1 text-sm text-blue-700 "
                  >
                    <Info className="h-4 w-4" />
                    <span>View available codes</span>
                  </button>
                </div>

                {/* Available Promo Codes Dropdown */}
                {showPromoCodes && (
                  <div className="border border-gray-200 rounded-lg p-4 bg-blue-50 space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold text-gray-900">
                        Available Promo Codes
                      </h3>
                      <button
                        type="button"
                        onClick={() => setShowPromoCodes(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div
                        onClick={() => handlePromoCodeClick("SAVE10")}
                        className="bg-white border border-gray-200 rounded-md p-3 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">
                              SAVE10
                            </p>
                            <p className="text-xs text-gray-600">
                              10% off (Max ₹200)
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Min ₹500
                          </span>
                        </div>
                      </div>

                      <div
                        onClick={() => handlePromoCodeClick("FLAT100")}
                        className="bg-white border border-gray-200 rounded-md p-3 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">
                              FLAT100
                            </p>
                            <p className="text-xs text-gray-600">₹100 off</p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Min ₹1000
                          </span>
                        </div>
                      </div>

                      <div
                        onClick={() => handlePromoCodeClick("WELCOME20")}
                        className="bg-white border border-gray-200 rounded-md p-3 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">
                              WELCOME20
                            </p>
                            <p className="text-xs text-gray-600">
                              20% off (Max ₹500)
                            </p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            Min ₹800
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Input
                    id="promoCode"
                    name="promoCode"
                    type="text"
                    placeholder="Enter promo code"
                    className="!placeholder-teal-600 hover:border-teal-900 focus:border-teal-900 text-teal-900"
                    value={formData.promoCode}
                    onChange={handleInputChange}
                    disabled={promoApplied}
                  />

                  {promoApplied ? (
                    <Button
                      type="button"
                      onClick={handleRemovePromo}
                      variant="outline"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleApplyPromo}
                      disabled={validatingPromo || !formData.promoCode.trim()}
                      className="bg-teal-900 text-white hover:bg-teal-900"
                    >
                      {validatingPromo ? "Validating..." : "Apply"}
                    </Button>
                  )}
                </div>

                {promoError && (
                  <p className="text-sm text-destructive">{promoError}</p>
                )}
                {promoApplied && (
                  <p className="text-sm text-green-600">
                    ✓ Promo code applied successfully! You saved{" "}
                    {formatPrice(discount)}
                  </p>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 pt-4">
                <input
                  type="checkbox"
                  id="terms"
                  checked={policyConfirmationClicked}
                  onChange={(e) =>
                    setPolicyConfirmationClicked(e.target.checked)
                  }
                  className="mt-1"
                />

                <Label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground cursor-pointer hover:text-teal-900"
                >
                  I agree to the <span className="text-blue-700">terms and safety policy</span>
                </Label>
              </div>
              {errors.policyConfirmation && (
                <p
                  className={`${
                    policyConfirmationClicked === true && "hidden"
                  } text-sm text-destructive`}
                >
                  {errors.policyConfirmation}
                </p>
              )}
            </div>
          </form>
        </div>

        {/* Summary Section */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Booking Summary */}
            <div className="rounded-lg border bg-card p-6 space-y-4">
              <h3 className="font-semibold mb-4 text-blue-900">
                Booking Summary
              </h3>

              <div className="space-y-2 text-sm ">
                <div className="flex justify-between ">
                  <span className="text-muted-foreground text-violet-900">
                    Experience
                  </span>
                  <span className="font-medium text-right text-teal-900">
                    {selectedExperience.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-violet-900">
                    Date
                  </span>
                  <span className="font-medium text-teal-900">
                    {selectedDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-violet-900">
                    Time
                  </span>
                  <span className="font-medium text-teal-900">
                    {selectedTime}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-violet-900">
                    Qty
                  </span>
                  <span className="font-medium text-teal-900">{quantity}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-muted-foreground text-violet-900 font-semibold">
                    Subtotal
                  </span>
                  <span className=" text-teal-900 font-semibold">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-violet-700 font-medium opacity-70">
                    Taxes
                  </span>
                  <span className="font-medium text-teal-900 opacity-70">
                    {formatPrice(taxes)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-red-600">
                    <span>Discount</span>
                    <span className="font-medium">
                      -{formatPrice(discount)}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-blue-900 text-2xl">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-teal-900">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmit}
              className="w-full bg-[#FCD34D] hover:bg-[#FCD34D]/90 text-black"
              size="lg"
              disabled={loading}
            >
              {loading ? "Processing..." : "Pay and Confirm"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
