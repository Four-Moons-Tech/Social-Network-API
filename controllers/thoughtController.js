const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  //Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find({});

      res.json(thoughts);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get 1 thought by id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No student with that ID' })
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  //Create thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }
      res.json(thought)
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
      res.json(thought)
    } catch (err) {
      res.status(500).json(err);

    }
  }, 

  async createReaction(req, res){
    try {
      const thoughtWithReaction =await Thought.findOneAndUpdate(
        {_id: req.params.thoughtId},
        {$addToSet: { reaction: req.body }},
        { runValidators: true, new: true }

      )
      res.json(thoughtWithReaction)
    } catch (err) {
      res.status(500).json(err);
      
    }
  }, 
  async deleteReaction(req, res){
    try {
      const thoughtWithoutReaction = await Thought.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      )
      res.json(thoughtWithoutReaction)
    } catch (err) {
      res.status(500).json(err);
      
    }
  }
}
