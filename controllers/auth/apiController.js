const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// API Authentication middleware - uses headers instead of query params
exports.auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');  // Expect the token in the 'Authorization' header
        const data = jwt.verify(token, process.env.JWT_SECRET || 'your_default_secret');
        const user = await User.findOne({ _id: data._id });

        if (!user) {
            throw new Error();
        }

        req.user = user;  // Attach the user to the request object for access in subsequent routes
        next();
    } catch (error) {
        res.status(401).send('Not authorized');
    }
};

// API User creation
exports.createUser = async (req, res) => {
    try {
        // Validate required fields
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        // Create the user and hash the password
        const user = new User(req.body);
        await user.save();

        // Generate JWT token after user creation
        const token = await user.generateAuthToken();
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// API User login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token after successful login
        const token = await user.generateAuthToken();
        res.json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// API User update
exports.updateUser = async (req, res) => {
    try {
        const updates = Object.keys(req.body);  // Get the updated fields from the request body
        const user = await User.findOne({ _id: req.params.id });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password field is being updated and hash it if so
        if (updates.includes('password')) {
            req.body.password = await bcrypt.hash(req.body.password, 8);  // Hash the new password
        }

        // Update the user with the new data
        updates.forEach(update => user[update] = req.body[update]);
        await user.save();
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// API User deletion
exports.deleteUser = async (req, res) => {
    try {
        await req.user.deleteOne();  // Delete the authenticated user
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// API Get user profile
exports.getProfile = async (req, res) => {
    try {
        // Populate the user's products if necessary
        await req.user.populate('products');
        res.json({ user: req.user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
