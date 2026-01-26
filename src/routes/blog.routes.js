import express from "express";
import upload from "../middleware/multer.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  getBlogsByCategory,
  searchBlogs,
  updateBlog,
  deleteBlog,
  publishBlog,
  unpublishBlog,
} from "../controllers/blog.controller.js";

const router = express.Router();

// ==================== PUBLIC ROUTES ====================
router.get("/", getAllBlogs);                    // Get all published blogs
router.get("/search", searchBlogs);              // Search blogs
router.get("/category/:category", getBlogsByCategory);  // Get blogs by category
router.get("/:id", getBlogById);                 // Get single blog

// ==================== ADMIN ROUTES ====================
router.post("/", verifyAdmin, upload.single("image"), createBlog);
router.patch("/:id", verifyAdmin, upload.single("image"), updateBlog);
router.delete("/:id", verifyAdmin, deleteBlog);
router.patch("/:id/publish", verifyAdmin, publishBlog);
router.patch("/:id/unpublish", verifyAdmin, unpublishBlog);

export default router;
