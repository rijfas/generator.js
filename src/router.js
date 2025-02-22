import { Router } from "express";
import { healthCheck } from "./controllers/app.controller.js";
import productRouter from "./apps/product/product.router.js";
import adminRouter from "./apps/admin/admin.router.js";
import sampleRouter from "./apps/sample/sample.router.js";


const router = Router();

router.use("/samples", sampleRouter);


// common routes
router.get("/health", healthCheck);

// app routes
router.use("/products", productRouter);
router.use("/admin", adminRouter);




export default router;
