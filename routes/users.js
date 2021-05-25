'use strict';

const express = require('express');

//Defining the user/course routes and importing middleware

const router = express.Router();
const { User } = require('../models');
const { authenticateUser } = require('../middleware/auth-user');

//creating asyncHandler function for all routes 

function asyncHandler(cb) {
    return async(req, res, next) => {
      try {
        await cb(req,res,next);
      } catch (error) {
        next(error);
      }
    } 
  }

//Adding in User Routes
//Route that returns the current authenticated user formatted as JSON
router.get('/', authenticateUser, asyncHandler(async(req, res) => {
    const user = req.currentUser;
    res.json({
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress,
        userId: user.userId
    });
    res.status(200);
  }));
  
//Route that creates a new user
router.post('/', asyncHandler(async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).location('/').end();
    } catch (error) {
        console.log(error.name);
        if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
            const errors = error.errors.map(err => err.message);
            res.status(400).json({ errors });
        } else {
            throw error;
        }
    }
  }));

  module.exports = router;