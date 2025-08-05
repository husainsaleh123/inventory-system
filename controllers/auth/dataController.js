const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'secret';

// Authentication middleware
exports.auth = async (req, res, next) => {
  try {
    let token;

    if (req.query.token) {
      token = req.query.token;
    } else if (req.header('Authorization')) {
      token = req.header('Authorization').replace('Bearer ', '');
    } else {
      return res.status(401).send('Not authorized');
    }
    const data = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ _id: data._id });
    if (!user) {
      throw new Error();
    }

    req.user = user;
    res.locals.data.token = token
    next();
  } catch (error) {
    // console.error("AUTH ERROR:", error.message);
    res.status(401).send('Not authorized');
  }
}

// Create a new user
exports.createUser = async (req, res, next) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = await user.generateAuthToken();
    res.locals.data.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Login user
exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(400).send('Invalid login credentials');
    }else{
      const token = await user.generateAuthToken();
      res.locals.data.token = token;
      req.user = user;
      next();
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

// Update user
exports.updateUser = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const user = await User.findOne({ _id: req.params.id });
    updates.forEach(update => user[update] = req.body[update]);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    await req.user.deleteOne();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
