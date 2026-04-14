const { createUser, getAllUsers } = require('../services/userService');

const createUserHandler = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

const getAllUsersHandler = async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

module.exports = { createUserHandler, getAllUsersHandler };