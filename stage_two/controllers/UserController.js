import asyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';
import NotFoundError from '../errors/notFoundError.js';
import mongoose from 'mongoose';
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
      message: 'Person created successfully!'
    })
  })

  static getPersons = asyncHandler(async (req, res) => {
    const users = await User.find();

    const msg = users.length <= 0 ? 'Persons not found' : 'Persons successfully found';

    return res.status(200).json({
      status: 'Success',
      data: { persons: users },
      length: users.length,
      message: msg
    })
  })

  
  static getPerson = asyncHandler(async (req, res, next) => {
    // const user = await User.findOne({
    //   $or: [{ _id: req.params.id }, { name: req.params.id }],
    // });    
    let user;

    if (mongoose.isValidObjectId(req.params.id)) {
      user = await User.findOne({ _id: req.params.id });
    } else {
      user = await User.findOne({ name: req.params.id });
    }
    
    if (!user)
      return next(new NotFoundError('Person not found'));

    return res.status(200).json({
      status: 'success',
      data: { person: user },
      message: 'Person found successfully'
    })
  })

  static updatePerson = asyncHandler(async (req, res, next) => {
    let user;
  
    if (mongoose.isValidObjectId(req.params.id)) {
      user = await User.findOne({ _id: req.params.id });
    } else {
      user = await User.findOne({ name: req.params.id });
    }
  
    if (!user)
      return next(new NotFoundError('Person not found'));
  
    const { name } = req.body;
    user.name = name;
    await user.save();
  
    return res.status(200).json({
      status: 'success',
      data: { person: user },
      message: 'Person updated successfully',
    });
  });
  
  static deletePerson = asyncHandler(async (req, res, next) => {
    let user;
  
    if (mongoose.isValidObjectId(req.params.id)) {
      user = await User.findOne({ _id: req.params.id });
    } else {
      user = await User.findOne({ name: req.params.id });
    }
  
    if (!user) {
      return next(new NotFoundError('Person not found'));
    }
  
    await User.deleteOne();
  
    return res.status(200).json({
      status: 'success',
      data: { person: user },
      message: 'Person deleted successfully',
    });
  });
  
}

export default UserController;
