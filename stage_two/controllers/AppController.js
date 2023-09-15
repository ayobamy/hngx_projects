import asyncHandler from 'express-async-handler';
// import ClientError from '../errors/clientError.js';


class AppController {
  static getHome = asyncHandler(async (req, res, next) => {
    return res.status(200).json({
      status: 'Success',
      message: 'Welcome'
    })
  })
}

export default AppController;
