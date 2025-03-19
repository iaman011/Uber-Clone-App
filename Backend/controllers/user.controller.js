// here we write code for route handler
const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator'); //to perform actions on error
const blackListTokenModel = require('../models/blacklistToken.model');


module.exports.registerUser = async (req, res, next) => {

    const errors = validationResult(req);
    // agar aapka validation mein kuch bhi galat hoga toh wo aapko req ke andar milega
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { fullname, email, password} = req.body;
    // ham kabhi bhi database mein password ko plain text mein store nahi krate , we need to hash it
    const hashedPassword = await userModel.hashPassword(password);  //we create hashPassword method in usermodel.js

    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword
    });

    // now we have generate a token from the the user that is created by createuser, also define its method in userModel.js
    const token = user.generateAuthToken();

    res.status(201).json({ token, user });
}

module.exports.loginUser = async (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    const { email, password } = req.body;  //email aur password ko req.body se nikal lenge

    const user = await userModel.findOne({ email }).select('+password');

    if (!user){
        return res.status(401).json({ message: 'Invalid email or password'});
    }

    const isMatch = await user.comparePassword(password);
    // we create comparePassword method in userModel.js

    if (!isMatch){
        return res.status(401).json({ message: 'Invalid email or password'});
    }

    // if (isMatch) ; password matches then generate token
    const token = user.generateAuthToken(); 

    res.cookie('token', token);

    res.status(200).json({ token, user });
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {

    // Implementing JWT Logout with Token Blacklisting  
// -----------------------------------------------  
// Logging out with JWT is a bit tricky since JWTs are stateless.  
// To handle this, we create a **blacklist collection** in the database. e.g., '../models/blacklistToken.model'  
// Whenever a user logs out, their token is added to this blacklist.  
// On each request, we check if the token exists in the blacklist.  

//  **Process Flow:**  
// 1️ **User logs in** → Receives a token.  
// 2️ **User logs out** → The token is added to the blacklist collection.  
// 3️ **For every request** → Check if the token is blacklisted.  
// 4️ **If blacklisted** → Reject the request (401 Unauthorized).  
// 5️ **If not blacklisted** → Proceed with request handling.  

//  **Using TTL (Time-To-Live) for Automatic Cleanup:**  
// - **TTL (Time-To-Live)** ensures that blacklisted tokens are automatically deleted after a certain period.  
// - We set a **TTL index** on the blacklist collection so expired tokens are removed without manual intervention.  


res.clearCookie('token'); // Clear the token from cookies  

const token = req.cookies.token || req.headers.authorization.split(' ')[1]; // Extract token from cookies or Authorization header  

await blackListTokenModel.create({ token }); // Add the token to the blacklist collection  

res.status(200).json({ message: 'Logged out' }); // Send a success response  


}