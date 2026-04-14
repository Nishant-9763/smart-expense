const User = require('../models/userModel');

const createUser = async ({ name, email }) => {
  if (!name || !email) {
    throw { statusCode: 400, message: 'Name and email are required' };
  }

  const existing = await User.findOne({ email });
  if (existing) {
    throw { statusCode: 400, message: 'Email already exists' };
  }

  return await User.create({ name, email });
};

const getAllUsers = async () => {
  return await User.find().sort({ createdAt: -1 });
};

module.exports = { createUser, getAllUsers };