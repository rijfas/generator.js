import { Router } from "express";
import { healthCheck } from "./controllers/app.controller.js";


const router = Router();

router.get("/", healthCheck);

export default router;
