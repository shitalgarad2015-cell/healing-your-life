const express = require("express");
const router = express.Router();

const {
    login,
    register
} = require("../controllers/authController");

router.post("/login", login);
router.post("/register", register);

router.get("/test", (req, res) => {
    res.send("Auth Route Working");
});

module.exports = router;