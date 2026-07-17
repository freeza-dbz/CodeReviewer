import express from 'express';
import { submitReview, getHistory, getReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, submitReview);
router.route('/history').get(protect, getHistory);
router.route('/:id').get(protect, getReview);

export default router;
