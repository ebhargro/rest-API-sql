'use strict';

const auth = require('basic-auth');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

//Middleware using basic authentication to verify the request and return a 401 status code when authentication fails
exports.authenticateUser = async (req, res, next) => {
    //Creating a variable for the authentification result to display
    let message;
    const userCredentials = auth(req);
    console.log(userCredentials);
    //Checks if the user's credentials are available
    if (userCredentials) {
        const user = await User.findOne({
            where: {
                emailAddress: userCredentials.name
            }
    });
    if (user) {
        const authenticated = bcrypt.compareSync(userCredentials.pass, user.password);

        if (authenticated) {
            console.log(`Authentication successful for: ${user.firstName} ${user.lastName}`)
            req.currentUser = user;

        } else {
            message = `Authentication failed for: ${user.firstName} ${user.lastName}`;
        }
        } else {
            message = `User ${user.firstName} ${user.lastName} not found.`;
        }
        } else {
            message = 'Authorization header not found.';
        }

        if (message) {
            console.log(message);
            res.status(401).json({message: 'Access Denied'})
        } else {
            next();
        }
    };