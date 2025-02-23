import express from 'express';
import { readBooks, readBook, createBook, updateBook, deleteBook } from './book.controller.js';

const router = express.Router();

router.get('/', readBooks);
router.get('/:id', readBook);
router.post('/', createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;