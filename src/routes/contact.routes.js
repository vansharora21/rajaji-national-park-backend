import express from "express";
import { verifyAdmin } from "../middleware/auth.middleware.js";
import {
  createContact,
  getContacts,
  getContactById,
  updateContactStatus,
  deleteContact,
  deleteAllContacts,
  searchContacts,
  exportContactsToCSV,
  getContactStats,
} from "../controllers/contact.controller.js";

const router = express.Router();

// ==================== PUBLIC ROUTES ====================
router.post("/", createContact);  // Submit contact form

// ==================== ADMIN ROUTES ====================
router.get("/", verifyAdmin, getContacts);                    // Get all contacts
router.delete("/", verifyAdmin, deleteAllContacts);           // Delete all contacts
router.get("/stats", verifyAdmin, getContactStats);           // Get contact statistics
router.get("/search", verifyAdmin, searchContacts);           // Search contacts
router.get("/export/csv", verifyAdmin, exportContactsToCSV);  // Export to CSV (Must be before /:id)
router.get("/:id", verifyAdmin, getContactById);              // Get single contact
router.patch("/:id/status", verifyAdmin, updateContactStatus);  // Update contact status
router.delete("/:id", verifyAdmin, deleteContact);            // Delete single contact

export default router;
