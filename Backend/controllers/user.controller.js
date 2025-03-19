// here we write code for route handler
const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator'); //to perform actions on error


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

    res.status(200).json({ token, user });
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}