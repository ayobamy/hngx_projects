import asyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';
// import ClientError from '../errors/clientError.js';


class UserController {
  static createPerson = asyncHandler(async (req, res, next) => {
    const { name } = req.body;

    const user = new User({
      name: name,
    })

    user.save();

    return res.status(201).json({
      status: 'Success',
      data: { person: user },
      message: 'User created successfully!'
    })
  })

  static getPerson = asyncHandler(async (req, res, next) => {

  })
}

export default UserController;
