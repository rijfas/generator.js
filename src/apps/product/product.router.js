// templates/router.ejs
import express from 'express';
import { readProducts, readProduct, createProduct, updateProduct, deleteProduct } from './product.controller.js';

const router = express.Router();

router.get('/', readProducts);
router.get('/:id', readProduct);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;