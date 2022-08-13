const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    return res
      .status(400)
      .send({ message: 'user email already exist for another user' });
  }

  let hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  });

  await user.save();

  res.send({
    status: 201,
    message: 'User created successfully',
    data: {
      firstName,
      lastName,
      email,
    },
  });
};

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).send({
    message: `${users.length} users retrieved successfully`,
    data: users.map((user) => ({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    })),
  });
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res
      .status(404)
      .send({ message: `user with Id: ${req.params.id} does not exist` });
  }
  const { id, email, firstName, lastName } = user;
  res.status(200).send({
    message: 'user retrieved successfully',
    data: { id, email, firstName, lastName },
  });
};

const updateUser = async (req, res) => {
  var user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  const { id, email, firstName, lastName } = user;
  res.status(200).send({
    message: 'User updated successfully',
    data: { id, email, firstName, lastName },
  });
};

const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.status(200).send({ message: 'User deleted successfully' });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
