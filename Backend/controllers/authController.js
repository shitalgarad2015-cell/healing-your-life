const db = require("../db");

// REGISTER
exports.register = (req, res) => {

    const { name, email, password } = req.body;

    const sql =
        "INSERT INTO users (name,email,password) VALUES (?,?,?)";

    db.query(sql, [name, email, password], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            success: true,
            message: "Registration Successful"
        });

    });
};


// LOGIN
exports.login = (req, res) => {

    const { email, password } = req.body;

    const sql =
        "SELECT * FROM users WHERE email=? AND password=?";

    db.query(sql, [email, password], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length > 0) {
            res.json({
                success: true,
                message: "Login Successful"
            });
        } else {
            res.json({
                success: false,
                message: "Invalid Email or Password"
            });
        }
    });
};

exports.login = (req, res) => {

    console.log("Request Body:", req.body);

    const { email, password } = req.body;

    const sql =
        "SELECT * FROM users WHERE email=? AND password=?";

    db.query(sql, [email, password], (err, result) => {

        if (err) {
            console.log("SQL Error:", err);
            return res.status(500).json(err);
        }

        console.log("Query Result:", result);

        if (result.length > 0) {
            res.json({
                success: true,
                message: "Login Successful"
            });
        } else {
            res.json({
                success: false,
                message: "Invalid Email or Password"
            });
        }
    });
};