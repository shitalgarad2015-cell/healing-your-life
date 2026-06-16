const db = require("../db");

const getCourses = async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM courses");

    res.json(result.rows);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

const addCourse = async (req, res) => {
  const { title, description, price } = req.body;

  try {
    await db.query(
      "INSERT INTO courses(title, description, price) VALUES ($1, $2, $3)",
      [title, description, price]
    );

    res.json({
      success: true,
      message: "Course Added Successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const deleteCourse = async (req, res) => {
  const id = req.params.id;

  try {
    await db.query(
      "DELETE FROM courses WHERE id = $1",
      [id]
    );

    res.json({
      success: true,
      message: "Course Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getCourses,
  addCourse,
  deleteCourse,
};