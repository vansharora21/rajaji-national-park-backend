// src/middleware/multer.js
import multer from "multer";
import path from "path";

// -------------------------
// Storage configuration
// -------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/images"); // folder where images will be saved
  },
  filename: (req, file, cb) => {
    // unique filename: timestamp + original name
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// -------------------------
// File filter for images only
// -------------------------
const imageFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true); // accept file
  } else {
    cb(new Error("Only JPG, JPEG, PNG images are allowed"), false);
  }
};

// -------------------------
// Multer upload instance
// -------------------------
const upload = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
});

// -------------------------
// Default export
// -------------------------
export default upload;
