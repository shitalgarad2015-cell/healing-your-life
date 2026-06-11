const razorpay = require("../utils/razorpay");

// CREATE ORDER
const createOrder = async (req, res) => {
    try {

        const { amount } = req.body;

        const options = {
            amount: amount * 100, // INR to paise
            currency: "INR",
            receipt: "rcpt_" + Date.now()
        };

        const order = await razorpay.orders.create(options);

        res.json(order);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Payment Error"
        });
    }
};

module.exports = {
    createOrder
};