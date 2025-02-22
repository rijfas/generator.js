import { Router } from "express";
import { healthCheck } from "./controllers/app.controller.js";
import productRouter from "./apps/product/product.router.js";


const router = Router();


router.use("/products", productRouter);




export default router;
