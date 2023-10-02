import express from 'express';
import multer from 'multer';
import AppController from "../controllers/AppController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('video'), AppController.handleVideoUpload);

router.get('/videos/:videoId', AppController.getVideo);

router.get('/videos', AppController.getAllVideos);

export default router;
