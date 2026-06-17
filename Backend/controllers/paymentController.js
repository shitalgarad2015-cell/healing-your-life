const Razorpay = require("razorpay");
const db = require("../db");

// Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// =====================
// CREATE ORDER (FRONTEND CALLS THIS)
// =====================
exports.createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        const options = {
            amount: amount * 100, // convert to paise
            currency: "INR",
            receipt: "receipt_" + Date.now()
        };

        const order = await razorpay.orders.create(options);

        res.json(order);

    } catch (error) {
        console.log("Create Order Error:", error);

        res.status(500).json({
            success: false,
            message: "Order creation failed"
        });
    }
};


// =====================
// VERIFY PAYMENT + SAVE ORDER + ENROLLMENT
// =====================
exports.verifyPayment = async (req, res) => {
    try {
        const {
            user_email,
            amount,
            payment_id,
            order_id,
            cartItems
        } = req.body;

        // 1️⃣ SAVE ORDER
        await db.query(
            "INSERT INTO orders (user_email, total_amount, payment_id, order_status) VALUES ($1, $2, $3, $4)",
            [user_email, amount, payment_id, "success"]
        );

        // 2️⃣ SAVE ENROLLMENTS
        for (let item of cartItems) {
            await db.query(
                "INSERT INTO enrollments (user_email, course_id, course_title, payment_id) VALUES ($1, $2, $3, $4)",
                [user_email, item.id, item.title, payment_id]
            );
        }

        res.json({
            success: true,
            message: "Payment verified, order and enrollment created"
        });

    } catch (error) {
        console.log("Verify Payment Error:", error);

        res.status(500).json({
            success: false,
            message: "Payment verification failed"
        });
    }
};