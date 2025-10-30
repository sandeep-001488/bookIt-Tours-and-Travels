import asyncHandler from "../middlewares/asyncHandler.js";
import Promo from "../models/Promo.js";


export const validatePromoCode = asyncHandler(async (req, res) => {
  const { code, orderValue } = req.body;

  if (!code || orderValue === undefined) {
    res.status(400);
    throw new Error("Please provide promo code and order value");
  }

  // Find active promo code
  const promo = await Promo.findOne({
    code: code.toUpperCase(),
    isActive: true,
    $or: [{ expiryDate: null }, { expiryDate: { $gte: new Date() } }],
  });

  if (!promo) {
    res.status(404);
    throw new Error("Invalid or expired promo code");
  }

  if (orderValue < promo.minOrderValue) {
    res.status(400);
    throw new Error(`Minimum order value of ₹${promo.minOrderValue} required`);
  }

  // Calculate discount
  let discountAmount = 0;
  if (promo.discountType === "percentage") {
    discountAmount = (orderValue * promo.discountValue) / 100;
    if (promo.maxDiscount && discountAmount > promo.maxDiscount) {
      discountAmount = promo.maxDiscount;
    }
  } else if (promo.discountType === "fixed") {
    discountAmount = promo.discountValue;
  }

  res.status(200).json({
    success: true,
    data: {
      code: promo.code,
      discountAmount: Math.round(discountAmount),
      discountType: promo.discountType,
      discountValue: promo.discountValue,
    },
  });
});

