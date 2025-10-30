import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import experienceRoutes from "./src/routes/experienceRoutes.js";
import bookingRoutes from "./src/routes/bookingRoutes.js";
import promoRoutes from "./src/routes/promoRoutes.js";
import errorHandler from "./src/middlewares/errorHandler.js";

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: ["https://book-it-flax.vercel.app", "http://localhost:3000"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/experiences", experienceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/promo", promoRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
