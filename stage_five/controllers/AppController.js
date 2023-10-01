import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import fs from 'fs/promises';
import asyncHandler from 'express-async-handler';
import NotFoundError from '../errors/notFoundError.js';
import ServerError from '../errors/serverError.js';

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadDir = 'uploads';
fs.mkdir(uploadDir, { recursive: true }).catch(err => {
  console.error('Error creating uploads directory:', err);
});

class AppController {
  static handleVideoUpload = asyncHandler(async (req, res, next) => {
    const { file } = req;

    if (!file)
      return next(new NotFoundError('No video file uploaded.'));

    try {
      const uploadParams = {
        Bucket: 'cyclic-muddy-sheath-dress-fawn-ap-northeast-2',
        Key: `uploads/${file.originalname}`,
        Body: Readable.from(file.buffer),
      };

      await s3Client.send(new PutObjectCommand(uploadParams));

      return res.status(200).json({
        status: 'success',
        message: 'Video uploaded successfully!'
      });
    } catch (error) {
      return next(new ServerError('Failed to upload video.'));
    }
  });

  static getVideo = asyncHandler(async (req, res, next) => {
    const { filename } = req.params;
    const key = `uploads/${filename}`;

    try {
      const getObjectParams = {
        Bucket: 'cyclic-muddy-sheath-dress-fawn-ap-northeast-2',
        Key: key,
      };

      const response = await s3Client.send(new GetObjectCommand(getObjectParams));

      res.setHeader('Content-Type', response.ContentType);
      response.Body.pipe(res);
    } catch (error) {
      return next(new NotFoundError('Video not found.'));
    }
  });

  static getAllVideos = asyncHandler(async (req, res, next) => {
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
  });
}

export default AppController;
