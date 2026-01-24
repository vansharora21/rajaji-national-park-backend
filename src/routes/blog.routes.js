import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
} from "../controllers/blog.controller.js";

const router = express.Router();

router.post("/", createBlog);        // Admin
router.get("/", getAllBlogs);         // Frontend
router.get("/:id", getBlogById);      // Blog detail page

export default router;
