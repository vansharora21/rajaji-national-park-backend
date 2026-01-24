import express from "express";
import { adminLogin, adminRegister } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/register", adminRegister); // TEMP
router.post("/login", adminLogin);

export default router;
