// // Import the 'express' library to create a router
// const express = require('express');
// // Import the 'bcrypt' library for password hashing
// const bcrypt = require('bcryptjs');
// // Create an instance of an Express router
// const router = express.Router();
// // Import the 'jsonwebtoken' library for creating JSON Web Tokens (JWT)
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';
const fetchUser = (req, res, next) => {
    // get the user from the jwt token and add id to the request object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "please authenticate using a valid details" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        // Handle errors, log an error message, and respond with a 500 status code
        console.error('An error occurred:', error);
        res.status(401).send({ error: "please authenticate using a valid details" });
    }
}

module.exports = fetchUser;