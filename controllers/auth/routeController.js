const express = require('express');
const router = express.Router();
const dataController = require('./dataController');
const viewController = require('./viewController');
const productViewController = require('../product/productViews')


// Signup User (POST) => Redirect to login page after successful signup
router.post('/', dataController.createUser, viewController.redirectToLogin);  // Ensuring this routes the signup properly

// Show signup form (GET) => Display signup page
router.get('/', viewController.signUp);  // Correct route for the sign-up page

// Login User (POST) => Authenticate and redirect to the products page after login
router.post('/login', dataController.loginUser, productViewController.redirectHome);

// Show login form (GET)
router.get('/login', viewController.signIn);

// Update User (PUT) => Requires user to be logged in
router.put('/:id', dataController.auth, dataController.updateUser);

// Delete User (DELETE) => Requires user to be logged in
router.delete('/:id', dataController.auth, dataController.deleteUser);

module.exports = router;
