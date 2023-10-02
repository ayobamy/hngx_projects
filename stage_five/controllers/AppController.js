import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';
import rand from 'random-key';
import { S3Client, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import fs from 'fs/promises';

dotenv.config();

const bucketName = process.env.BUCKET_NAME;

const uploadDir = 'uploads';
fs.mkdir(uploadDir, { recursive: true }).catch(err => {
  console.error('Error creating uploads directory:', err);
});

const s3 = new S3Client({ region: 'ap-northeast-2' });

class AppController {
  static handleVideoUpload = asyncHandler(async (req, res, next) => {
    const videoId = rand.generateDigits(20);
    const params = {
      Bucket: bucketName,
      Key: `${videoId}.mp4`,
      Body: req.file.buffer,
    };

    try {
      const command = new PutObjectCommand(params);
      await s3.send(command);

      return res.status(201).json({
        status: 'success',
        message: 'Video uploaded successfully',
        videoId: videoId,
        videoUrl: `https://cyclic-muddy-sheath-dress-fawn-ap-northeast-2.s3.amazonaws.com/${videoId}.mp4`
      });
    } catch (error) {
      console.error("Error uploading video: ", error);
      return res.status(500).json({
        status: 'error',
        message: 'Error uploading video'
      });
    }
  });

  static getVideo = asyncHandler(async (req, res, next) => {
    const videoId = req.params.videoId;
    const videoUrl = `https://cyclic-muddy-sheath-dress-fawn-ap-northeast-2.s3.amazonaws.com/${videoId}.mp4`;

    return res.status(200).json({
      status: 'success',
      videoUrl: videoUrl
    });
  });

  static getAllVideos = asyncHandler(async (req, res, next) => {
    try {
      const params = {
        Bucket: bucketName,
      };

      const command = new ListObjectsV2Command(params);
      const response = await s3.send(command);
      
      const videoFiles = response.Contents.map(item => item.Key);

      if (videoFiles.length === 0) {
        return res.status(200).json({
          status: 'success',
          message: 'No videos found.',
          videos: []
        });
      }

      return res.status(200).json({
        status: 'success',
        videos: videoFiles
      });
    } catch (error) {
      console.error("Error retrieving videos: ", error);
      return res.status(500).json({
        status: 'error',
        message: 'Failed to retrieve videos.'
      });
    }
  });
}

export default AppController;
