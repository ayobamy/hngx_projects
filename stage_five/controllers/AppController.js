import asyncHandler from 'express-async-handler';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import NotFoundError from '../errors/notFoundError.js';
import ServerError from '../errors/serverError.js';

const uploadDir = 'uploads';
fs.mkdir(uploadDir, { recursive: true }).catch(err => {
  console.error('Error creating uploads directory:', err);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
      cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

class AppController {
  static videoUpload = upload.single('video');

  static handleVideoUpload = asyncHandler(async (req, res, next) => {
    const { file } = req;
    if (!file)
      return next(new NotFoundError('No video file uploaded.'));

    return res.status(200).json({
      status: 'success',
      message: 'Video uploaded successfully!'
    });
  });

  static getVideo = asyncHandler(async (req, res, next) => {
    const { filename } = req.params;
    const filePath = path.join('uploads', filename);

    try {
      await fs.access(filePath);
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    } catch (error) {
      return res.status(404).json({
        status: 'fail',
        message: 'Video not found.'
      });
    }
  });

  static getAllVideos = asyncHandler(async (req, res, next) => {
    try {
      const videoFiles = await fs.readdir('uploads/');
      if (videoFiles.length === 0) {
        return res.status(200).json({
          status: 'success',
          message: 'No videos found.'
        });
      }

      res.status(200).json({
        status: 'success',
        videos: videoFiles
      });
    } catch (error) {
      return next(new ServerError('Failed to retrieve videos.'));
    }
  });
}

export default AppController;
