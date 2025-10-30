import {body,validationResult} from "express-validator"

const validateBooking = [
  body("experienceId").notEmpty().withMessage("Experience ID is required"),
  body("userName").trim().notEmpty().withMessage("Name is required"),
  body("userEmail").isEmail().withMessage("Valid email is required"),
  body("selectedDate").notEmpty().withMessage("Date is required"),
  body("selectedTime").notEmpty().withMessage("Time slot is required"),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

export { validateBooking, validate };

