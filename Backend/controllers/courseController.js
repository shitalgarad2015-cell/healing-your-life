const db = require("../db");

const getCourses = (req, res) => {
const sql = "SELECT * FROM courses";

db.query(sql, (err, result) => {
    if (err) {
        console.log(err);
        return res.status(500).json({
            message: err.message
        });
    }

    res.json(result);
});

};

const addCourse = (req, res) => {
const { title, description, price } = req.body;

const sql =
    "INSERT INTO courses(title, description, price) VALUES (?, ?, ?)";

db.query(
    sql,
    [title, description, price],
    (err, result) => {
        if (err) {
            console.log(err);

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Course Added Successfully"
        });
    }
);

};

const deleteCourse = (req, res) => {
const id = req.params.id;

db.query(
    "DELETE FROM courses WHERE id = ?",
    [id],
    (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.json({
            success: true,
            message: "Course Deleted Successfully"
        });
    }
);

};

module.exports = {
getCourses,
addCourse,
deleteCourse
};
