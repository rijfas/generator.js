import express from 'express';
import { readUsers, readUser, createUser, updateUser, deleteUser } from './user.controller.js';

const router = express.Router();

router.get('/', readUsers);
router.get('/:id', readUser);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;