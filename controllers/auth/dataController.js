const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Authentication middleware (currently not used due to no cookies)
exports.auth = async (req, res, next) => {
  try {
    let token;

    if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else {
      return res.status(401).render('auth/SignIn', {
        error: 'You must be logged in to access this page.'
      });
    }

    const data = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    const user = await User.findById(data._id);

    if (!user) {
      return res.status(401).render('auth/SignIn', {
        error: 'Session expired or invalid. Please login again.'
      });
    }

    req.user = user;
    res.locals.data.user = user;
    next();
  } catch (error) {
    return res.status(401).render('auth/SignIn', {
      error: 'Session expired or invalid. Please login again.'
    });
  }
};

// Create a new user
exports.createUser = async (req, res, next) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(400).render('auth/SignUp', {
        error: 'User already exists, please sign in.'
      });
    }

    const user = new User(req.body);
    await user.save();

    next(); // Proceed to redirect to login
  } catch (error) {
    res.status(400).render('auth/SignUp', {
      error: 'Something went wrong. Please try again.'
    });
  }
};

// Login user (no cookies)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).render('auth/SignIn', {
        error: 'Invalid email or password'
      });
    }

    const token = await user.generateAuthToken();

    // Temporarily set data manually
    res.locals.token = token;
    res.locals.data = { user };

    const productData = require('../product/productData');
    const productViews = require('../product/productViews');

    req.user = user;

    // Call index logic directly
    await productData.index(req, res, () => {
      productViews.index(req, res);
    });

  } catch (error) {
    res.status(400).render('auth/SignIn', {
      error: 'Something went wrong. Please try again.'
    });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (updates.includes('password')) {
      req.body.password = await bcrypt.hash(req.body.password, 8);
    }

    updates.forEach((update) => user[update] = req.body[update]);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    await req.user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get profile
exports.getProfile = async (req, res) => {
  try {
    await req.user.populate('products');
    res.json({ user: req.user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
