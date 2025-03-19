const express = require('express');
const router = express.Router();
const { body } = require("express-validator"); //express-validator is a middleware for validating user input in Express.js applications.
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
// yaha par jo express validator hai wo sirf check kr rha hai aur agar uss check mein kuch bhi cheez galat hoti hai aur uske ooper aapko action perform 
// krna hai  toh wo app perform krte ho iss particular userController.registerUser controller ke andar for which you need validationResult
    userController.registerUser
)

router.post('/login', [
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
    userController.loginUser
)

router.get('/profile', authMiddleware.authUser, userController.getUserProfile);

router.get('/logout', authMiddleware.authUser, userController.logoutUser);

// router.post('/register')

module.exports = router;