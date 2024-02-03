const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  //Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      console.log(users)
      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get 1 user by id
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No student with that ID' })
      }

      res.json({
        user,

      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //Create User
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
}
