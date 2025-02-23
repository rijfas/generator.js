import express from 'express';
import { readThengas, readThenga, createThenga, updateThenga, deleteThenga } from './thenga.controller.js';

const router = express.Router();

router.get('/', readThengas);
router.get('/:id', readThenga);
router.post('/', createThenga);
router.put('/:id', updateThenga);
router.delete('/:id', deleteThenga);

export default router;