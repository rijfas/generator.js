import { Router } from "express";
import productRouter from "./apps/product/product.router.js";
import { healthCheck } from "./controllers/app.controller.js";

const router = Router();

// common routes
router.get("/health", healthCheck);

// app routes
router.use("/products", productRouter);

export default router;
