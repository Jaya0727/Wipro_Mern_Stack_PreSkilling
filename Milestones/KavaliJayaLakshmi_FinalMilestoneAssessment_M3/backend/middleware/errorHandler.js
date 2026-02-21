module.exports = (err, req, res, next) => {
  console.error(err);

  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Duplicate entry detected",
      data: null
    });
  }
  res.status(500).json({
    success: false,
    message: "Internal Server Error",
    data: null
  });
};