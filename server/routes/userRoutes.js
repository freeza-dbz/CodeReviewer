import express from 'express';
import { getProfile, updateSettings, getDashboard } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/profile').get(protect, getProfile);
router.route('/settings').put(protect, updateSettings);
router.route('/dashboard').get(protect, getDashboard);

export default router;
