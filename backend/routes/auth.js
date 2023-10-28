// Import the 'express' library to create a router
const express = require('express');
// Import the 'bcrypt' library for password hashing
const bcrypt = require('bcryptjs');
// Create an instance of an Express router
const router = express.Router();
// Import the 'jsonwebtoken' library for creating JSON Web Tokens (JWT)
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

// Import 'body' and 'validationResult' from 'express-validator' for request body validation
const { body, validationResult } = require('express-validator');

// Import the 'User' model from '../model/User' to interact with the user data
const User = require('../model/User');

// Define a secret key for signing and verifying JWTs
const JWT_SECRET = 'your-secret-key';

// ROUTE :1---> Define a route for creating a user using the POST method at '/createuser'
router.post('/createuser', [
    // Validate the 'name' field, ensuring it has a minimum length of 3 characters
    body('name', 'Enter a valid name').isLength({ min: 3 }),

    // Validate the 'email' field, ensuring it is a valid email format
    body('email', 'Enter a valid email').isEmail(),

    // Validate the 'password' field, ensuring it has a minimum length of 5 characters
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    try {
        // Check if there are validation errors in the request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            // Return a 400 status code with validation errors if they exist
            return res.status(400).json({ errors: errors.array() });
        }

        // Check if a user with the same email already exists in the database
        const existingUser = await User.findOne({ email: req.body.email });

        if (existingUser) {
            // Log a message and return a 409 status code if a user with the same email exists
            console.log('User with the same email already exists:', existingUser.email);
            return res.status(409).json({error:`User with the same email already exists`});
        }

        // Generate a salt and hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // If no existing user is found, create a new user in the database
        const user = await User.create({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
        });

        // Log a success message and respond with the created user
        console.log('User created successfully');

        // Generate a JSON Web Token (JWT) for the user
        const tokenPayload = {
            user: {
                id: user.id,
            },
        };

        // Sign the JWT with your secret key
        const authToken = jwt.sign(tokenPayload, JWT_SECRET);

        // Return the user details and the JWT as a response
        res.json({ user, authToken });
    } catch (error) {
        // Handle errors, log an error message, and respond with a 500 status code
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//  ROUTE :2---> Define a route for user login using the POST method at '/login'
router.post('/login', [
    // Validate the 'email' field, ensuring it is a valid email format
    body('email', 'Enter a valid email').isEmail(),

    // Validate the 'password' field, ensuring it exists (is not blank)
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    
    // Check if there are validation errors in the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Return a 400 status code with validation errors if they exist
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if a user with the provided email exists in the database
        const user = await User.findOne({ email });

        if (!user) {
            
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Compare the provided password with the stored hashed password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
           
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // If the email and password are valid, generate a new JWT
        const tokenPayload = {
            user: {
                id: user.id,
            },
        };

        const authToken = jwt.sign(tokenPayload, JWT_SECRET);
       
        // Return the user details and the JWT as a response
        res.json({ user, authToken });
    } catch (error) {

        // Handle errors, log an error message, and respond with a 500 status code
        console.error('An error occurred:', error);
        res.status(500).json({error: 'Internal server error' });
    }
});

//  ROUTE :3---> get logged in user details  using POST request for url "/api/auth/getuser " login required , for this we have to send jwt token


router.post('/getUser', fetchUser, async (req, res) => {
    // const { email, password } = req.body; // Extract email and password from the request body


    try {
        userId = req.user.id;
        // Check if a user with the provided email exists in the database
        const user = await User.findById(userId).select("-password");
        res.send(user);

        // Log the email and user details

        if (user) {
            // User found in the database, perform further authentication
            // (add your authentication logic here)
        } else {
            // User not found in the database
            console.log('User not found');
            res.status(404).json({ error: 'User not found' });
        }

    } catch (error) {
        // Handle errors, log an error message, and respond with a 500 status code
        console.error('An error occurred:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Export the router to use it in other parts of the application
module.exports = router;

