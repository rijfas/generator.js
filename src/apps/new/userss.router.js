import express from 'express';
import { readUsersss, readUserss, createUserss, updateUserss, deleteUserss } from './userss.controller.js';

const router = express.Router();

router.get('/', readUsersss);
router.get('/:id', readUserss);
router.post('/', createUserss);
router.put('/:id', updateUserss);
router.delete('/:id', deleteUserss);

export default router;