const router = require('express').Router();                         // Import the Express.js router
const { User, Post, Comment } = require('../models');               // Import the User, Post, and Comment models

// Post user routes
router.post('/', async (req, res) => {                              // POST /api/users
    try {
        const usenameData = await User.create(req.body);            // Create a new user using the data in the request body
        req.session.save(() => {                                    // Save the session
            req.session.user_id = userData.id;                      // Set the session user_id to the new user's id
            req.session.username = userData.username;               // Set the session username to the new user's username
            req.session.loggedIn = true;                            // Set the session loggedIn to true
            res.status(200).json(userData);                         // Send the new user's data as JSON
        });

    } catch (err) {
        res.status(400).json(err);                                  // Send the error as JSON
    }
});

router.post('/login', async (req, res) => {                                                             // POST /api/users/login
    try {
        const usernameData = await User.findOne({where : {username: req.body.username}});               // Find a user with the username in the request body
        if (!userData) {
            res.status(400).json({message: 'Incorrect username or password, please try again'});        // If no user is found, send an error message
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);                          // Check the password in the request body against the user's hashed password
        if (!validPassword) {
            res.status(400).json({message: 'Incorrect username or password, please try again'});        // If the password is incorrect, send an error message
            return;
        }
        req.session.save(() => {                                                                        // Save the session
            req.session.user_id = usernameData.id;                                                      // Set the session user_id to the user's id
            req.session.username = usernameData.username;                                               // Set the session username to the user's username  
            req.session.loggedIn = true;                                                                // Set the session loggedIn to true
            res.json({user: usernameData, message: 'You are now logged in!'});                          // Send the user's data and a success message as JSON
        }
        );
    } catch (err) {
        res.status(400).json(err);                                                                      // Send the error as JSON
    }
});

router.post('/logout', (req, res) => {          // POST /api/users/logout
    if (req.session.loggedIn) {                 // If the user is logged in
        req.session.destroy(() => {             // Destroy the session
            res.status(204).end();              // Send a 204 status code
        });
    } else {
        res.status(404).end();                  // If the user is not logged in, send a 404 status code
    }
}
);

module.exports = router;                        // Export the router