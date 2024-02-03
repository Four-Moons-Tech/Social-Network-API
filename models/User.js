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
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought",
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ]
    },
    {
        toJSON: {
            getters: true,
        },
    }
)
const User = model('user', userSchema);
module.exports = {User}