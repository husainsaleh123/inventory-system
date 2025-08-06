const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'secret'

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'] 
    },  // Ensure the email is valid and unique
    password: { type: String, required: true },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Supplier' }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
});

// Hide password from JSON responses
userSchema.methods.toJSON = function() {
    const user = this.toObject();
    delete user.password;  // Remove the password before sending the response
    return user;
};

// Hash password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);  // Hash the password
    }
    next();
});

// Compare password to hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);  // Compare entered password to hashed password
};

// Generate JWT token
userSchema.methods.generateAuthToken = async function() {
    const token = jwt.sign({ _id: this._id }, JWT_SECRET);
    return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;