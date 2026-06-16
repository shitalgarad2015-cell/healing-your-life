const express = require("express");
const router = express.Router();
const db = require("../db");

// ADD TO CART
router.post("/add", async (req, res) => {
    const { user_email, course_id, course_title, price } = req.body;

    try {
        await db.query(
            "INSERT INTO cart (user_email, course_id, course_title, price) VALUES ($1, $2, $3, $4)",
            [user_email, course_id, course_title, price]
        );

        res.json({
            success: true,
            message: "Added to cart"
        });

    } catch (err) {
        console.log(err);
        res.json({
            success: false,
            message: "Error adding to cart"
        });
    }
});

// GET CART
router.get("/:email", async (req, res) => {
    const email = req.params.email;

    try {
        const result = await db.query(
            "SELECT * FROM cart WHERE user_email = $1",
            [email]
        );

        res.json(result.rows);

    } catch (err) {
        console.log(err);
        res.json([]);
    }
});

module.exports = router;