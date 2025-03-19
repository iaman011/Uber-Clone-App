const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports.authUser = async (req, res, next) => {
    // this middleware aims to getprofile of user which is logged in if user user is logout return unauthorized access
    // here we need token, token mainly hame 2 jagah se milta hai; headers nd cookies ke andar 
    
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];  //need to split in header to get token
  

    if(!token ){  //check for token existence
        return res.status(401).json({message: "Unauthorized"});
    }

    const isBlacklisted = await userModel.findOne({token: token});
    if(isBlacklisted){
        return res.status(401).json({ message: 'Unauthorized'});
    }

//     User logs in → Receives a token
// User logs out → Token is added to blacklist
// For each request → Check if the token is blacklisted
// If blacklisted → Reject the request (401 Unauthorized)
// If not blacklisted → Proceed with request handling

    // if(token)
      // now after getting token we need to decrypt/decode the token
    //token ko decode karte waqt isme wahi data ayega jo isko create krte waqt dala hoga in userModel.js
    // data we put: const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });  
    try{

         // Verify the JWT token
         const decoded = jwt.verify(token, process.env.JWT_SECRET);

         // Fetch the user from the database
         const user = await userModel.findById(decoded._id);

        req.user = user;

        return next();

    }catch(err){
        return res.status(401).json({message: "unauthorized"});
    }
}