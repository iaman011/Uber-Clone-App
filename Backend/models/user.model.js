const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [ 3, 'First name must be at least 3 characters long' ],
        },
        lastname: {
            type: String,
            minlength: [ 3, 'Last name must be at least 3 characters long' ],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [ 5, 'Email must be at least 5 characters long' ],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
        // socketId plays a crucial role in real-time communication between passengers and drivers.
    },
})

// Adding a  method to generate an authentication token for a user
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
}

// Adding a method to compare a given password with the hashed password stored in the database
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
};

// Adding a static method to hash a password before storing it in the database
userSchema.statics.hashPassword = (password) => bcrypt.hash(password, 10);

// These methods in userSchema are used for user authentication and security in  Uber Clone app. 
// The generateAuthToken method creates a JWT token for secure user authentication. 
// The comparePassword method checks if the entered password matches the hashed password stored in the database. 
// The hashPassword method securely hashes passwords before saving them to prevent storing plaintext passwords. 
// These methods ensure secure login, authentication, and password protection

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;