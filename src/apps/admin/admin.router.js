// templates/router.ejs
import express from 'express';
import { createApp } from './admin.controller.js';

const router = express.Router();

router.post('/app', createApp);


export default router;