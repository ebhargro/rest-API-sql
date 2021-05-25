//Treehouse Techdegree Project 9 by Ebony Hargro
//Aiming for: Meets Expectations

'use strict';

const express = require('express');
// load modules
const morgan = require('morgan');
const { sequelize } = require('./models/index');
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

//Adding the ability to parse JSON data
app.use(express.json());

// setup morgan which gives us http request logging
app.use(morgan('dev'));

//Adding in User and Course routes
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// database connection 
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database was successful!');
  } catch (error) {
    console.log('Oh no! Connection to the database was unsuccessful.');
  }
})();


// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
