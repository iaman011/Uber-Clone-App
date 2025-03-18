const userModel = require('../models/user.model');


module.exports.createUser = async ({
    // aim of this function is to create user and to createUser we need its firstname, lastname, email, password
    firstname, lastname, email, password

}) => {
    if(!firstname || !email || !password){
        throw new Error('All fields are required');
    }
    // agar aisa nhi hota hai means they fill all the require field, then we create a user
    const user = userModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user;

}