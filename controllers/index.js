// Import the necessary modules and middleware
const router = require('express').Router();

// Import the API routes module
const apiRoutes = require('./api');

// Import the home routes module
const homeRoutes = require('./homeRoutes');

// Use the home routes for the root path ("/")
router.use('/', homeRoutes);


// Use the API routes for paths starting with "/api"
router.use('/api', apiRoutes);

// Export the router to be used in other parts of the application
module.exports = router;
