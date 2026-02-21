const User = require('../models/User');
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    'dev-secret-key',
    { expiresIn: '7d' }
  );
};

exports.signup = async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: 'Missing required fields',
        status: 'error'
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: 'Email already registered',
        status: 'error'
      });
    }

    const user = new User({
      fullName,
      email,
      password,
      phone
    });

    await user.save();
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User created successfully',
      token,
      userId: user._id,
      user: user.toJSON(),
      status: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Signup failed',
      status: 'error'
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'Email and password are required',
        status: 'error'
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: 'Invalid credentials',
        status: 'error'
      });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: 'Invalid credentials',
        status: 'error'
      });
    }

    const token = generateToken(user._id);

    res.json({
      message: 'Login successful',
      token,
      userId: user._id,
      user: user.toJSON(),
      status: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Login failed',
      status: 'error'
    });
  }
};

const Result = require('../models/Result');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        status: 'error'
      });
    }

    // Fetch user results
    const results = await Result.find({ userId: req.userId }).sort({ createdAt: -1 });

    res.json({
      user: user.toJSON(),
      results,
      status: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Failed to get profile',
      status: 'error'
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { fullName, phone, profileImage } = req.body;

    const updateData = { fullName, phone, updatedAt: new Date() };
    if (profileImage !== undefined) {
      updateData.profileImage = profileImage;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      updateData,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: 'User not found',
        status: 'error'
      });
    }

    res.json({
      message: 'Profile updated successfully',
      user: user.toJSON(),
      status: 'success'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || 'Failed to update profile',
      status: 'error'
    });
  }
};
