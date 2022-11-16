const router = require('express').Router();         // Import the Express.js router
const userRoutes = require('./user-routes');        // Import the user routes

router.use('/users', userRoutes);                   // Add the user routes to the router

module.exports = router;                            // Export the router    
