import express from "express";
import {
  createGalleryItem,
  getGalleryItems,
  updateGalleryItem,
} from "../controllers/gallery.controller.js";

const router = express.Router();

router.post("/", createGalleryItem);    // Admin
router.get("/", getGalleryItems);       // Frontend
router.patch("/", updateGalleryItem);   // Admin

export default router;
