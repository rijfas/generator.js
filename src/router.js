import { Router } from "express";
import { healthCheck } from "./controllers/app.controller.js";

const router = Router();

// common routes
router.get("/health", healthCheck);

export default router;
