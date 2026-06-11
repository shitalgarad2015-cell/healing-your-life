const express = require("express");
const router = express.Router();

const {
getCourses,
addCourse,
deleteCourse
} = require("../controllers/courseController");

// GET ALL COURSES
router.get("/", getCourses);

// ADD COURSE
router.post("/", addCourse);

// DELETE COURSE
router.delete("/:id", deleteCourse);

module.exports = router;
