import express from "express";
import upload from "../middleware/multer.js";
import { verifyAdmin } from "../middleware/auth.middleware.js";
import {
  createGalleryItem,
  getGalleryItems,
  updateGalleryItem,
  deleteGalleryItem,
  getGalleryById,
  getGalleryByCategory,
  searchGallery,
} from "../controllers/gallery.controller.js";

const router = express.Router();

// ==================== PUBLIC ROUTES ====================

// Order MATTERS 👇
router.get("/", getGalleryItems);
router.get("/search", searchGallery);
router.get("/category/:category", getGalleryByCategory);

// ==================== ADMIN ROUTES ====================

router.post("/", verifyAdmin, upload.single("image"), createGalleryItem);
router.patch("/:id", verifyAdmin, upload.single("image"), updateGalleryItem);
router.delete("/:id", verifyAdmin, deleteGalleryItem);

// ==================== SINGLE ITEM (KEEP LAST) ====================
router.get("/:id", getGalleryById);

export default router;
