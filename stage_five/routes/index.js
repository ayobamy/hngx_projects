import express from 'express';
import multer from 'multer';
import path from 'path';
import AppController from "../controllers/AppController.js";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('video'), AppController.videoUpload);

router.get('/videos/:filename', AppController.getVideo);

router.get('/videos', AppController.getAllVideos);

export default router;
