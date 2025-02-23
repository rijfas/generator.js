import express from 'express';
import { readAlexs, readAlex, createAlex, updateAlex, deleteAlex } from './Alex.controller.js';

const router = express.Router();

router.get('/', readAlexs);
router.get('/:id', readAlex);
router.post('/', createAlex);
router.put('/:id', updateAlex);
router.delete('/:id', deleteAlex);

export default router;