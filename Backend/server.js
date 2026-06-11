const express = require("express");
const cors = require("cors");
const db = require("./db");

// routes
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

// app must be created FIRST
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes setup
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payment", paymentRoutes);

// home route
app.get("/", (req, res) => {
    res.send("Healing Your Life API Running");
});

// start server
app.listen(5000, () => {
    console.log("Server Running On Port 5000");
});