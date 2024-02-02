const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thoughts')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            //Must match a valid email address
        },
        thoughts: [thoughtSchema],
        friends: [userSchema]
    },
    {
        toJSON: {
          getters: true,
        },
      }
)
const User = model('user', userSchema);
module.exports = User