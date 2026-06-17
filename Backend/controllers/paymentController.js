const db = require("../db");

// =====================
// CREATE ORDER (TEMPORARY)
// =====================
exports.createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        res.json({
            success: true,
            order_id: "TEST_ORDER_" + Date.now(),
            amount: amount
        });

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
            cartItems
        } = req.body;

        await db.query(
            "INSERT INTO orders (user_email, total_amount, payment_id, order_status) VALUES ($1, $2, $3, $4)",
            [user_email, amount, payment_id || "TEST_PAYMENT", "success"]
        );

        for (let item of cartItems) {
            await db.query(
                "INSERT INTO enrollments (user_email, course_id, course_title, payment_id) VALUES ($1, $2, $3, $4)",
                [user_email, item.id, item.title, payment_id || "TEST_PAYMENT"]
            );
        }

        res.json({
            success: true,
            message: "Order and enrollment created"
        });

    } catch (error) {
        console.log("Verify Payment Error:", error);

        res.status(500).json({
            success: false,
            message: "Payment verification failed"
        });
    }
};