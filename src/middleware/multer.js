import multer from "multer";
import fs from "fs";
import path from "path";

// Create uploads directory if it doesn't exist
const createUploadDirs = () => {
  const dirs = ["uploads/images", "uploads/pdfs", "uploads/excel"];
  dirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

createUploadDirs();

// Configure multer for local storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadDir = "uploads/images/";
    
    if (file.fieldname === "pdf") {
      uploadDir = "uploads/pdfs/";
    } else if (file.fieldname === "file") {
      uploadDir = "uploads/excel/";
    }

    // Ensure directory exists before saving
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// File validation filter
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (file.fieldname === "pdf") {
    if (ext === ".pdf") return cb(null, true);
    return cb(new Error("Only PDF files are allowed!"));
  }

  if (file.fieldname === "file") {
    if ([".xlsx", ".xls", ".csv"].includes(ext)) return cb(null, true);
    return cb(new Error("Only Excel or CSV files are allowed!"));
  }

  // Default to images
  if (/^\.(jpg|jpeg|png|gif|webp)$/.test(ext)) return cb(null, true);

  cb(new Error("Only image files are allowed!"));
};

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  fileFilter,
});

export default upload;
