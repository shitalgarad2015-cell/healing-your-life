const express = require("express");
const cors = require("cors");
const db = require("./db");

// routes
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

// health check route
app.get("/", (req, res) => {
    res.send("Healing Your Life API Running");
});

// IMPORTANT: Render PORT fix
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log("HEALING-YOUR-LIFE DEPLOY TEST 2026");
    console.log("Server Running On Port " + PORT);
});