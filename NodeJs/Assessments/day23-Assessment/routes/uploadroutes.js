import express from "express";
import upload from "../middleware/fileupload.js";

const router = express.Router();

router.post("/", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  res.json({
    message: `File uploaded successfully: ${req.file.filename}`
  });
});

export default router;
