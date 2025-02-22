import { Router } from "express";
import { healthCheck } from "./controllers/app.controller.js";
import productRouter from "./apps/product/product.router.js";
import adminRouter from "./apps/admin/admin.router.js";


const router = Router();

// common routes
router.get("/health", healthCheck);

// app routes
router.use("/products", productRouter);
router.use("/admin", adminRouter);




export default router;
