const db = require("../db");

// REGISTER
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const result = await db.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
            [name, email, password]
        );

        res.json({
            success: true,
            message: "Registration Successful"
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Registration failed"
        });
    }
};


// LOGIN
exports.login = async (req, res) => {

    console.log("Request Body:", req.body);

    const { email, password } = req.body;

    try {
        const result = await db.query(
            "SELECT * FROM users WHERE email = $1 AND password = $2",
            [email, password]
        );

        console.log("Query Result:", result.rows);

        if (result.rows.length > 0) {

            const user = result.rows[0];

            res.json({
                success: true,
                message: "Login Successful",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });

        } else {
            res.json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

    } catch (err) {
        console.log("SQL Error:", err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};