import express from 'express';
import { submitReview, getHistory, getReview, submitFolderReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadId = req.uploadId || Date.now().toString();
    req.uploadId = uploadId;
    
    // Check if the originalname has directory structure
    const filePath = file.originalname;
    const dir = path.join('uploads', uploadId, path.dirname(filePath));
    
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, path.basename(file.originalname));
  }
});

const upload = multer({ storage: storage });

const router = express.Router();

router.route('/').post(protect, submitReview);
router.route('/folder').post(protect, upload.array('files'), submitFolderReview);
router.route('/history').get(protect, getHistory);
router.route('/:id').get(protect, getReview);

export default router;
