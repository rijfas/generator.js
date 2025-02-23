import express from 'express';
import { readCats, readCat, createCat, updateCat, deleteCat } from './cat.controller.js';

const router = express.Router();

router.get('/', readCats);
router.get('/:id', readCat);
router.post('/', createCat);
router.put('/:id', updateCat);
router.delete('/:id', deleteCat);

export default router;