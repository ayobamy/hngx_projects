import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';

import router from './routes/index.js';
import globalErrorHandler from './middlewares/globalErrorHandler.js';

dotenv.config();

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.options('*', cors());

const NODE_ENV = process.env.NODE_ENV;

// sets appropriate headers in the HTTP responses
app.use(helmet());

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', router);

// handles other requests
app.use('*', (req, res, next) => {
  next(new Error(`Can't find ${req.originalUrl} on this server!`));
})

// global error handler
app.use(globalErrorHandler);

export default app;