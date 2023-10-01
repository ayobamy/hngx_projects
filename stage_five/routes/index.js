import express from 'express';
// import multer from 'multer';
import AppController from "../controllers/AppController.js";

const router = express.Router();

router.post('/upload', AppController.handleVideoUpload);

router.get('/videos/:filename', AppController.getVideo);

router.get('/videos', AppController.getAllVideos);

export default router;
