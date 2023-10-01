import asyncHandler from 'express-async-handler';
import fs from 'fs/promises';
import path from 'path';
import NotFoundError from '../errors/notFoundError.js';
import ServerError from '../errors/serverError.js';

class AppController {
  static videoUpload = asyncHandler(async (req, res, next) => {
    const { file } = req;
    if (!file)
      return next(new NotFoundError('No video file uploaded.'));

    const directory = 'uploads';
    const filePath = path.join(directory, file.originalname);

    try {
      await fs.mkdir(directory, { recursive: true });

      await fs.writeFile(filePath, file.buffer);
      await fs.access(filePath);

      return res.status(200).json({
        status: 'success',
        message: 'Video uploaded successfully!' 
      });
    } catch (error) {
      return next(new ServerError('Failed to save the uploaded video.'));
    }
  });

  static getVideo = asyncHandler(async (req, res, next) => {
    const { filename } = req.params;
    const filePath = `uploads/${filename}`;

    try {
      await fs.access(filePath);
      const stream = fs.createReadStream(filePath);
      stream.pipe(res);
    } catch (error) {
      return res.status(404).json({
        status: 'success',
        message: 'Video not found.'
      });
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
