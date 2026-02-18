const pool = require("../db/connection");
exports.createUser = async (req, res, next) => {
  try {
    const { name, email, department } = req.body;

    const [result] = await pool.query(
      "INSERT INTO users (name, email, department) VALUES (?, ?, ?)",
      [name, email, department]
    );

    res.status(201).json({
      message: "Employee registered successfully",
      id: result.insertId
    });

  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Email already exists"
      });
    }
    next(error);
  }
};
